import { PartialType } from '@nestjs/mapped-types';
import { CreateExploreDto } from './create-explore.dto';

export class UpdateExploreDto extends PartialType(CreateExploreDto) {}
