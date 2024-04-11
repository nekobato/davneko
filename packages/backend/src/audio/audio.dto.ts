import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAudioDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  audioUrl: string;
  @IsString()
  imageUrl: string;
}

export class FavAudioDto {
  @IsString()
  @IsNotEmpty()
  audioId: string;
}

export class UnfavAudioDto {
  @IsString()
  @IsNotEmpty()
  audioId: string;
}
