import { ApiProperty } from "@nestjs/swagger"

export class SingInDto {
    @ApiProperty({ example: 'email@mail.ru', description: 'User email' })
    readonly email: string

    @ApiProperty({ example: 'password', description: 'User Password' })
    readonly password: string
}