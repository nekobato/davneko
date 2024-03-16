import { Module } from '@nestjs/common';
import { ExploreService } from './explore.service';
import { ExploreController } from './explore.controller';

@Module({
  controllers: [ExploreController],
  providers: [ExploreService],
})
export class ExploreModule {}
