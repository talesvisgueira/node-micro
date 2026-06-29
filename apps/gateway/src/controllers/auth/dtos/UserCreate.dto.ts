
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";
import { UserCreateRequest } from "@myorg/core/dist/interfaces/userCreateRequest";

 enum Role {
        USER = 'user',
        ADMIN = 'admin',
        SELLER = 'seller'
    }

export class UserCreateDto implements UserCreateRequest {

    @IsString()
    @ApiProperty({
        description: '',
        example: ''
    })
    code!: string;

    @IsString()
    @ApiProperty({
        description: '',
        example: '',
    })
    name!: string;

    @IsEmail()
    @ApiProperty({
        description: '',
        example: ''
    })
    email!: string;

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