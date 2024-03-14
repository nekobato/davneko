import { IsAlphanumeric, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;
  @IsOptional()
  username: string;
  @IsOptional()
  password: string;
}
