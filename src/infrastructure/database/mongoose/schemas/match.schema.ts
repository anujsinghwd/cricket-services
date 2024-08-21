// src/infrastructure/database/mongoose/schemas/match.schema.ts
import { Schema, Document } from 'mongoose';

const BatsmanStatsSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  runs: { type: Number, default: 0 },
  ballsFaced: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  strikeRate: { type: Number, default: 0 },
});

const BowlerStatsSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  oversBowled: { type: Number, default: 0 },
  runsConceded: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  economy: { type: Number, default: 0 },
  maidens: { type: Number, default: 0 },
});
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
  batsmenStats: Array<{
    player: string;
    runs: number;
    ballsFaced: number;
    fours: number;
    sixes: number;
    strikeRate: number;
  }>;
  bowlersStats: Array<{
    player: string;
    oversBowled: number;
    runsConceded: number;
    wickets: number;
    economy: number;
    maidens: number;
  }>;
  updated_at: Date;
  created_at: Date;
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
  batsmenStats: { type: [BatsmanStatsSchema], default: [] },
  bowlersStats: { type: [BowlerStatsSchema], default: [] },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});
