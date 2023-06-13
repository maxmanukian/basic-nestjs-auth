import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { createUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(dto: createUserDto) {
    try {
      const userExists = await this.getUserByEmail(dto.email);
      if (userExists) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const hashedPwd = await bcrypt.hash(dto.password, 10);
  
      const newUser = {
        email: dto.email,
        password: hashedPwd,
        fullname: dto.fullname,
        age: dto.age

      };
  
      const createdUser = await new this.userModel(newUser).save();
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    return this.userModel.find().exec();
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  
}
