import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

console.log(__dirname);

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        cache: false,
        database: process.env.DB_NAME,
        logging: ['warn', 'error'],
        synchronize: true,
        // migrationsTableName: 'migrations',
        migrations: [__dirname + '/../../migrations/*.{js,ts}'],
        entities: [__dirname + '/../../entities/*.entity.{js,ts}'],
        // migrationsRun: true,
    }),
  ],
})
export class OrmModule {}


