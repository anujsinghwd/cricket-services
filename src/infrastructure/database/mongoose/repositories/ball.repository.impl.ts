// src/infrastructure/database/mongoose/repositories/ball.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBallDocument } from '../schemas/ball.schema';
import { Ball } from '../../../../domain/entities/ball.entity';
import { IBallRepository } from '../../../../domain/repositories/ball.repository';

@Injectable()
export class BallRepository implements IBallRepository {
  constructor(
    @InjectModel('Ball') private readonly ballModel: Model<IBallDocument>,
  ) {}

  async addBall(ball: Ball): Promise<Ball> {
    const createdBall = new this.ballModel(ball);
    const savedBall = await createdBall.save();
    return savedBall.toObject() as Ball;
  }

  async getBallsByMatchId(matchId: string): Promise<Ball[]> {
    return this.ballModel.find({ matchId }).exec();
  }
}
