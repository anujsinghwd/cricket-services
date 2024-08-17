// src/domain/repositories/ball.repository.ts
import { Ball } from '../entities/ball.entity';

export interface IBallRepository {
  addBall(ball: Ball): Promise<Ball>;
  getBallsByMatchId(matchId: string): Promise<Ball[]>;
  //   getBallById(ballId: string): Promise<Ball | null>;
  //   deleteBallById(ballId: string): Promise<void>;
  //   updateBall(ballId: string, ball: Partial<Ball>): Promise<Ball | null>;
}
