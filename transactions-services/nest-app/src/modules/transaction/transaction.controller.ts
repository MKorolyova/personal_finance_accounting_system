import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { patterns } from '../patterns';
import { TransactionService } from './transaction.service';
import { TransactionFiltersDTO } from './dto/transactionFilters.dto';
import { TransactionDTO } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {

    constructor(private readonly transactionService: TransactionService) {}
    private readonly logger = new Logger(TransactionController.name);

    @MessagePattern(patterns.TRANSACTION.CREATE)
    async createTransaction({ id, transactionData }:{id: string, transactionData: TransactionDTO}) {
        this.logger.log(`Creating user's transaction ${JSON.stringify(transactionData)}. User ID: ${JSON.stringify(id)}`);
        return this.transactionService.createTransaction(id, transactionData);
    }

    @MessagePattern(patterns.TRANSACTION.DELETE)
    async deleteTransaction(id:string) {
        this.logger.log(`Deleting user's transaction${JSON.stringify(id)}`);
        return this.transactionService.deleteTransaction(id);;
    }

    @MessagePattern(patterns.TRANSACTION.FIND_ALL)
    async findAll(id:string) {
        this.logger.log(`Finding all  user's transactions. User ID: ${JSON.stringify(id)}`);
        const t = this.transactionService.findAll(id);
        this.logger.log(`Finding all  user's transactions ${JSON.stringify(t)}`);
        return t
    }

    @MessagePattern(patterns.TRANSACTION.FIND_WITH_FILTERS)
    async findWithFilters({ id, transactionFiltersData }:{id: string, transactionFiltersData: TransactionFiltersDTO}) {
        this.logger.log(`Finding user's transaction with filters ${JSON.stringify(transactionFiltersData)}. User ID: ${JSON.stringify(id)}`);
        return this.transactionService.findWithFilters(id, transactionFiltersData);
    }

    @MessagePattern(patterns.TRANSACTION.SUMMARY)
    async allTransactionSummary (id: string){
        this.logger.log(`Getting all user's transactions summary`);
        return this.transactionService.allTransactionSummary(id); 
    }


}

