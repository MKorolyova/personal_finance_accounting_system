import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestMicroservice } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmModule } from '../src/modules/orm/orm.module';
import { Wait } from 'testcontainers';

 describe('AppController (Microservice)', () => {

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
        entities: [__dirname + '/../../entities/*.entity.{js,ts}'],
        migrations: [__dirname + '/../../migrations/*.{js,ts}'],
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
  
    it('should respond to a test pattern', async () => {
      const response = await client
        .send('ping', {}) 
        .toPromise();
  
      expect(response).toBe('pong'); 
    });
  });
  



