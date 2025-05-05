import { Controller, Get, Post, Patch, Delete, Body, UseGuards, Request, Logger, BadRequestException, Param} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '../auth/auth.guard';
import { validateCreateTransactionDTO } from './validationSchema/validatorCreateTransactionDTO';
import { TransactionFiltersDTO } from './dto/transactionFilters.dto';
import { validatorTransactionFiltersDTO } from './validationSchema/validatorTransactionFiltersDTO';
import { request } from 'http';
import { GoalService } from '../goal/goal.service';
import { GoalDTO } from '../goal/dto/goal.dto';
import { UpdateGoalDTO } from '../goal/dto/updateGoal.dto';
import { CreateTransactionDTO } from './dto/createTransaction.dto';
import { validateUpdateTransactionDTO } from './validationSchema/validatorUpdateTransactionDTO';
import { UpdateTransactionDTO } from './dto/updateTransaction.dto';


@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService,
        private readonly goalService: GoalService
    ) {}
    private readonly logger = new Logger(TransactionController.name);

//
    @Post('filtered') // POST /transaction/filtered
    async findWithFilters(@Request() request, @Body() transactionFiltersData: TransactionFiltersDTO){
        const userGoals = await this.goalService.findAll(request.user);
        const errorMessage = validatorTransactionFiltersDTO(transactionFiltersData, userGoals);
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

    @Post('analytics/filtered') // GET /transaction/analytics/filtered
    async findWithFiltersAnalytics(@Request() request, @Body() transactionFiltersData: TransactionFiltersDTO){
        const userGoals = await this.goalService.findAll(request.user);
        const errorMessage = validatorTransactionFiltersDTO(transactionFiltersData, userGoals);
        if (errorMessage) {
            this.logger.warn(`Transaction filters data validation failed: ${JSON.stringify(errorMessage)}`);
            throw new BadRequestException({
                message: errorMessage,
                error: "Bad request",
                statusCode: 400
            });
        }
        this.logger.log(`Getting all user's transactions sum per day for analytics${JSON.stringify(transactionFiltersData)}`);
        return this.transactionService.analiticsFindWithFilters(request.user, transactionFiltersData);
    }
//
    @Get('monthSummary') // GET /transaction/monthSummary
    monthTransactionSummary(@Request() request){
        this.logger.log(`Getting all user's transactions summary`);
        return this.transactionService.monthTransactionSummary(request.user);
    }
//
    @Post('') // POST /transaction
    async createTransaction(@Request() request, @Body() createTransactionData: CreateTransactionDTO){
        const userGoals = await this.goalService.findAll(request.user);
        const errorMessage = validateCreateTransactionDTO(createTransactionData, userGoals);
            if (errorMessage) {
                this.logger.warn(`Transaction data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }

            if (createTransactionData.type === "goal") {
                for (const goal of userGoals) {
                    this.logger.log(`Updating user's goal current amount ${JSON.stringify(goal)}`);
                    this.goalService.addToCurrentAmount(goal.id, createTransactionData);
                    break;
                }
            }
  
            
        this.logger.log(`Creating new user's transaction ${JSON.stringify(createTransactionData)}`);
        return this.transactionService.createTransaction(request.user, createTransactionData);
    }


    @Patch('update') // PATCH /transaction/update
    async updateTransaction(@Request() request, @Body() updateTransactionData: UpdateTransactionDTO) {
        const userGoals = await this.goalService.findAll(request.user);
        const errorMessage = validateUpdateTransactionDTO(updateTransactionData, userGoals);
            if (errorMessage) {
                this.logger.warn(`Up date transaction data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }
        this.logger.log(`Resetting transaction data. Transaction ID: ${updateTransactionData.id}`);
        return this.transactionService.updateTransaction(updateTransactionData);
    }

    
//
    @Delete(':id') // DELETE /transaction/:id
    deleteTransaction(@Param('id') id: string){
        this.logger.log(`Deleting user's transaction ${id}`);
        return this.transactionService.deleteTransaction(id);
    }
}


