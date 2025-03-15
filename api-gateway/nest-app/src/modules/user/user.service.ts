import { Injectable, Logger, Inject, BadRequestException } from '@nestjs/common';
import { response } from 'express';
import { catchError, empty, firstValueFrom, throwError, timeout } from 'rxjs';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { UserDTO } from '../dto/user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { patterns } from '../patterns';
import { SignUpDTO } from '../dto/signUp.dto';

@Injectable()
export class UserService {


    constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy,) {}
    private readonly logger = new Logger(UserService.name);

    private async send(pattern: any, data: any): Promise<any> {
        if (!pattern) {
            throw new Error('Pattern is undefined!');
        }
        
        this.logger.log(`Sending message: pattern=${JSON.stringify(pattern)}, data=${JSON.stringify(data)}`);
    
        const res$ = this.userClient.send(pattern, data).pipe(
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

    async resetName(user: UserDTO, updateData: UpdateUserDTO) {
        if (updateData.username) {
            user.username = updateData.username;
            this.logger.log(`User's name has been updated to: ${user.username}`);
            return await this.send(patterns.USER.UPDATE, user);
        } else {
            throw new BadRequestException({
                    message: 'New username is required',
                    error: "Bad request",
                    statusCode: 400
            });
        }
      }
      
      async resetEmail(user: UserDTO, updateData: UpdateUserDTO) {
        if (updateData.email) {
          user.email = updateData.email;
          this.logger.log(`User's email has been updated`);
          return await this.send(patterns.USER.UPDATE, user);
        } else {
            throw new BadRequestException({
                message: 'New email is required',
                error: "Bad request",
                statusCode: 400
            });
        }
      }
      
      async resetPassword(user: UserDTO, updateData: UpdateUserDTO) {
        if (updateData.password) {
          user.password = updateData.password;
          this.logger.log(`User's password has been updated`);
          return await this.send(patterns.USER.UPDATE, user);
        } else {
            throw new BadRequestException({
                message: 'New password is required',
                error: "Bad request",
                statusCode: 400
            });
        }
      }

      async findUserById(id: number) {
        const user = await this.send(patterns.USER.FIND_BY_ID, id);
        this.logger.log(`User found by ID: ${id}`);
        return user;
    }
    
    async findUserByEmail(email: string) {
        const user = await this.send(patterns.USER.FIND_BY_EMAIL, email);
        this.logger.log(`User found by email: ${email}`);
        return user;
    }
    
    async findAll() {
        this.logger.log(`Fetching all users`);
        const users = await this.send(patterns.USER.FIND_ALL, "");
        this.logger.log(`Fetched all users, count: ${Array.isArray(users) ? users.length : 'unknown'}`);
        return users;
    }
    
    async deleteUser(user: UserDTO) {
        const deleteUser = await this.send(patterns.USER.DELETE, user);
        this.logger.log(`User deleted. User ID:  ${JSON.stringify(user.id)}`);
        return deleteUser;
    }
    
    async createUser(signUpData: SignUpDTO) {
      return await this.send(patterns.USER.SIGN_UP, signUpData);
    }
    
      
}
