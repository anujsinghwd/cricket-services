// src/domain/entities/match.entity.ts
export class Match {
  constructor(
    public readonly id: string,
    public readonly teamA: string, // team A ID
    public readonly teamB: string, // team B ID
    public readonly scoreTeamA: number = 0,
    public readonly scoreTeamB: number = 0,
    public readonly wicketsTeamA: number = 0,
    public readonly wicketsTeamB: number = 0,
    public readonly oversPlayedTeamA: number = 0,
    public readonly oversPlayedTeamB: number = 0,
    public readonly players: string[], // array of player IDs
    public readonly events: string[], // array of event IDs
  ) {}
}
