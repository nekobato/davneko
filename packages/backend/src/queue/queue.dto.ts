import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQueueDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  audioId: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsNumber()
  @IsNotEmpty()
  orderInQueue: number;
}

export class NewQueueDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  audioId: string;
  @IsNumber()
  @IsNotEmpty()
  order: number;
}

export class UpdateQueueDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsNumber()
  @IsNotEmpty()
  order: number;
  @IsNumber()
  @IsNotEmpty()
  newOrder: number;
}

export type QueueStatus = 'upcoming' | 'played';
