import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { OrmModule } from './modules/orm/orm.module';

@Module({
  imports: [ModulesModule, OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
