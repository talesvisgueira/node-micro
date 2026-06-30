
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";
import { UserLoginRequest } from "@myorg/core/dist/interfaces/userLoginRequest";

export class LoginDto implements UserLoginRequest {

    @IsEmail()
    @ApiProperty({
        description: '',
        example: ''
    })
    username!: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({
        description: '',
        example: '',
        minLength: 6
    })
    password!: string;
}