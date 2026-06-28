import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";


export class RegisterUserDto {


    @IsString()
    @ApiProperty({
        description: '',
        example: '',
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

}