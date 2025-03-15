import { Injectable, Logger} from '@nestjs/common';
import {UserDTO} from"./dto/user.dto";
import {UpdateUserDTO} from "./dto/update-user.dto";
import {SignUpDTO} from '../user/dto/sign-up.dto';
import {LogInDTO} from '../user/dto/log-in.dto';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    private readonly users = [
        {
          id: 1,
          username: 'john',
          email: "john@gmail.com",
          password: 'changeme',
          updateDate: '20.02.2025',
          createDate:'05.02.2025'
        },
        {
          id: 2,
          username: 'maria',
          email: "maria@gmail.com",
          password: 'guess',
          updateDate: '03.02.2025',
          createDate:'03.02.2025'
        },
    ];

    async signUp(signUpData: SignUpDTO) {
        const newUser = {
            id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1,
            username: signUpData.username,
            email: signUpData.email,
            password: signUpData.password, 
            createDate: new Date().toISOString(), 
            updateDate: new Date().toISOString()
        };
        this.users.push(newUser);
        this.logger.log(`User was created.User ID: ${newUser.id}`);
        return newUser; 
    }
    
    async findByEmail(email: string): Promise<any> {
      this.logger.log(`User with email ${email} was found`);
      return this.users.find(user => user.email === email);
    }
    
    async findById(id: number): Promise<any> {
      this.logger.log(`User with email ${id} was found`);
      return this.users.find(user => user.id === id);
    }

    async findAll(): Promise<any> {
      this.logger.log('All users were sent');
      return this.users;
    }

    async deleteUser(user: UserDTO): Promise<any> {
      const userIndex = this.users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        const deletedUser = this.users.splice(userIndex, 1);
        this.logger.log(`User with ID: ${user.id} has been deleted`);
        return deletedUser[0]; 
      } else {
        this.logger.warn(`User with ID: ${user.id} not found`);
        throw new Error('User not found');
      }
    }

    async updateUser(user: UserDTO): Promise<any> {
      const existingUser = this.users.find(u => u.id === user.id);
  
      if (!existingUser) {
          throw new Error('User not found');
      }
  

      existingUser.username = user.username || existingUser.username;
      existingUser.email = user.email || existingUser.email;
      existingUser.password = user.password || existingUser.password;
      existingUser.updateDate = new Date().toISOString(); 
  
 
      this.logger.log(`User with ID: ${user.id} has been updated`);
  
      return existingUser; 
  }
  

    
    

    

}
