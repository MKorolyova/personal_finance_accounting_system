import { Injectable, Logger, NotFoundException} from '@nestjs/common';
import {UserDTO} from"./dto/user.dto";
import {UpdateUserDTO} from "./dto/update-user.dto";
import {SignUpDTO} from '../user/dto/sign-up.dto';
import {LogInDTO} from '../user/dto/log-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}
    private readonly logger = new Logger(UserService.name);

    async signUp(signUpData: SignUpDTO): Promise<any> {
      
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(signUpData.password, salt);
      signUpData.password = hashPassword;

      const $newUser = this.userRepository.create({
        ...signUpData,
      });
  
      const newUser = await this.userRepository.save($newUser);
      this.logger.log(`User was created.User ID: ${newUser.id}`);
      return newUser; 
    }
    
    async findByEmail(email: string): Promise<any> {
      this.logger.log(`User with email ${email} was found`);
      return this.userRepository.findOne({ where: { email } });
    }
    
    async findById(id: string): Promise<any> {
      this.logger.log(`User with ID ${id} was found`);
      return this.userRepository.findOne({ where: { id } });      
    }

    async findAll(): Promise<any> {
      this.logger.log('All users were sent');
      return this.userRepository.find();
    }

    async deleteUser(user: UserDTO): Promise<any> {
      const deletedUser = await this.findById(user.id);
      if (!deletedUser) {
        this.logger.warn(`User with ID: ${user.id} not found`);
        throw new RpcException('User not found');
      }
      this.logger.log(`User with ID: ${user.id} has been deleted`);
      return this.userRepository.delete(user.id);
    }

    async updateUser(id: string, updateData: UpdateUserDTO): Promise<any> {
      const existingUser = await this.findById(id);
      if (!existingUser) {
        throw new RpcException('User not found');
      }

      if ('password' in updateData) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(updateData.password, salt);
        updateData.password = hashPassword; 
    }

      this.logger.log(`User with ID: ${existingUser.id} has been updated`);
      return this.userRepository.save({
        ...existingUser,
        ...updateData
      });

  }

}
