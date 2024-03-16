import { Controller, Get } from '@nestjs/common';
import { ExploreService } from './explore.service';

@Controller('explore')
export class ExploreController {
  constructor(private readonly exploreService: ExploreService) {}

  @Get('search')
  search() {}

  @Get('genre')
  genre() {}
}
