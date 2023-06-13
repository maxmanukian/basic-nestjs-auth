import { Body, Controller,Get,Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schema/user.schema';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}
  
  @ApiOperation({summary: "Create User",})

  @ApiResponse({status:201, type:User})
  @Post()
  create(@Body() userDto: createUserDto) {
    return this.userService.createUser(userDto);
  }
  
  @ApiOperation({summary: "Get Users"})
  @ApiResponse({status:200, type:[User]})
  @Get()
  getAll() {
    return this.userService.getUsers();
  }
}
