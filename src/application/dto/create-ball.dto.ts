// src/application/dtos/create-ball.dto.ts
import { IsString } from 'class-validator';
import { Ball } from '../../domain/entities/ball.entity';

export class CreateBallDto extends Ball {
  @IsString()
  team: string;
}
