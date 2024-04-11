import { Module } from '@nestjs/common';
import { UserContorller } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserContorller],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
