import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  // current & log
  @Get()
  findAll() {
    return this.queueService.findAll();
  }

  @Get('upcoming')
  findCurrent() {
    return this.queueService.findCurrent();
  }

  @Get('played')
  findLog() {
    return this.queueService.findLog();
  }

  @Get('generate_next')
  findNext() {
    return this.queueService.findNext();
  }

  @Post('add')
  add(@Body() updateQueueDto: UpdateQueueDto) {
    return this.queueService.add(updateQueueDto);
  }

  @Post('remove')
  remove(@Body() updateQueueDto: UpdateQueueDto) {
    return this.queueService.remove(updateQueueDto);
  }
}
