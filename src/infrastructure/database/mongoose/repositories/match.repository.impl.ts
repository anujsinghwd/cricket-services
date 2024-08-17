// src/infrastructure/database/mongoose/repositories/match.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMatchRepository } from '../../../../domain/repositories/match.repository';
import { Match } from '../../../../domain/entities/match.entity';
import { IMatchDocument } from '../schemas/match.schema';

@Injectable()
export class MatchRepository implements IMatchRepository {
  constructor(
    @InjectModel('Match') private readonly matchModel: Model<IMatchDocument>,
  ) {}

  async create(match: Match): Promise<Match> {
    const createdMatch = new this.matchModel(match);
    const savedMatch = await createdMatch.save();
    return new Match(
      savedMatch.id,
      savedMatch.teamA,
      savedMatch.teamB,
      savedMatch.scoreTeamA,
      savedMatch.scoreTeamB,
      savedMatch.wicketsTeamA,
      savedMatch.wicketsTeamB,
      savedMatch.oversPlayedTeamA,
      savedMatch.oversPlayedTeamB,
      savedMatch.players,
      savedMatch.events,
    );
  }

  async findById(id: string): Promise<Match | null> {
    const match = await this.matchModel.findById(id).exec();
    return match
      ? new Match(
          match.id,
          match.teamA,
          match.teamB,
          match.scoreTeamA,
          match.scoreTeamB,
          match.wicketsTeamA,
          match.wicketsTeamB,
          match.oversPlayedTeamA,
          match.oversPlayedTeamB,
          match.players,
          match.events,
        )
      : null;
  }

  async findAll(): Promise<Match[]> {
    const matches = await this.matchModel.find().exec();
    return matches.map(
      (match) =>
        new Match(
          match.id,
          match.teamA,
          match.teamB,
          match.scoreTeamA,
          match.scoreTeamB,
          match.wicketsTeamA,
          match.wicketsTeamB,
          match.oversPlayedTeamA,
          match.oversPlayedTeamB,
          match.players,
          match.events,
        ),
    );
  }

  async update(match: Match): Promise<Match> {
    const updatedMatch = await this.matchModel
      .findByIdAndUpdate(match.id, match, { new: true })
      .exec();
    return new Match(
      updatedMatch.id,
      updatedMatch.teamA,
      updatedMatch.teamB,
      updatedMatch.scoreTeamA,
      updatedMatch.scoreTeamB,
      updatedMatch.wicketsTeamA,
      updatedMatch.wicketsTeamB,
      updatedMatch.oversPlayedTeamA,
      updatedMatch.oversPlayedTeamB,
      updatedMatch.players,
      updatedMatch.events,
    );
  }

  async delete(id: string): Promise<void> {
    await this.matchModel.findByIdAndDelete(id).exec();
  }
}
