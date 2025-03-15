import { IsString,  IsInt, IsEmail } from "class-validator";
export class UserDTO {
    @IsInt()
    id: number;

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}
