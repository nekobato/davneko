import { PartialType } from '@nestjs/mapped-types';
import { CreateAudioDto } from './create-audio.dto';

export class UpdateAudioDto extends PartialType(CreateAudioDto) {}
