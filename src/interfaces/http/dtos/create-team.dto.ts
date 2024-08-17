// src/interfaces/http/dtos/create-team.dto.ts
import { IsString, IsArray } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  readonly name: string;

  @IsArray()
  readonly players: string[];
}
