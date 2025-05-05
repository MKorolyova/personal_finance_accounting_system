import { Controller, Get, Post, Patch, Delete, Body, UseGuards, Request, Logger, BadRequestException,Param} from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalDTO } from './dto/goal.dto';
import { AuthGuard } from '../auth/auth.guard';
import { validateGoalDTO } from './validationSchema/validatorGoalDTO';
import { request } from 'http';
import { validateUpdateGoalDTO } from './validationSchema/validatorUpdateGoalDTO';
import { UpdateGoalDTO } from './dto/updateGoal.dto';
import { CreateGoalDTO } from './dto/createGoal.dto';
import { validateCreateGoalDTO } from './validationSchema/validatorCreateGoalDTO';

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
    createGoal(@Request() request, @Body() createGoalData: CreateGoalDTO){
        const errorMessage = validateCreateGoalDTO(createGoalData);
            if (errorMessage) {
                this.logger.warn(`goal data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }
        this.logger.log(`Creating new user's goal ${JSON.stringify(createGoalData)}`);
        return this.goalService.createGoal(request.user, createGoalData);
    }


    @Patch('update') // PATCH /goal/update
    updateGoal(@Body() updateGoalData: UpdateGoalDTO) {
        const errorMessage = validateUpdateGoalDTO(updateGoalData);
            if (errorMessage) {
                this.logger.warn(`Up date goal data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }
        this.logger.log(`Resetting goal name. Goal ID: ${updateGoalData.id}`);
        return this.goalService.updateGoal(updateGoalData);
    }

    @Delete(':id') // DELETE /goal/:id
    deleteTransaction(@Param('id') id: string){
        this.logger.log(`Deleting user's goal ${id}`);
        return this.goalService.deleteGoal(id);
    }

}


