// src/application/services/team.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ITeamRepository } from '../../domain/repositories/team.repository';
import { Team } from '../../domain/entities/team.entity';
import { CreateTeamDto } from '../../interfaces/http/dtos/create-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @Inject('ITeamRepository') private readonly teamRepository: ITeamRepository,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const { name, players = [] } = createTeamDto;

    const team = new Team('', name, players);

    return this.teamRepository.create(team);
  }

  async getTeamById(id: string): Promise<Team | null> {
    return this.teamRepository.findById(id);
  }

  async getAllTeams(): Promise<Team[]> {
    return this.teamRepository.findAll();
  }

  async updateTeam(id: string, updateTeamDto: CreateTeamDto): Promise<Team> {
    const { name, players = [] } = updateTeamDto;

    const team = new Team(id, name, players);

    return this.teamRepository.update(team);
  }

  async deleteTeam(id: string): Promise<void> {
    await this.teamRepository.delete(id);
  }
}
