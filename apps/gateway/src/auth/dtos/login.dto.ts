import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {

    @IsEmail()
    @ApiProperty({
        description: '',
        example: ''
    })
    email: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({
        description: '',
        example: '',
        minLength: 6
    })
    password: string;
}