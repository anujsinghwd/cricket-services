// src/infrastructure/database/mongoose/schemas/player.schema.ts
import { Schema, Document } from 'mongoose';

export interface IPlayerDocument extends Document {
  name: string;
  team: string;
  runs: number;
  ballsFaced: number;
  wickets: number;
  oversBowled: number;
  economy: number;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  strikeRate: number;
  runsConceded: number;
  wides: number;
  noBalls: number;
  balls: number;
}

export const PlayerSchema = new Schema<IPlayerDocument>({
  name: { type: String, required: true },
  team: { type: String, ref: 'Team' },
  runs: { type: Number, default: 0 },
  ballsFaced: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  oversBowled: { type: Number, default: 0 },
  economy: { type: Number, default: 0 },
  role: { type: String, required: true },
  battingStyle: { type: String },
  bowlingStyle: { type: String },
  strikeRate: { type: Number },
  runsConceded: { type: Number },
  wides: { type: Number },
  noBalls: { type: Number },
  balls: { type: Number },
});
