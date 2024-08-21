// src/infrastructure/database/mongoose/repositories/player.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPlayerRepository } from '../../../../domain/repositories/player.repository';
import { Player } from '../../../../domain/entities/player.entity';
import { IPlayerDocument } from '../schemas/player.schema';

@Injectable()
export class PlayerRepository implements IPlayerRepository {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayerDocument>,
  ) {}

  async create(player: Player): Promise<Player> {
    const createdPlayer = new this.playerModel(player);
    const savedPlayer = await createdPlayer.save();
    return new Player(
      savedPlayer.id,
      savedPlayer.name,
      savedPlayer.team,
      savedPlayer.runs,
      savedPlayer.ballsFaced,
      savedPlayer.wickets,
      savedPlayer.oversBowled,
      savedPlayer.economy,
    );
  }

  async findById(id: string): Promise<Player | null> {
    const player = await this.playerModel.findById(id).exec();
    return player
      ? new Player(
          player.id,
          player.name,
          player.team,
          player.runs,
          player.ballsFaced,
          player.wickets,
          player.oversBowled,
          player.economy,
        )
      : null;
  }

  async findAll(): Promise<Player[]> {
    const players = await this.playerModel.find().exec();
    return players.map(
      (player) =>
        new Player(
          player.id,
          player.name,
          player.team,
          player.runs,
          player.ballsFaced,
          player.wickets,
          player.oversBowled,
          player.economy,
        ),
    );
  }

  async update(player: Partial<Player>): Promise<Player> {
    const updatedPlayer = await this.playerModel
      .findByIdAndUpdate(player.id, player, { new: true })
      .exec();
    return new Player(
      updatedPlayer.id,
      updatedPlayer.name,
      updatedPlayer.team,
      updatedPlayer.runs,
      updatedPlayer.ballsFaced,
      updatedPlayer.wickets,
      updatedPlayer.oversBowled,
      updatedPlayer.economy,
    );
  }

  async delete(id: string): Promise<void> {
    await this.playerModel.findByIdAndDelete(id).exec();
  }

  // Method to update bowler statistics
  async updateBowlerStats(
    playerId: string,
    bowlerStats: Partial<Player | null>,
  ): Promise<Player> {
    const player = await this.playerModel
      .findByIdAndUpdate(playerId, { $set: bowlerStats }, { new: true })
      .exec();
    return player
      ? new Player(
          player.id,
          player.name,
          player.team,
          player.runs,
          player.ballsFaced,
          player.wickets,
          player.oversBowled,
          player.economy,
        )
      : null;
  }

  // Method to update batsman statistics
  async updateBatsmanStats(
    playerId: string,
    batsmanStats: Partial<Player>,
  ): Promise<Player> {
    const updatedPlayer = await this.playerModel
      .findByIdAndUpdate(playerId, { $set: batsmanStats }, { new: true })
      .exec();
    return new Player(
      updatedPlayer.id,
      updatedPlayer.name,
      updatedPlayer.team,
      updatedPlayer.runs,
      updatedPlayer.ballsFaced,
      updatedPlayer.wickets,
      updatedPlayer.oversBowled,
      updatedPlayer.economy,
    );
  }
}
