import { Body, Controller, Post, HttpCode, HttpStatus, Logger, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from '../dto/signUp.dto';
import { LogInDTO } from '../dto/logIn.dto';
import { validateSignUpDTO } from '../validationShema/validatorSignUpDTO';
import { validateLogInDTO } from '../validationShema/validatorLogInDTO';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('signUp') // POST /signUp
  signUp(@Body() signUpData: SignUpDTO) {
    const errorMessage = validateSignUpDTO(signUpData);
    if (errorMessage) {
        this.logger.warn(`Sign up data validation failed: ${JSON.stringify(errorMessage)}`);
        throw new BadRequestException({
            message: errorMessage,
            error: "Bad request",
            statusCode: 400
        });
    }
    this.logger.log(`User sign up process started`);
    return this.authService.signUp(signUpData);
  }

  @Post('logIn') // POST /logIn
  logIn(@Body() logInData: LogInDTO) {
    const errorMessage = validateLogInDTO(logInData);
    if (errorMessage) {
        this.logger.warn(`Log In data validation failed: ${JSON.stringify(errorMessage)}`);
        throw new BadRequestException({
            message: errorMessage,
            error: "Bad request",
            statusCode: 400
        });
    }
    this.logger.log(`User log in process started`);
    return this.authService.logIn(logInData);
  }
}

