import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { GoalModule } from './goal/goal.module';

@Module({
  imports: [UserModule, AuthModule, TransactionModule, GoalModule],
})
export class ModulesModule {}