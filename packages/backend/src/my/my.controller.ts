import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { MyService } from './my.service';

export type CensoredUser = Omit<Prisma.UserSelect, 'password'>;

@Controller('my')
export class MyContorller {
  constructor(private readonly myService: MyService) {}

  @Get()
  async getUser(): Promise<any> {
    return this.myService.profile({});
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

    if (!data.username) {
      throw new Error('username is required');
    }
    if (!data.email) {
      throw new Error('email is required');
    }
    if (!data.password) {
      throw new Error('password is required');
    }
    return this.myService.updateProfile({ where: { id: userData.id }, data });
  }

  @Get('audio')
  @UseGuards(AuthGuard('jwt'))
  // get user from AuthGuard
  async getAudio(@Req() req): Promise<any> {
    return this.myService.audio(req.user.id);
  }
}
