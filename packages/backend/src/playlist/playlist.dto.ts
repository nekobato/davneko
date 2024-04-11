import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistDto {}

export class DeletePlaylistDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdatePlaylistNameDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class AddPlaylistItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  audioId: string;
  @IsNumber()
  @IsNotEmpty()
  orderInPlaylist: string;
}

export class RemovePlaylistItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  audioId: string;
}

export class ReorderPlaylistItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  audioId: string;
  @IsString()
  @IsNumber()
  orderInPlaylist: string;
}
