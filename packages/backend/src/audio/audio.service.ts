import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AudioRepository } from './audio.repository';

@Injectable()
export class AudioService {
  constructor(@Inject() private audioRepository: AudioRepository) {}

  getAllAudios() {
    return this.audioRepository.findAllAudio();
  }

  getAudioDetail(id: string) {
    return this.audioRepository.findAudioDetailById(id);
  }

  createFav(userId: string, audioId: string) {
    this.audioRepository.createFav(userId, audioId);
  }

  deleteFav(userId: string, audioId: string) {
    this.audioRepository.deleteFav(userId, audioId);
  }

  getFilePath(id: string) {
    throw new Error('Method not implemented.');
  }

  createAudio(newAudio: {
    title: string;
    description: string;
    audioUrl: string;
    imageUrl: string;
  }) {
    return this.audioRepository.createAudio({
      title: newAudio.title,
      audioUrl: newAudio.audioUrl,
      imageUrl: newAudio.imageUrl,
    });
  }

  update(
    audioId: string,
    userId: string,
    newAudio: {
      title: string;
      audioUrl: string;
      imageUrl: string;
    },
  ) {
    this.audioRepository.updateAudio(id, userId, newAudio);
  }

  async remove(audioId: string) {
    const audio = await this.audioRepository.findAudioById(audioId);
    if (!audio) {
      throw new NotFoundException('Audio not found');
    }

    await this.audioRepository.deleteAudio(audioId);
  }

  getSegmentFile(uesrId: string, audioId: string, segment: number) {
    return '';
  }
}
