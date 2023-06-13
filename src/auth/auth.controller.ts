import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SingInDto } from 'src/users/dto/signin-user.dto';

@ApiTags('SigIn/Signup')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign In' })
  @ApiResponse({ status: 201, type: SingInDto })
  @ApiProperty({ example: { email: 'user@mail.com', password: 'password' } })
  @Post('signin')
  async login(@Body() userDto: SingInDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, type: createUserDto })
  @ApiProperty({ example: { email: 'user@mail.com', password: 'password' } })
  @Post('signup')
  async registration(@Body() userDto: createUserDto) {
    return this.authService.registration(userDto);
  }
}
