import { Logger, Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserDTO } from "./dto/user.dto";
import { patterns } from '../patterns';
import {UpdateUserDTO} from "./dto/update-user.dto";
import {SignUpDTO} from '../user/dto/sign-up.dto';
import {LogInDTO} from '../user/dto/log-in.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}
    private readonly logger = new Logger(UserController.name);

    @MessagePattern(patterns.USER.SIGN_UP)
    async signUp(signUpData: SignUpDTO) {
        this.logger.log(`Creating user with data ${JSON.stringify(signUpData)}`);
        return this.userService.signUp(signUpData);
    }

    @MessagePattern(patterns.USER.FIND_ALL)
    async findAll() {
        this.logger.log(`Finding all users`);
        return this.userService.findAll();
    }

    @MessagePattern(patterns.USER.FIND_BY_EMAIL)
    async findByEmail(email: string) {
        this.logger.log(`Finding user with email ${email}`);
        return this.userService.findByEmail(email);
    }

    @MessagePattern(patterns.USER.FIND_BY_ID)
    async findByID(id: string) {
        this.logger.log(`Finding user with id ${id}`);
        return this.userService.findById(id);
    }

    @MessagePattern(patterns.USER.DELETE)
    async deleteUser(user:UserDTO) {
        this.logger.log(`Deleting user with id ${JSON.stringify(user.id)}`);
        return this.userService.deleteUser(user);
    }

    @MessagePattern(patterns.USER.UPDATE)
    async updateUser({ id, updateData }:{id: string, updateData: UpdateUserDTO}) {
        this.logger.log(`Updating user with id ${JSON.stringify(id)}`);
        return this.userService.updateUser(id, updateData);
    }
    
}

