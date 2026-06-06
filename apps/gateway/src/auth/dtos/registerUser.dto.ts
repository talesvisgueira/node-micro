import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

 enum Role {
        USER = 'user',
        ADMIN = 'admin',
        SELLER = 'seller'
    }

export class RegisterUserDto {

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

    @IsString()
    @ApiProperty({
        description: '',
        example: '',
    })
    fistName: string;

    @IsString()
    @ApiProperty({
        description: '',
        example: '',
    })
    lastName: string;

    @IsString()
    @ApiProperty({
        description: '',
        example: '',
        enum: ['user','admin','seller']
    })
    role?: Role = Role.USER;
}