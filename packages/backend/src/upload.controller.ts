import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('ファイルがアップロードされていません。');
    }
    return res.status(HttpStatus.OK).send('ファイルがアップロードされました！');
  }
}
