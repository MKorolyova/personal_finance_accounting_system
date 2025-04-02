import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,

    ClientsModule.register([{
        name: "GOAL_SERVICE",
        transport: Transport.RMQ, 
        options: {
            urls: [process.env.RABBITMQ_URL || "amqp://rabbitmq:5672" ], 
            queue: 'goal-service',
            queueOptions: { durable: false }
        }
    }])
],
  controllers: [GoalController],
  providers: [GoalService]
})
export class GoalModule {}



