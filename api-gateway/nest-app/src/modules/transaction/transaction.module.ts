import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    UserModule,

    ClientsModule.register([{
        name: "TRANSACTION_SERVICE",
        transport: Transport.RMQ, 
        options: {
            urls: [process.env.RABBITMQ_URL || "amqp://rabbitmq:5672" ], 
            queue: 'transaction-service',
            queueOptions: { durable: false }
        }
    }])
],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService]
})
export class TransactionModule {}






