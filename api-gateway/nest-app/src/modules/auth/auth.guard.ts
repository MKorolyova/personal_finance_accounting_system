
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../user/user.service';

  
@Injectable()
export class AuthGuard implements CanActivate {

constructor(
    private jwtService: JwtService,
    private readonly userService: UserService
) {}
private readonly logger = new Logger(AuthGuard.name);

async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
        this.logger.warn('No JWT token provided for verification');
        throw new UnauthorizedException();
    }

    try {

        this.logger.log(`Received JWT token for verification: ${token}`);
        const payload = await this.jwtService.verifyAsync(token,{ secret: process.env.JWT_SECRET } );
        this.logger.log(`Finding user by ID: ${payload.id}`);
        const user = await this.userService.findUserById(payload.id)

        if (!user) {
            this.logger.warn(`User not found for ID: ${payload.id}`);
            throw new UnauthorizedException();
        }
        
        request['user'] = user;
        this.logger.log(`User authenticated successfully. User ID: ${user.id}`);

    } catch (error) {
        this.logger.error(`JWT verification or user fetching failed: ${error.message}`);
        throw new UnauthorizedException();
    }

    return true;
}

private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}

}
