// src/domain/repositories/team.repository.ts
import { Team } from '../entities/team.entity';

export interface ITeamRepository {
  create(team: Team): Promise<Team>;
  findById(id: string): Promise<Team | null>;
  findAll(): Promise<Team[]>;
  update(team: Team): Promise<Team>;
  delete(id: string): Promise<void>;
}
