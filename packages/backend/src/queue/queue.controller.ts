import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { NewQueueDto, UpdateQueueDto } from './queue.dto';
import { QueueService } from './queue.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  // current & log
  @Get()
  findAll() {
    return this.queueService.findAll();
  }

  @Get('upcoming')
  @UseGuards(AuthGuard('jwt'))
  upcoming(@Req() req) {
    return this.queueService.findUpcoming(req.user.id);
  }

  @Get('played')
  @UseGuards(AuthGuard('jwt'))
  played(@Req() req) {
    return this.queueService.findPlayed(req.user.id);
  }

  @Get('generate_next')
  @UseGuards(AuthGuard('jwt'))
  generateNext(@Req() req) {
    return this.queueService.generateNext(req.user.id);
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  add(@Req() req, @Body() body: NewQueueDto) {
    return this.queueService.create({
      userId: req.user.id,
      audioId: body.audioId,
      order: body.order,
    });
  }

  @Post('remove')
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req, @Body() body: UpdateQueueDto) {
    return this.queueService.remove(req.user.id, body.id);
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  update(@Req() req, @Body() body: UpdateQueueDto) {
    return this.queueService.update({
      userId: req.user.id,
      id: body.id,
      order: body.order,
      newOrder: body.newOrder,
    });
  }
}
