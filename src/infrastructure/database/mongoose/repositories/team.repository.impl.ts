// src/infrastructure/database/mongoose/repositories/team.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITeamRepository } from '../../../../domain/repositories/team.repository';
import { Team } from '../../../../domain/entities/team.entity';
import { ITeamDocument } from '../schemas/team.schema';

@Injectable()
export class TeamRepository implements ITeamRepository {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<ITeamDocument>,
  ) {}

  private mapDocumentToDomain(teamDocument: ITeamDocument): Team {
    return new Team(
      teamDocument._id.toString(),
      teamDocument.name,
      teamDocument.players.map((player) => player),
    );
  }

  async create(team: Team): Promise<Team> {
    const createdTeam = new this.teamModel({
      name: team.name,
      players: team.players,
    });
    const savedTeam = await createdTeam.save();
    return this.mapDocumentToDomain(savedTeam);
  }

  async findById(id: string): Promise<Team | null> {
    const teamDocument = await this.teamModel
      .findById(id)
      .populate('players')
      .exec();
    if (!teamDocument) {
      return null;
    }
    return this.mapDocumentToDomain(teamDocument);
  }

  async findAll(): Promise<Team[]> {
    const teamDocuments = await this.teamModel
      .find()
      .populate('players')
      .exec();
    return teamDocuments.map((doc) => this.mapDocumentToDomain(doc));
  }

  async update(team: Team): Promise<Team> {
    const updatedTeamDocument = await this.teamModel
      .findByIdAndUpdate(
        team.id,
        {
          name: team.name,
          players: team.players,
        },
        { new: true },
      )
      .exec();
    return this.mapDocumentToDomain(updatedTeamDocument);
  }

  async delete(id: string): Promise<void> {
    await this.teamModel.findByIdAndDelete(id).exec();
  }
}
