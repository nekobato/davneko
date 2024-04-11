import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { QueueRepository } from './queue.repository';
import { generateQueueId } from 'src/utils/crypt';

@Injectable()
export class QueueService {
  constructor(@Inject() private queueRepository: QueueRepository) {}

  findUpcoming(userId: string) {
    return this.queueRepository.findQueueByUserId(userId, 'upcoming');
  }

  findPlayed(userId: string) {
    return this.queueRepository.findQueueByUserId(userId, 'played');
  }

  generateNext(userId: string) {
    return [];
  }

  create(newQueue: { userId: string; audioId: string; order: number }) {
    this.queueRepository.create({
      id: generateQueueId(),
      userId: newQueue.userId,
      audioId: newQueue.audioId,
      orderInQueue: newQueue.order,
    });
  }

  findAll() {
    return `This action returns all queue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} queue`;
  }

  update(updateQueueDto: {
    userId: string;
    id: string;
    order: number;
    newOrder: number;
  }) {
    if (updateQueueDto.order < updateQueueDto.newOrder) {
      return this.queueRepository.reOrderQueueToLater(
        updateQueueDto.userId,
        updateQueueDto.id,
        updateQueueDto.newOrder,
      );
    } else {
      return this.queueRepository.reOrderQueueToEarlier(
        updateQueueDto.userId,
        updateQueueDto.id,
        updateQueueDto.newOrder,
      );
    }
  }

  async remove(userId: string, id: string) {
    const queue = await this.queueRepository.findQueueById(id);

    if (queue.userId !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.queueRepository.deleteQueue(id);
  }
}
