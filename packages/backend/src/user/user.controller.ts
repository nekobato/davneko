import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './user.dto';

@Controller('user')
export class UserContorller {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe() {
    return {
      id: 1,
      username: 'name',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return await this.userService.getUserByUsername(username);
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Body()
    body: UpdateUserDto,
  ): Promise<any> {
    if (!body.id) {
      throw new BadRequestException('User ID is required');
    }

    return this.userService.updateUser({
      id: body.id,
      username: body.username,
      password: body.password,
    });
  }
}
