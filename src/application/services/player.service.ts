// src/application/services/player.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { IPlayerRepository } from '../../domain/repositories/player.repository';
import { Player } from '../../domain/entities/player.entity';
import { CreatePlayerDto } from '../../interfaces/http/dtos/create-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @Inject('IPlayerRepository')
    private readonly playerRepository: IPlayerRepository,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { name, team, runs, ballsFaced, wickets, oversBowled, economy } =
      createPlayerDto;
    const player = new Player(
      '',
      name,
      team,
      runs || 0,
      ballsFaced || 0,
      wickets || 0,
      oversBowled || 0,
      economy || 0,
    );
    return this.playerRepository.create(player);
  }

  async getPlayerById(id: string): Promise<Player | null> {
    return this.playerRepository.findById(id);
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.playerRepository.findAll();
  }

  async updatePlayer(
    id: string,
    updatePlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const player = new Player(
      id,
      updatePlayerDto.name,
      updatePlayerDto.team,
      updatePlayerDto.runs,
      updatePlayerDto.ballsFaced,
      updatePlayerDto.wickets,
      updatePlayerDto.oversBowled,
      updatePlayerDto.economy,
    );
    return this.playerRepository.update(player);
  }

  async deletePlayer(id: string): Promise<void> {
    await this.playerRepository.delete(id);
  }
}
