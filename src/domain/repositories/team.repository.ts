// src/domain/repositories/team.repository.ts
import { Team } from '../entities/team.entity';

export interface ITeamRepository {
  // getTeamByMatchId(matchId: string): unknown;
  // updateTeamStats(id: any, arg1: { totalRuns: any; }): unknown;
  create(team: Team): Promise<Team>;
  findById(id: string): Promise<Team | null>;
  findAll(): Promise<Team[]>;
  update(team: Team): Promise<Team>;
  delete(id: string): Promise<void>;
}
