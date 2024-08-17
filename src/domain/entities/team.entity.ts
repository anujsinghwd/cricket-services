// src/domain/entities/team.entity.ts
export class Team {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly players: string[], // array of player IDs
  ) {}
}
