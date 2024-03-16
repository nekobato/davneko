import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AudioService } from './audio.service';
import { UpdateAudioDto } from './dto/update-audio.dto';
import ffmpeg from 'fluent-ffmpeg';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get()
  findAll() {
    return this.audioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudioDto: UpdateAudioDto) {
    return this.audioService.update(+id, updateAudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioService.remove(+id);
  }

  @Post('fav')
  fav(@Body() favAudioDto: FavAudioDto) {
    return this.audioService.createFav(favAudioDto);
  }

  @Post('unfav')
  unfav(@Body() unfavAudioDto: UnfavAudioDto) {
    return this.audioService.removeFav(unfavAudioDto);
  }

  @Get(':id/stream')
  streamAudio(
    @Res() res: Response,
    @Query('bitrate') bitrate: string = '128k',
    @Param('id') id: string,
  ) {
    const filePath = await this.audioService.getFilePath(id);

    res.writeHead(200, {
      'Content-Type': 'audio/mp3',
      'Content-Disposition': 'inline; filename="output.mp3"',
    });

    ffmpeg(filePath)
      .audioBitrate(bitrate)
      .format('mp3')
      .on('end', function () {
        console.log('Stream finished');
      })
      .on('error', function (err) {
        console.error('Stream error:', err);
        res.status(500).send('Error processing audio');
      })
      .pipe(res, { end: true });
  }

  @Get(':id/segments/:segment')
  async streamSegment(
    @Res() res: Response,
    @Param('id') id: string,
    @Param('segment') segment: string,
  ) {
    const segmentPath = await this.audioService.getSegmentPath(id, segment);

    res.writeHead(200, {
      'Content-Type': 'audio/mp3',
      'Content-Disposition': 'inline; filename="output.mp3"',
    });

    res.sendFile(segmentPath);
  }
}
