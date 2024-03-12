import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MyContorller } from './my.controller';
import { MyService } from './my.service';

@Module({
  controllers: [MyContorller],
  providers: [MyService, PrismaService],
  exports: [MyService],
})
export class MyModule {}
