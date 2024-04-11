import { Inject, Injectable } from '@nestjs/common';
import { PlaylistRepository } from './playlist.repository';

@Injectable()
export class PlaylistService {
  constructor(@Inject() private queueRepository: PlaylistRepository) {}

  create(userId: string) {
    return 'This action adds a new playlist';
  }

  findAll() {
    return `This action returns all playlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(
    id: number,
    {
      name,
    }: {
      name: string;
    },
  ) {
    return this.queueRepository.updatePlaylist(id, { name });
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
