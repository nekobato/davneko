import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { FavAudioDto, UnfavAudioDto, UpdateAudioDto } from './audio.dto';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get()
  findAll() {
    return this.audioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioService.findOne(id);
  }

  @Post(':id/update')
  update(@Req() req, @Param('id') id: string, @Body() body: UpdateAudioDto) {
    return this.audioService.update(id, req.user.id, body);
  }

  @Post(':id/delete')
  remove(@Req() req, @Param('id') id: string) {
    return this.audioService.remove(id, req.user.id);
  }

  @Post('fav')
  fav(@Req() req, @Body() body: FavAudioDto) {
    return this.audioService.createFav(req.user.id, body.audioId);
  }

  @Post('unfav')
  unfav(@Req() req, @Body() body: UnfavAudioDto) {
    return this.audioService.deleteFav(req.user.id, body.audioId);
  }

  @Get(':id/segments.m3u8')
  async streamAudio(@Res() res: Response, @Param('id') id: string) {
    // res is a m3u8 file
    res.writeHead(200, {
      'Content-Type': 'application/vnd.apple.mpegurl',
    });
    res.send('[]');
  }

  @Get(':audioId/segment/:segment')
  async streamSegment(
    @Req() req,
    @Res() res: Response,
    @Param('audioId') audioId: string,
    @Param('segment') segment: string,
  ) {
    const segmentPath = await this.audioService.getSegmentFile(
      req.user.id,
      audioId,
      +segment,
    );

    res.writeHead(200, {
      'Content-Type': 'audio/mp3',
      'Content-Disposition': `inline; filename="${audioId}-${segment}.mp3"`,
    });

    res.sendFile(segmentPath);
  }
}
