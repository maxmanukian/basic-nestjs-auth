import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
@ApiProperty({ example: 'djksckjb4151', description: 'Unique Indeficator' })
  @Prop()
  userId: string;

  @ApiProperty({ example: 'user@email.com', description: 'Email' })
  @Prop()
  email: string;

  @ApiProperty({ example: 'password', description: 'User Password' })
  @Prop()
  password: string;

  @ApiProperty({ example: 'User Useryan', description: 'User Full Name' })
  @Prop()
  fullname: string;

  @ApiProperty({ example: 18, description: 'User Age' })
  @Prop()
  age: number;
}

export const userSchema = SchemaFactory.createForClass(User);
