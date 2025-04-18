
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import * as dotenv from 'dotenv';
dotenv.config(); 



@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: (process.env.JWT_SECRET as string ),
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN as string },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
