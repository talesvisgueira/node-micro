
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";
import { OrganizationCreateRequest } from "@myorg/core/dist/interfaces/organizationCreateRequest";


export class OrganizationCreateDto implements OrganizationCreateRequest{


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