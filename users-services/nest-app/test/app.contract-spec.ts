import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestMicroservice } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client as PgClient } from 'pg';
import { OrmModule } from '../src/modules/orm/orm.module';
import { Wait } from 'testcontainers';
import { patterns } from '../src/modules/patterns';
import * as bcrypt from 'bcrypt';
import { UserTestDTO } from '../src/modules/user/dtoTest/UserTestDTO';
import { SignUpTestDTO } from '../src/modules/user/dtoTest/SignUpTestDTO';
import { UserUpdatedNameTestDTO } from '../src/modules/user/dtoTest/UserUpdatedNameTestDTO';
import { UserUpdatedEmailTestDTO } from '../src/modules/user/dtoTest/UserUpdatedEmailTestDTO';
import { UserUpdatedPasswordTestDTO } from '../src/modules/user/dtoTest/UserUpdatedPasswordTestDTO';
import { UserDTO } from '../src/modules/user/dto/user.dto';

 describe('Contract Testing', () => {

    let app: INestMicroservice;
    let client: ClientProxy;
    let container;
  
    beforeAll(async () => {

      container = await new PostgreSqlContainer("postgres:15")
        .withName("postgresTest")
        .withDatabase("testdb")
        .withUsername("testuser")
        .withPassword("testpass")
        .withNetworkMode("personal_finance_accounting_system_default")  
        .withNetworkAliases("postgresTest")
        .withWaitStrategy(Wait.forLogMessage("ready"))
        .start();

      const db = container.getDatabase();
      const user = container.getUsername();
      const password = container.getPassword();

      const testOrmModule = TypeOrmModule.forRoot({
        type: 'postgres',
        host: "postgresTest",
        port: 5432,
        username: user,
        password: password,
        database: db,
        synchronize: true,
        logging: ['warn', 'error'],
        cache: false,
        entities: [__dirname + '../../src/entities/*.entity.{js,ts}'],
        migrations: [__dirname + '../../src/migrations/*.{js,ts}'],
      })

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      })
      .overrideModule(OrmModule)
      .useModule(testOrmModule)
      .compile();
  
      app = moduleFixture.createNestMicroservice({
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL as string],
          queue: 'users-service',
          queueOptions: { durable: false },
        },
      });
      await app.listen();
  
      client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL as string],
          queue: 'users-service', 
          queueOptions: { durable: false },
        },
      });
      await client.connect();

    });
  
    afterAll(async () => {
        
        if(app){
          await app.close();
        }
        
        if(client){
          await client.close();
        }

        if(container){
          await container.stop({ remove: true });
        }
        
    });
  

    it('should sign up a new user', async () => {
      const signUpData = new SignUpTestDTO();
    
      const actual_result = await client
        .send(patterns.USER.SIGN_UP, signUpData)
        .toPromise();
      
      expect(actual_result).toBeDefined();
      expect(actual_result).toHaveProperty('id');
      expect(actual_result.username).toBe(signUpData.username);
      expect(actual_result.email).toBe(signUpData.email);
      expect(actual_result).toHaveProperty('password');
      const isPasswordValid = await bcrypt.compare(signUpData.password, actual_result.password);
      expect(isPasswordValid).toBe(true);

    });


    it('should find a user by email', async () => {
      const userToFind = new UserTestDTO();

      const actual_result = await client
        .send(patterns.USER.FIND_BY_EMAIL, userToFind.email)
        .toPromise();
    
      expect(actual_result).toBeDefined();
      expect(actual_result).toHaveProperty('id');
      expect(actual_result.username).toBe(userToFind.username);
      expect(actual_result.email).toBe(userToFind.email);
      expect(actual_result).toHaveProperty('password');
      const isPasswordValid = await bcrypt.compare(userToFind.password, actual_result.password);
      expect(isPasswordValid).toBe(true);
    });

  });
  




