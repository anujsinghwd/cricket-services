// src/infrastructure/database/mongoose/schemas/team.schema.ts
import { Schema, Document } from 'mongoose';

export interface ITeamDocument extends Document {
  name: string;
  players: string[];
}

export const TeamSchema = new Schema<ITeamDocument>({
  name: { type: String, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
});
