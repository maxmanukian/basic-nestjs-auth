import { ApiProperty } from "@nestjs/swagger"

export class createUserDto{ 
    @ApiProperty({ example: 'email@mail.ru', description: 'User email' })
    readonly email: string

    @ApiProperty({ example: 'password', description: 'User Password' })
    readonly password: string
    
    @ApiProperty({ example: 'Full Name', description: 'User Full Name' })
    readonly fullname: string

    @ApiProperty({ example: 18, description: 'User Age' })
    readonly age: number
}