// src/domain/repositories/player.repository.ts
import { Player } from '../entities/player.entity';

export interface IPlayerRepository {
  create(player: Player): Promise<Player>;
  findById(id: string): Promise<Player | null>;
  findAll(): Promise<Player[]>;
  update(player: Player): Promise<Player>;
  delete(id: string): Promise<void>;
}
