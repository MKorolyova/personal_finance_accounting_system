import { Controller, Get, Post, Patch, Delete, Body, UseGuards, Request, Logger, BadRequestException} from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalDTO } from './dto/goal.dto';
import { AuthGuard } from '../auth/auth.guard';
import { validateGoalDTO } from './validationSchema/validatorGoalDTO';
import { request } from 'http';
import { validateUpdateGoalDTO } from './validationSchema/validatorUpdateGoalDTO';
import { UpdateGoalDTO } from './dto/updateGoal.dto';

@UseGuards(AuthGuard)
@Controller('goal')
export class GoalController {
    constructor(private readonly goalService: GoalService) {}
    private readonly logger = new Logger(GoalController.name);

    @Get('') // GET /goal
    findAll(@Request() request){
        this.logger.log(`Getting all user's goals`);
        return this.goalService.findAll(request.user);
    }

    @Post('') // POST /goal
    createGoal(@Request() request, @Body() goalData: GoalDTO){
        const errorMessage = validateGoalDTO(goalData);
            if (errorMessage) {
                this.logger.warn(`goal data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }
        this.logger.log(`Creating new user's goal ${JSON.stringify(goalData)}`);
        return this.goalService.createGoal(request.user, goalData);
    }


    @Patch('goalInfo/name') // PATCH /goal/goalInfo/name
    resetName(@Body() updateData: UpdateGoalDTO, id: string) {
        const errorMessage = validateUpdateGoalDTO(updateData);
            if (errorMessage) {
                this.logger.warn(`Name data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }
        this.logger.log(`Resetting goal name. Goal ID: ${id}`);
        return this.goalService.resetName(id, updateData);
    }

    @Patch('goalInfo/target') // PATCH /goal/goalInfo/name
    resetTargetAmount(@Body() updateData: UpdateGoalDTO, id: string) {
        const errorMessage = validateUpdateGoalDTO(updateData);
            if (errorMessage) {
                this.logger.warn(`Target amount data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }
        this.logger.log(`Resetting goal target amount. Goal ID: ${id}`);
        return this.goalService.resetTargetAmount(id, updateData);
    }

    @Patch('goalInfo/current') // PATCH /goal/goalInfo/current
    resetCurrentAmount(@Body() updateData: UpdateGoalDTO, id: string) {
        const errorMessage = validateUpdateGoalDTO(updateData);
            if (errorMessage) {
                this.logger.warn(`Current amount data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }
        this.logger.log(`Resetting goal current amount. Goal ID: ${id}`);
        return this.goalService.resetCurrentAmount(id, updateData);
    }

    @Patch('goalInfo/deadline') // PATCH /goal/goalInfo/deadline
    resetDeadline(@Body() updateData: UpdateGoalDTO, id: string) {
        const errorMessage = validateUpdateGoalDTO(updateData);
            if (errorMessage) {
                this.logger.warn(`Deadline data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }
        this.logger.log(`Resetting goal deadline. Goal ID: ${id}`);
        return this.goalService.resetDeadline(id, updateData);
    }

    @Delete('') // DELETE /transaction
    deleteTransaction(@Body() { id }:{id: string}){
        this.logger.log(`Deleting user's goal ${id}`);
        return this.goalService.deleteGoal(id);
    }

}


