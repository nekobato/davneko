import { Injectable } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';

@Injectable()
export class AudioConversionService {
  async convertToHLS(
    inputFilePath: string,
    outputDir: string,
  ): Promise<{
    manifest: string;
    segments: string[];
  }> {
    const manifestFilePath = path.join(outputDir, 'playlist.m3u8');
    return new Promise((resolve, reject) => {
      ffmpeg(inputFilePath)
        .output(manifestFilePath)
        .outputOptions([
          // 128k mp3
          '-acodec libmp3lame',
          '-b:a 128k',
          '-ac 2',
          '-ar 44100',
          // 5, 10, 10, ...のHLS
          '-f hls',
          '-hls_init_time 5',
          '-hls_time 10',
          '-hls_list_size 0',
          'hls_playlist_type vod',
          '-hls_segment_filename',
          path.join(outputDir, 'segment_%03d.ts'),
        ])
        .on('end', () => {
          resolve({
            manifest: manifestFilePath,
            segments: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) =>
              path.join(outputDir, `segment_${i}.ts`),
            ),
          });
        })
        .on('error', (err) => {
          reject(err);
        })
        .run();
    });
  }
}
