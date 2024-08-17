// src/interfaces/http/dtos/create-match.dto.ts
import { IsString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsString()
  readonly teamA: string;

  @IsString()
  readonly teamB: string;

  @IsOptional()
  @IsNumber()
  readonly scoreTeamA?: number;

  @IsOptional()
  @IsNumber()
  readonly scoreTeamB?: number;

  @IsOptional()
  @IsNumber()
  readonly wicketsTeamA?: number;

  @IsOptional()
  @IsNumber()
  readonly wicketsTeamB?: number;

  @IsOptional()
  @IsNumber()
  readonly oversPlayedTeamA?: number;

  @IsOptional()
  @IsNumber()
  readonly oversPlayedTeamB?: number;

  @IsArray()
  @IsOptional()
  readonly players?: string[];

  @IsArray()
  @IsOptional()
  readonly events?: string[];
}
