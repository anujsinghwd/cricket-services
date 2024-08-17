// src/domain/repositories/match.repository.ts
import { Match } from '../entities/match.entity';

export interface IMatchRepository {
  create(match: Match): Promise<Match>;
  findById(id: string): Promise<Match | null>;
  findAll(): Promise<Match[]>;
  update(match: Match): Promise<Match>;
  delete(id: string): Promise<void>;
}
