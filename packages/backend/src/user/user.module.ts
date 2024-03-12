import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserContorller } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserContorller],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
