import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from '../users/dto/create-user.dto';
import { SingInDto} from '../users/dto/signin-user.dto'
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(signindto: SingInDto) {
    const user: User = await this.validateUser(signindto);
    return this.generateToken(user);
  }

  async registration(userDto: createUserDto) {
    const newUser = await this.userService.createUser(userDto);
    return this.generateToken(newUser);
  }
 
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.userId };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: SingInDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException('Invalid login or Password', HttpStatus.BAD_REQUEST);
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new UnauthorizedException({ message: 'Invalid Login or Password' });
    }
    return user;
  }
}
