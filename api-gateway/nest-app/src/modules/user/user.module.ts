import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
    imports: [
        ClientsModule.register([{
            name: "USER_SERVICE",
            transport: Transport.RMQ, 
            options: {
                urls: [process.env.RABBITMQ_URL || "amqp://rabbitmq:5672" ], 
                queue: 'user-service',
                queueOptions: { durable: false }
            }
        }])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}

