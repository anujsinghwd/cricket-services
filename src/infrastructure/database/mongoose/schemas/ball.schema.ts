// src/infrastructure/database/mongoose/schemas/ball.schema.ts
import { Schema, Document } from 'mongoose';

export interface IBallDocument extends Document {
  matchId: string;
  over: number;
  ballNumber: number;
  batsmanId: string;
  bowlerId: string;
  runs: number;
  isWicket: boolean;
  extras: number;
  isWide: boolean;
  isNoBall: boolean;
  isLegBye: boolean;
  isBye: boolean;
  isOverthrow: boolean;
  deliveryNumber: number;
  updated_at: Date;
  created_at: Date;
}

export const BallSchema = new Schema<IBallDocument>({
  matchId: { type: String, ref: 'Match', required: true },
  over: { type: Number, required: true },
  ballNumber: { type: Number, required: true },
  batsmanId: { type: String, ref: 'Player', required: true },
  bowlerId: { type: String, ref: 'Player', required: true },
  runs: { type: Number, required: true },
  isWicket: { type: Boolean, default: false },
  extras: { type: Number, default: 0 },
  isWide: { type: Boolean, default: false },
  isNoBall: { type: Boolean, default: false },
  isLegBye: { type: Boolean, default: false },
  isBye: { type: Boolean, default: false },
  deliveryNumber: { type: Number, required: true },
  isOverthrow: { type: Boolean, default: false },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});
