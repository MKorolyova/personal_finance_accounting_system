import { IsString,  IsInt, IsEmail } from "class-validator";
export class UserDTO {
    @IsString()
    id: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}
