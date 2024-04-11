import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './dto/create-file.dto';

export class UpdateFileDto extends PartialType(CreateFileDto) {}
