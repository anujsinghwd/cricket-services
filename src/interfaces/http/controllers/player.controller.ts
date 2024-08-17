// src/interfaces/http/controllers/player.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PlayerService } from '../../../application/services/player.service';
import { CreatePlayerDto } from '../dtos/create-player.dto';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.createPlayer(createPlayerDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.playerService.getPlayerById(id);
  }

  @Get()
  async findAll() {
    return this.playerService.getAllPlayers();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlayerDto: CreatePlayerDto,
  ) {
    return this.playerService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.playerService.deletePlayer(id);
  }
}
