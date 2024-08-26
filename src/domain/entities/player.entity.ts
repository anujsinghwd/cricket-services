// src/domain/entities/player.entity.ts
export class Player {
  runsConceded: number;
  wides: number;
  noBalls: number;
  balls: number;
  strikeRate: number;
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly team: string, // team ID
    public readonly runs: number = 0,
    public readonly ballsFaced: number = 0,
    public readonly wickets: number = 0,
    public readonly oversBowled: number = 0,
    public readonly economy: number = 0,
    public readonly role?: string,
    public readonly battingStyle?: string,
    public readonly bowlingStyle?: string,
  ) {}
}
