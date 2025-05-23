import { Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Goal } from 'src/entities/goal.entity';
import { GoalDTO } from './dto/goal.dto';
import { UpdateGoalDTO } from './dto/updateGoal.dto';
import { CreateGoalDTO } from './dto/createGoal.dto';

@Injectable()
export class GoalService {
  
    constructor(
      @InjectRepository(Goal)
      private readonly goalRepository: Repository<Goal>,
    ) {}
    private readonly logger = new Logger(GoalService.name);

    async findById(id: string): Promise<any> {
        this.logger.log(`Goal with ID ${id} was found`);
        return this.goalRepository.findOne({ where: { id } });      
      }

    async findAll(userId:string): Promise<any> {
        this.logger.log('All goals were found');
        return this.goalRepository.find({ where: { userId } });
      }


    async deleteGoal(id: string): Promise<any> {
        const deletedGoal = await this.findById(id);
        if (!deletedGoal) {
            this.logger.warn(`Goal with ID: ${id} not found`);
            throw new RpcException('Goal not found');
        }
        this.logger.log(`Goal with ID: ${id} has been deleted`);
        this.goalRepository.delete(id);
        return deletedGoal
    }

    async createGoal(id: string, createGoalData: CreateGoalDTO): Promise<any> {

      const $newTransaction = this.goalRepository.create({
        userId: id,
        ...createGoalData,
      });
  
      const newTransaction = await this.goalRepository.save($newTransaction);
      this.logger.log(`Goal was created. Transaction ID: ${newTransaction.id}`);
      return newTransaction; 
    }

    async updateGoal(updateGoalData:UpdateGoalDTO){
        const existingGoal = await this.findById(updateGoalData.id);
        if (!existingGoal) {
          throw new RpcException('Goal not found');
        }
        this.logger.log(`Updating goal with data: ${JSON.stringify(updateGoalData)}`);

        this.logger.log(`Goal with ID: ${existingGoal.id} has been updated`);
        return this.goalRepository.save({
          ...existingGoal,
          ...updateGoalData
        });
    }

    async addToCurrentAmount(id:string, amount:number){
      const existingGoal = await this.findById(id);
        if (!existingGoal) {
          throw new RpcException('Goal not found');
        }
        this.logger.log(`Increasing goal current amount by: ${amount}`);

        existingGoal.currentAmount = Number(existingGoal.currentAmount) + Number(amount);
        if (existingGoal.currentAmount >= existingGoal.targetAmount){
          existingGoal.status = 'completed';
        }
        await this.goalRepository.save(existingGoal);
        this.logger.log(`Goal was updated. New current amount: ${existingGoal.currentAmount}`);
        return existingGoal;
    }

}
