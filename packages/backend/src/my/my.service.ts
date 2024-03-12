import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MyService {
  getMyAudio(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async profile(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async updateProfile(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  async audio(myId: string): Promise<any> {
    return this.prisma.audio.findMany({
      where: {
        authorId: myId,
      },
      include: {
        audioFile: true,
      },
    });
  }
}
