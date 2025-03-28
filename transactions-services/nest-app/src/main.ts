import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
const pack = require('./../package.json');

async function bootstrap() {  
  console.log(pack.name)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL as string],//|| 'amqp://localhost:5672'
        queue: pack.name,
        queueOptions: { durable: false },
      }
    },
  );

  await app.listen();

}
bootstrap();






