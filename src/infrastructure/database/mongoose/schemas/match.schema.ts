// src/infrastructure/database/mongoose/schemas/match.schema.ts
import { Schema, Document } from 'mongoose';

export interface IMatchDocument extends Document {
  teamA: string;
  teamB: string;
  scoreTeamA: number;
  scoreTeamB: number;
  wicketsTeamA: number;
  wicketsTeamB: number;
  oversPlayedTeamA: number;
  oversPlayedTeamB: number;
  players: string[];
  events: string[];
}

export const MatchSchema = new Schema<IMatchDocument>({
  teamA: { type: String, ref: 'Team' },
  teamB: { type: String, ref: 'Team' },
  scoreTeamA: { type: Number, default: 0 },
  scoreTeamB: { type: Number, default: 0 },
  wicketsTeamA: { type: Number, default: 0 },
  wicketsTeamB: { type: Number, default: 0 },
  oversPlayedTeamA: { type: Number, default: 0 },
  oversPlayedTeamB: { type: Number, default: 0 },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'BallEvent' }],
});
