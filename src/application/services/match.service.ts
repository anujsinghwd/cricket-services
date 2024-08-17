// src/application/services/match.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { IMatchRepository } from '../../domain/repositories/match.repository';
import { Match } from '../../domain/entities/match.entity';
import { CreateMatchDto } from '../../interfaces/http/dtos/create-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @Inject('IMatchRepository')
    private readonly matchRepository: IMatchRepository,
  ) {}

  async createMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    const {
      teamA,
      teamB,
      scoreTeamA = 0,
      scoreTeamB = 0,
      wicketsTeamA = 0,
      wicketsTeamB = 0,
      oversPlayedTeamA = 0,
      oversPlayedTeamB = 0,
      players = [],
      events = [],
    } = createMatchDto;

    const match = new Match(
      '',
      teamA,
      teamB,
      scoreTeamA,
      scoreTeamB,
      wicketsTeamA,
      wicketsTeamB,
      oversPlayedTeamA,
      oversPlayedTeamB,
      players,
      events,
    );

    return this.matchRepository.create(match);
  }

  async getMatchById(id: string): Promise<Match | null> {
    return this.matchRepository.findById(id);
  }

  async getAllMatches(): Promise<Match[]> {
    return this.matchRepository.findAll();
  }

  async updateMatch(
    id: string,
    updateMatchDto: CreateMatchDto,
  ): Promise<Match> {
    const {
      teamA,
      teamB,
      scoreTeamA = 0,
      scoreTeamB = 0,
      wicketsTeamA = 0,
      wicketsTeamB = 0,
      oversPlayedTeamA = 0,
      oversPlayedTeamB = 0,
      players = [],
      events = [],
    } = updateMatchDto;

    const match = new Match(
      id,
      teamA,
      teamB,
      scoreTeamA,
      scoreTeamB,
      wicketsTeamA,
      wicketsTeamB,
      oversPlayedTeamA,
      oversPlayedTeamB,
      players,
      events,
    );

    return this.matchRepository.update(match);
  }

  async deleteMatch(id: string): Promise<void> {
    await this.matchRepository.delete(id);
  }
}
