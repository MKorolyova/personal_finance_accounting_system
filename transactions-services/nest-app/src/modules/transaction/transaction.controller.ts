import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { patterns } from '../patterns';
import { TransactionService } from './transaction.service';
import { TransactionFiltersDTO } from './dto/transactionFilters.dto';
import { TransactionDTO } from './dto/transaction.dto';
import { CreateTransactionDTO } from './dto/createTransaction.dto';
import { UpdateTransactionDTO } from './dto/updateTransaction.dto';

@Controller('transaction')
export class TransactionController {

    constructor(private readonly transactionService: TransactionService) {}
    private readonly logger = new Logger(TransactionController.name);

    @MessagePattern(patterns.TRANSACTION.CREATE)
    async createTransaction({ id, createTransactionData }:{id: string, createTransactionData: CreateTransactionDTO}) {
        this.logger.log(`Creating user's transaction ${JSON.stringify(createTransactionData)}. User ID: ${JSON.stringify(id)}`);
        return this.transactionService.createTransaction(id, createTransactionData);
    }

    @MessagePattern(patterns.TRANSACTION.DELETE)
    async deleteTransaction(id:string) {
        this.logger.log(`Deleting user's transaction${JSON.stringify(id)}`);
        return this.transactionService.deleteTransaction(id);;
    }

    @MessagePattern(patterns.TRANSACTION.FIND_WITH_FILTERS)
    async findWithFilters({ id, transactionFiltersData }:{id: string, transactionFiltersData: TransactionFiltersDTO}) {
        this.logger.log(`Finding user's transaction with filters ${JSON.stringify(transactionFiltersData)}. User ID: ${JSON.stringify(id)}`);
        return this.transactionService.findWithFilters(id, transactionFiltersData);
    }

    @MessagePattern(patterns.TRANSACTION.FIND_WITH_FILTERS_FOR_ANALYTICS)
    async analiticsFindWithFilters({ id, transactionFiltersData }:{id: string, transactionFiltersData: TransactionFiltersDTO}) {
        this.logger.log(`Finding user's transaction sum with filters ${JSON.stringify(transactionFiltersData)}. User ID: ${JSON.stringify(id)}`);
        return this.transactionService.analiticsFindWithFilters(id, transactionFiltersData);
    }

    
    @MessagePattern(patterns.TRANSACTION.SUMMARY)
    async monthTransactionSummary (id: string){
        this.logger.log(`Getting all user's transactions summary`);
        return this.transactionService.monthTransactionSummary(id); 
    }

    @MessagePattern(patterns.TRANSACTION.UPDATE_TRANSACTION)
    async updateTransaction (updateTransactionData: UpdateTransactionDTO){
        this.logger.log(`Updating user's transaction ${updateTransactionData.id}`);
        return this.transactionService.updateTransaction(updateTransactionData); 
    }

}

