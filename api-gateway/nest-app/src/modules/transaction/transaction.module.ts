import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';
import { UserModule } from '../user/user.module';
import { GoalModule } from '../goal/goal.module';


@Module({
  imports: [
    UserModule,
    GoalModule,

    ClientsModule.register([{
        name: "TRANSACTION_SERVICE",
        transport: Transport.RMQ, 
        options: {
            urls: [process.env.RABBITMQ_URL as string ], 
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






