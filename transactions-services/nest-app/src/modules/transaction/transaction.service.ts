import { Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionDTO } from './dto/transaction.dto';
import { TransactionFiltersDTO } from './dto/transactionFilters.dto';


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

    async findAll(userId:string): Promise<any> {
        this.logger.log('All trensactions were found');
        return this.transactionRepository.find({ where: { userId } });
      }


    async deleteTransaction(id: string): Promise<any> {
    const deletedUser = await this.findById(id);
    if (!deletedUser) {
        this.logger.warn(`User with ID: ${id} not found`);
        throw new RpcException('User not found');
    }
    this.logger.log(`User with ID: ${id} has been deleted`);
    return this.transactionRepository.delete(id);
    }


    async findWithFilters(userId: string, transactionFiltersData: Partial<TransactionFiltersDTO>) {
    const query = this.transactionRepository.createQueryBuilder('transaction').where('transaction.userId = :userId', { userId });
    
    if (transactionFiltersData.lowerThenAmount !== undefined) {
      query.andWhere('transaction.amount <= :lowerThenAmount', { lowerThenAmount: transactionFiltersData.lowerThenAmount });
    }
    
    if (transactionFiltersData.higherThenAmount !== undefined) {
        query.andWhere('transaction.amount >= :higherThenAmount', { higherThenAmount: transactionFiltersData.higherThenAmount });
    }
    
    if (transactionFiltersData.type && transactionFiltersData.type.length > 0) {
        query.andWhere('transaction.type IN (:...type)', { type: transactionFiltersData.type });
    }
    
    if (transactionFiltersData.category && transactionFiltersData.category.length > 0) {
        query.andWhere('transaction.category IN (:...category)', { category: transactionFiltersData.category });
    }

    if (transactionFiltersData.transactionStartDate !== undefined) {
       query.andWhere('transaction.transactionDate >= :transactionStartDate', { transactionStartDate: transactionFiltersData.transactionStartDate });
    } else {
      transactionFiltersData.transactionStartDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0);
      query.andWhere('transaction.transactionDate >= :transactionStartDate', { transactionStartDate: transactionFiltersData.transactionStartDate });
    }
    
    if (transactionFiltersData.transactionEndDate !== undefined) {
       query.andWhere('transaction.transactionDate <= :transactionEndDate', { transactionEndDate: transactionFiltersData.transactionEndDate });
    } else {
      transactionFiltersData.transactionEndDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);
      query.andWhere('transaction.transactionDate <= :transactionEndDate', { transactionEndDate: transactionFiltersData.transactionEndDate }); 
    }
   

    console.log(query.getQuery());

    console.log( transactionFiltersData.transactionStartDate);
    console.log(transactionFiltersData.transactionEndDate);
    console.log(transactionFiltersData.type);

    
    return await query.getMany();
    }
      
    async createTransaction(id: string, transactionData: TransactionDTO): Promise<any> {

      const $newTransaction = this.transactionRepository.create({
        userId: id,
        ...transactionData,
      });
  
      const newTransaction = await this.transactionRepository.save($newTransaction);
      this.logger.log(`Transaction was created. Transaction ID: ${newTransaction.id}`);
      return newTransaction; 
    }

    async allTransactionSummary(userId:string){
        const incomeSum = await this.transactionRepository.sum("amount", { userId:userId, type:"income"});
        const expenseSum = await this.transactionRepository.sum("amount", { userId:userId, type:"expense"});
        return { incomeSum: incomeSum || 0,expenseSum: expenseSum || 0,};
    }

}
