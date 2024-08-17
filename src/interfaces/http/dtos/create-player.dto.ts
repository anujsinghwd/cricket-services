// src/interfaces/http/dtos/create-player.dto.ts
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly team: string; // Team ID

  @IsOptional()
  @IsNumber()
  readonly runs?: number;

  @IsOptional()
  @IsNumber()
  readonly ballsFaced?: number;

  @IsOptional()
  @IsNumber()
  readonly wickets?: number;

  @IsOptional()
  @IsNumber()
  readonly oversBowled?: number;

  @IsOptional()
  @IsNumber()
  readonly economy?: number;
}
