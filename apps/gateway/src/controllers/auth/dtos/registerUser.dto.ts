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
    email!: string;

    @IsString()
    @ApiProperty({
        description: '',
        example: '',
    })
    name!: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({
        description: '',
        example: '',
        minLength: 6
    })
    password!: string;


    @IsString()
    @ApiProperty({
        description: '',
        example: '',
        enum: ['ADMIN','VENDEDOR','USUARIO']
    })
    role?: Role = Role.USER;
}