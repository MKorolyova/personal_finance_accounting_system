import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [TransactionModule, OrmModule],
})
export class ModulesModule {}