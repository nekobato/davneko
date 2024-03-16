import { Injectable } from '@nestjs/common';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';

@Injectable()
export class AudioService {
  removeFav(unfavAudioDto: UnfavAudioDto) {
    throw new Error('Method not implemented.');
  }
  createFav(favAudioDto: FavAudioDto) {
    throw new Error('Method not implemented.');
  }
  getFilePath(id: string) {
    throw new Error('Method not implemented.');
  }
  create(createAudioDto: CreateAudioDto) {
    return 'This action adds a new audio';
  }

  findAll() {
    return `This action returns all audio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} audio`;
  }

  update(id: number, updateAudioDto: UpdateAudioDto) {
    return `This action updates a #${id} audio`;
  }

  remove(id: number) {
    return `This action removes a #${id} audio`;
  }
}
