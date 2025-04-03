import { Injectable, Inject, Logger, BadRequestException } from '@nestjs/common';
import { UserDTO } from '../user/dto/user.dto';
import { GoalDTO } from './dto/goal.dto';
import { UpdateGoalDTO } from './dto/updateGoal.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { patterns } from '../patterns';
import { TransactionDTO } from '../transaction/dto/transaction.dto';

@Injectable()
export class GoalService {

    constructor(@Inject('GOAL_SERVICE') private readonly goalClient: ClientProxy,) {}
    private readonly logger = new Logger(GoalService.name);

    private async send(pattern: any, data: any): Promise<any> {
        if (!pattern) {
            throw new Error('Pattern is undefined!');
        }
        
        this.logger.log(`Sending message: pattern=${JSON.stringify(pattern)}, data=${JSON.stringify(data)}`);
    
        const res$ = this.goalClient.send(pattern, data).pipe(
            timeout(30000),
            catchError((e: Error) => {
                this.logger.error(`Error while sending message: ${JSON.stringify(e)}`);
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
    
    async findAll(user:UserDTO): Promise<GoalDTO[]>{
        this.logger.log(`Fetching all user's goals. User ID: ${user.id}`);
        const goals = await this.send(patterns.GOAL.FIND_ALL, user.id);
        this.logger.log(`Fetched all user's goals, count: ${Array.isArray(goals) ? goals.length : 'unknown'}`);
        return goals;
    }

    async createGoal(user:UserDTO, goalData:GoalDTO){
        this.logger.log(`Creating new user's goal ${JSON.stringify(goalData)}`);
        return await this.send(patterns.GOAL.CREATE, { id: user.id, goalData });
    }

    async deleteGoal(id:string){
        const deleteTransaction = await this.send(patterns.GOAL.DELETE, id);
        this.logger.log(`User's goal ${JSON.stringify(id)} deleted.`);
        return deleteTransaction;
    }

    async resetName(id:string, updateData:UpdateGoalDTO){
        if (updateData.goalName) {
            this.logger.log(`User's goal name has been updated to: ${updateData.goalName}`);
            return await this.send(patterns.GOAL.UPDATE,  { id, updateData });
        } else {
            throw new BadRequestException({
                    message: 'New goal name is required',
                    error: "Bad request",
                    statusCode: 400
            });
        }
    }

    async resetTargetAmount(id:string, updateData:UpdateGoalDTO){
        if (updateData.targetAmount) {
            this.logger.log(`User's goal target amount has been updated to: ${updateData.targetAmount}`);
            return await this.send(patterns.GOAL.UPDATE,  { id, updateData });
        } else {
            throw new BadRequestException({
                    message: 'New target amount is required',
                    error: "Bad request",
                    statusCode: 400
            });
        }
    }

    async resetCurrentAmount(id:string, updateData:UpdateGoalDTO){
        if (updateData.currentAmount) {
            this.logger.log(`User's goal current amount has been updated to: ${updateData.currentAmount}`);
            return await this.send(patterns.GOAL.UPDATE,  { id, updateData });
        } else {
            throw new BadRequestException({
                    message: 'New current amount is required',
                    error: "Bad request",
                    statusCode: 400
            });
        }
    }

    async resetDeadline(id:string, updateData:UpdateGoalDTO){
        if (updateData.deadline) {
            this.logger.log(`User's goal deadline has been updated to: ${updateData.deadline}`);
            return await this.send(patterns.GOAL.UPDATE,  { id, updateData });
        } else {
            throw new BadRequestException({
                    message: 'New deadline is required',
                    error: "Bad request",
                    statusCode: 400
            });
        }
    }

    async addToCurrentAmount(id: string, transactionData:TransactionDTO) {

        this.logger.log(`User's goal current amount has been updated to: ${transactionData.amount}`);
        return await this.send(patterns.GOAL.ADD_TO_CURRENT_AMOUNT,  { id, amount:transactionData.amount });

    }
}
