import { Controller, Get, Post, Patch, Delete, Body, UseGuards, Request, Logger, BadRequestException, Param} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from './dto/transaction.dto';
import { AuthGuard } from '../auth/auth.guard';
import { validateTransactionDTO } from './validationSchema/validatorTransactionDTO';
import { TransactionFiltersDTO } from './dto/transactionFilters.dto';
import { validateTransactionFiltersDTO } from './validationSchema/validatorTransactionFiltersDTO';
import { request } from 'http';
import { GoalService } from '../goal/goal.service';
import { GoalDTO } from '../goal/dto/goal.dto';
import { UpdateGoalDTO } from '../goal/dto/updateGoal.dto';

@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService,
        private readonly goalService: GoalService
    ) {}
    private readonly logger = new Logger(TransactionController.name);

    @Get('') // GET /transaction/
    findAll(@Request() request){
        this.logger.log(`Getting all user's transactions`);
        return this.transactionService.findAll(request.user);
    }

    @Get('filtered') // GET /transaction/filtered
    findWithFilters(@Request() request, @Body() transactionFiltersData: TransactionFiltersDTO){
        const errorMessage = validateTransactionFiltersDTO(transactionFiltersData);
        if (errorMessage) {
            this.logger.warn(`Transaction filters data validation failed: ${JSON.stringify(errorMessage)}`);
            throw new BadRequestException({
                message: errorMessage,
                error: "Bad request",
                statusCode: 400
            });
        }
        this.logger.log(`Getting all user's transactions with filters ${JSON.stringify(transactionFiltersData)}`);
        return this.transactionService.findWithFilters(request.user, transactionFiltersData);
    }

    @Get('summary') // GET /transaction/summary
    allTransactionSummary(@Request() request){
        this.logger.log(`Getting all user's transactions summary`);
        return this.transactionService.allTransactionSummary(request.user);
    }

    @Post('') // POST /transaction
    async createTransaction(@Request() request, @Body() transactionData: TransactionDTO){
        const userGoals = await this.goalService.findAll(request.user);
        const errorMessage = validateTransactionDTO(transactionData, userGoals);
            if (errorMessage) {
                this.logger.warn(`Transaction data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }

        for (const goal of userGoals) {
            if (transactionData.category === goal.goalName) {
                this.logger.log(`Updating user's goal current amount ${JSON.stringify(goal)}`);
                this.goalService.addToCurrentAmount(goal.id, transactionData);
                break;
            }
        }
            
        this.logger.log(`Creating new user's transaction ${JSON.stringify(transactionData)}`);
        return this.transactionService.createTransaction(request.user, transactionData);
    }

    @Delete(':id') // DELETE /transaction/:id
    deleteTransaction(@Param('id') id: string){
        this.logger.log(`Deleting user's transaction ${id}`);//${JSON.stringify(id)}
        return this.transactionService.deleteTransaction(id);
    }
}


