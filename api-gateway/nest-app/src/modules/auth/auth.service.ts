
import { Injectable, UnauthorizedException, Logger, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from '../dto/signUp.dto';
import { LogInDTO } from '../dto/logIn.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}
    private readonly logger = new Logger(UserService.name);


    async logIn(logInData: LogInDTO): Promise<any> {

        this.logger.log(`Finding user by email: ${logInData.email}`);
        const user = await this.userService.findUserByEmail(logInData.email);

        if (!user || user.password !== logInData.password) {
            this.logger.warn(`Invalid credentials`);
            throw new UnauthorizedException('Invalid credentials');
        }

        this.logger.log(`User logged in successfully. User ID: ${user.id}`);
        const payload = { id: user.id};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(signUpData: SignUpDTO): Promise<any> {
        
        this.logger.log(`Finding user by email: ${signUpData.email}`);
        const existingUser = await this.userService.findUserByEmail(signUpData.email);
        if (existingUser) {
            this.logger.warn(`Sign up failed: User with email ${signUpData.email} already exists`);
            throw new ConflictException('User with this email already exists.');
        }
    
        this.logger.log(`Creating new user with email: ${signUpData.email}`);
        const newUser = await this.userService.createUser(signUpData);
    
        if (!newUser) {
            this.logger.error(`User creation failed`);
            throw new Error('User creation failed');
        }
    
        this.logger.log(`User created successfully with ID: ${newUser.id}`);
        const payload = { id: newUser.id };
        const accessToken = await this.jwtService.signAsync(payload);
    
        return {
            access_token: accessToken,
        };
    }
    

}
