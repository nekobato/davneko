import { Injectable } from '@nestjs/common';
import { CreateExploreDto } from './dto/create-explore.dto';
import { UpdateExploreDto } from './dto/update-explore.dto';

@Injectable()
export class ExploreService {
  create(createExploreDto: CreateExploreDto) {
    return 'This action adds a new explore';
  }

  findAll() {
    return `This action returns all explore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} explore`;
  }

  update(id: number, updateExploreDto: UpdateExploreDto) {
    return `This action updates a #${id} explore`;
  }

  remove(id: number) {
    return `This action removes a #${id} explore`;
  }
}
