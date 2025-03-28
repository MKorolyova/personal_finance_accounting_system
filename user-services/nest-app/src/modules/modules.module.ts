import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {OrmModule} from './orm/orm.module'

@Module({
  imports: [UserModule, OrmModule],
})
export class ModulesModule {}