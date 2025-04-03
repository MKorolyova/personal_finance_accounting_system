import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { patterns } from '../patterns';
import { GoalService } from './goal.service';
import { GoalDTO } from './dto/goal.dto';
import { UpdateGoalDTO } from './dto/updateGoal.dto';

@Controller('goal')
export class GoalController {

    constructor(private readonly goalService: GoalService) {}
    private readonly logger = new Logger(GoalController.name);

    @MessagePattern(patterns.GOAL.CREATE)
    async createGoal({ id, goalData }:{id: string, goalData: GoalDTO}) {
        this.logger.log(`Creating user's goal ${JSON.stringify(goalData)}. User ID: ${JSON.stringify(id)}`);
        return this.goalService.createGoal(id, goalData);
    }

    @MessagePattern(patterns.GOAL.DELETE)
    async deleteGoal(id:string) {
        this.logger.log(`Deleting user's goal${JSON.stringify(id)}`);
        return this.goalService.deleteGoal(id);;
    }

    @MessagePattern(patterns.GOAL.FIND_ALL)
    async findAll(id:string) {
        this.logger.log(`Finding all  user's goals. User ID: ${JSON.stringify(id)}`);
        const t = this.goalService.findAll(id);
        this.logger.log(`Finding all user's goals ${JSON.stringify(t)}`);
        return t
    }

    @MessagePattern(patterns.GOAL.UPDATE)
    async updateGoal({ id, updateData }:{id: string, updateData: UpdateGoalDTO}){
          this.logger.log(`Updating goal with id ${JSON.stringify(id)}`);
          return this.goalService.updateGoal(id, updateData);
    }

    @MessagePattern(patterns.GOAL.ADD_TO_CURRENT_AMOUNT)
    async addToCurrentAmount({ id, amount }:{id: string, amount: number}){
          this.logger.log(`Increasing goal current amount with id ${JSON.stringify(id)}`);
          return this.goalService.addToCurrentAmount(id, amount);
    }
}

