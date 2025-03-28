import { Controller, Get, Patch, Delete, Body, UseGuards, Request, ValidationPipe, Logger, BadRequestException} from '@nestjs/common';
import { UserService } from './user.service';
import {UpdateUserDTO} from '../dto/updateUser.dto';
import { AuthGuard } from '../auth/auth.guard';
import { validateUpdateUserDTO } from '../validationShema/validatorUpdateUserDTO';
//ValidationPipe

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
      private readonly logger = new Logger(UserController.name);

    @Get('') // GET /user
    findAll(){
        this.logger.log(`Getting all users`);
        return this.userService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('profile') // GET /profile
    getUserProfile(@Request() request){
        this.logger.log(`Getting user profile`);
        return request.user
    }

    @UseGuards(AuthGuard)
    @Patch('profile/name') // PATCH /user/profile/name
    resetName(@Request() request, @Body() updateData: UpdateUserDTO) {
        const errorMessage = validateUpdateUserDTO(updateData);
            if (errorMessage) {
                this.logger.warn(`Name data validation failed: ${JSON.stringify(errorMessage)}`);
                throw new BadRequestException({
                    message: errorMessage,
                    error: "Bad request",
                    statusCode: 400
                });
            }
        this.logger.log(`Resetting user name. User ID: ${request.user.id}`);
        return this.userService.resetName(request.user.id, updateData);
    }

    @UseGuards(AuthGuard)
    @Patch('profile/email') // PATCH /user/profile/email
    resetEmail(@Request() request, @Body() updateData: UpdateUserDTO) {
        const errorMessage = validateUpdateUserDTO(updateData);
        if (errorMessage) {
            this.logger.warn(`Name data validation failed: ${JSON.stringify(errorMessage)}`);
            throw new BadRequestException({
                message: errorMessage,
                error: "Bad request",
                statusCode: 400
            });
        }
        this.logger.log(`Resetting user email. User ID: ${request.user.id}`);
        return this.userService.resetEmail(request.user.id, updateData);
    }

    @UseGuards(AuthGuard)
    @Patch('profile/password') // PATCH /user/profile/password
    resetPassword(@Request() request, @Body() updateData: UpdateUserDTO) {
        const errorMessage = validateUpdateUserDTO(updateData);
        if (errorMessage) {
            this.logger.warn(`Name data validation failed: ${JSON.stringify(errorMessage)}`);
            throw new BadRequestException({
                message: errorMessage,
                error: "Bad request",
                statusCode: 400
            });
        }
        this.logger.log(`Resetting user password. User ID: ${request.user.id}`);
        return this.userService.resetPassword(request.user.id, updateData);
    }

    @UseGuards(AuthGuard)
    @Delete('profile') // DELETE /user/profile
    deleteUser(@Request() request){
        this.logger.log(`Deleting user profile`);
        return this.userService.deleteUser(request.user);
    }

}