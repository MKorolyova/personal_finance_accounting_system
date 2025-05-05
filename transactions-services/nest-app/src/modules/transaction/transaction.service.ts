import { Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Between, Repository } from 'typeorm';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionDTO } from './dto/transaction.dto';
import { TransactionFiltersDTO } from './dto/transactionFilters.dto';
import {In, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { CreateTransactionDTO } from './dto/createTransaction.dto';
import { UpdateTransactionDTO } from './dto/updateTransaction.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TransactionService {
  
    constructor(
      @InjectRepository(Transaction)
      private readonly transactionRepository: Repository<Transaction>,
    ) {}
    private readonly logger = new Logger(TransactionService.name);

    async findById(id: string): Promise<any> {
        this.logger.log(`Transaction with ID ${id} was found`);
        return this.transactionRepository.findOne({ where: { id } });      
      }

    async deleteTransaction(id: string): Promise<any> {
      const deletedTransaction = await this.findById(id);
      if (!deletedTransaction) {
          this.logger.warn(`User with ID: ${id} not found`);
          throw new RpcException('User not found');
      }
      this.logger.log(`User with ID: ${id} has been deleted`);
      this.transactionRepository.delete(id);
      return deletedTransaction;
    }

    async findWithFilters(userId: string, filters: Partial<TransactionFiltersDTO>) {
    
      const where: any = {
        userId: userId,
      };
    
      if (filters.lowerThenAmount !== undefined && filters.higherThenAmount !== undefined) {
        where.amount = Between(filters.higherThenAmount, filters.lowerThenAmount);
      } else if (filters.higherThenAmount !== undefined) {
        where.amount = MoreThanOrEqual(filters.higherThenAmount);
      } else if (filters.lowerThenAmount !== undefined) {
        where.amount = LessThanOrEqual(filters.lowerThenAmount);
      }
    
      if (filters.type && filters.type.length > 0) {
        where.type = In(filters.type);
      }
    
      if (filters.category && filters.category.length > 0) {
        where.category = In(filters.category);
      }
    
      const startDate = filters.transactionStartDate
        ? new Date(filters.transactionStartDate)
        : new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0);
    
      const endDate = filters.transactionEndDate
        ? new Date(filters.transactionEndDate)
        : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);
    
      where.transactionDate = Between(startDate, endDate);
    
      return this.transactionRepository.find({where});
    }
    
      
    async createTransaction(id: string, createTransactionData: CreateTransactionDTO): Promise<TransactionDTO|null> {

      const $newTransaction = this.transactionRepository.create({
        userId: id,
        ...createTransactionData,
      });
  
      const newTransaction = await this.transactionRepository.save($newTransaction);
      this.logger.log(`Transaction was created. Transaction ID: ${newTransaction.id}`);
      return plainToInstance(TransactionDTO, newTransaction);
    }


    async monthTransactionSummary(userId: string) {
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0);
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);
    
      const incomeSum = await this.transactionRepository.sum("amount", {
        userId: userId,
        type: "income",
        transactionDate: Between(startOfMonth, endOfMonth),
      });

      this.logger.log(`User income transaction summary for this month ${incomeSum}`);
    
      const expenseSum = await this.transactionRepository.sum("amount", {
        userId: userId,
        type: "expense",
        transactionDate: Between(startOfMonth, endOfMonth),
      });

      this.logger.log(`User expense transaction summary for this month ${expenseSum}`);
    
      return {
        incomeSum: incomeSum || 0,
        expenseSum: expenseSum || 0,
      };
    }


    async analiticsFindWithFilters(id: string, filters: TransactionFiltersDTO) {
      const transactions = await this.findWithFilters(id, filters);
 
      const categorySet = new Set<string>();
      const groupedByDate: Map<string, Record<string, number>> = new Map();

      for (const t of transactions) {
        const date = t.transactionDate.toISOString().split('T')[0];
        const category = t.category;
        const amount = Number(t.amount); 

        categorySet.add(category);

        if (!groupedByDate.has(date)) {
          groupedByDate.set(date, {});
        }

        const categoryTotals = groupedByDate.get(date)!;
        categoryTotals[category] = (categoryTotals[category] || 0) + amount;
      }

      const categories = Array.from(categorySet);
      const result: any[] = [];

      for (const [date, categoryMap] of groupedByDate.entries()) {
        const entry: any = { date };

        for (const category of categories) {
          entry[category] = categoryMap[category] || 0;
        }

        result.push(entry);
      }
      
      result.sort((a, b) => a.date.localeCompare(b.date));

      return result;
    }


    async updateTransaction(updateTransactionData: UpdateTransactionDTO): Promise<TransactionDTO|null>{
        const existingTransaction = await this.findById(updateTransactionData.id);
        if (!existingTransaction) {
          throw new RpcException('Transaction not found');
        }
        this.logger.log(`Updating transaction with data: ${JSON.stringify(updateTransactionData)}`);

        this.logger.log(`Transaction with ID: ${existingTransaction.id} has been updated`);
        return this.transactionRepository.save({
          ...existingTransaction,
          ...updateTransactionData
        });
    }

}
