import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from '../user/user.service';
import { generateUserId } from '../utils/generateId';

export type CensoredUser = Omit<Prisma.UserSelect, 'password'>;

@Controller('user')
export class UserContorller {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<any> {
    const { password, ...user } = await this.userService.user({
      username,
    });
    return user;
  }

  @Post()
  async createUser(
    @Body() userData: { username: string; email: string; password: string },
  ): Promise<any> {
    if (!userData.username) {
      throw new Error('username is required');
    }
    if (!userData.email) {
      throw new Error('email is required');
    }
    if (!userData.password) {
      throw new Error('password is required');
    }

    const existingUser = await this.userService.user({
      email: userData.email,
    });

    if (existingUser) {
      throw new Error('email already exists');
    }

    const id = generateUserId();
    return this.userService.create({ ...userData, id });
  }

  @Patch()
  async updateUser(
    @Body()
    userData: {
      id: string;
      username: string;
      email: string;
      password: string;
    },
  ): Promise<any> {
    const { id, ...data } = userData;

    if (!id) {
      throw new Error('User ID is required');
    }

    return this.userService.updateUser({ where: { id: userData.id }, data });
  }
}
