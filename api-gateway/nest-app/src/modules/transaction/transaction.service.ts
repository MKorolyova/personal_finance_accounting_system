import { Injectable, Logger, Inject, BadRequestException } from '@nestjs/common';
import { catchError, empty, firstValueFrom, throwError, timeout } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { patterns } from '../patterns';
import { CreateTransactionDTO } from './dto/createTransaction.dto';
import { UserDTO } from '../user/dto/user.dto';
import { TransactionFiltersDTO } from './dto/transactionFilters.dto';
import { UpdateTransactionDTO } from './dto/updateTransaction.dto';
import { TransactionDTO } from './dto/transaction.dto';
@Injectable()
export class TransactionService {

    constructor(@Inject('TRANSACTION_SERVICE') private readonly transactionClient: ClientProxy,) {}
    private readonly logger = new Logger(TransactionService.name);

    private async send(pattern: any, data: any): Promise<any> {
        if (!pattern) {
            throw new Error('Pattern is undefined!');
        }
        
        this.logger.log(`Sending message: pattern=${JSON.stringify(pattern)}, data=${JSON.stringify(data)}`);
    
        const res$ = this.transactionClient.send(pattern, data).pipe(
            timeout(30000),
            catchError((e: Error) => {
                this.logger.error(`Error while sending message: ${e.message}`);
                return throwError(() => e);
            })
        );
    
        try {
            const result = await firstValueFrom(res$);
            if (result === undefined || result === null) {
                this.logger.warn(`Received empty response for pattern: ${pattern}`);
                return null; 
            }
            return result;
        } catch (e) {
            if (e.message.includes('no elements in sequence')) {
                this.logger.warn(`No elements in sequence for pattern: ${pattern}`);
                return null; 
            }
            throw e; 
        }
    }
    
    //
    async findWithFilters(user: UserDTO, transactionFiltersData: TransactionFiltersDTO): Promise<TransactionDTO[] | []> {
        this.logger.log(`Fetching all user's transactions with filters: ${JSON.stringify(transactionFiltersData)}. User ID: ${user.id}`);
        const transactions = await this.send(patterns.TRANSACTION.FIND_WITH_FILTERS, { id:user.id, transactionFiltersData});
        this.logger.log(`Fetched all user's transactions, count: ${Array.isArray(transactions) ? transactions.length : 'unknown'}`);
        return transactions;
    }

    async analiticsFindWithFilters(user: UserDTO, transactionFiltersData: TransactionFiltersDTO){
        this.logger.log(`Fetching all user's transactions sum with filters: ${JSON.stringify(transactionFiltersData)}. User ID: ${user.id}`);
        const transactionsSum = await this.send(patterns.TRANSACTION.FIND_WITH_FILTERS_FOR_ANALYTICS, { id:user.id, transactionFiltersData});
        this.logger.log(`Fetched all user's transactions sum, count: ${JSON.stringify(transactionsSum)}`);
        return transactionsSum;
    }

    //
    async deleteTransaction(id: string): Promise<TransactionDTO | null> {
        const deleteTransaction = await this.send(patterns.TRANSACTION.DELETE, id);
        this.logger.log(`User's transaction ${JSON.stringify(id)} deleted.`);
        return deleteTransaction;
    }

    //
    async createTransaction(user: UserDTO, createTransactionData: CreateTransactionDTO): Promise<TransactionDTO | null> {
      this.logger.log(`Creating new user's transaction ${JSON.stringify(createTransactionData)}`);
      return await this.send(patterns.TRANSACTION.CREATE, { id: user.id, createTransactionData });
    }
    
    //
    async monthTransactionSummary (user: UserDTO){
        this.logger.log(`Getting all user's transactions summary`);
        return await this.send(patterns.TRANSACTION.SUMMARY, user.id ); 
    }
    
    //
    async updateTransaction (updateTransactionData: UpdateTransactionDTO): Promise<TransactionDTO | null>{
        this.logger.log(`Updating user's transaction ${JSON.stringify(updateTransactionData.id)}`);
        return await this.send(patterns.TRANSACTION.UPDATE_TRANSACTION, updateTransactionData);
    }
}
