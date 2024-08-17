// src/interfaces/http/controllers/match.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { MatchService } from '../../../application/services/match.service';
import { CreateMatchDto } from '../dtos/create-match.dto';
import { Ball } from 'src/domain/entities/ball.entity';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  async create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.createMatch(createMatchDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.matchService.getMatchById(id);
  }

  @Get()
  async findAll() {
    return this.matchService.getAllMatches();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMatchDto: CreateMatchDto,
  ) {
    return this.matchService.updateMatch(id, updateMatchDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.matchService.deleteMatch(id);
  }

  @Post('ball')
  async addBall(@Body() ball: Ball): Promise<void> {
    if (ball.isWide) {
      await this.matchService.processWideBall(ball);
    } else if (ball.isNoBall) {
      await this.matchService.processNoBall(ball);
    } else if (ball.isBye || ball.isLegBye) {
      await this.matchService.processByeOrLegByeBall(ball);
    } else {
      await this.matchService.processRegularBall(ball);
    }
  }
}
