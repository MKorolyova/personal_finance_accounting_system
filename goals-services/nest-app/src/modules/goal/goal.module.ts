import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from 'src/entities/goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goal])],
  controllers: [GoalController],
  providers: [GoalService]
})
export class GoalModule {}






