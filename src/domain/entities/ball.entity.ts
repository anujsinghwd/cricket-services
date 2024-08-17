// src/domain/entities/ball.entity.ts
export class Ball {
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

  constructor(
    matchId: string,
    over: number,
    ballNumber: number,
    batsmanId: string,
    bowlerId: string,
    runs: number,
    isWicket: boolean = false,
    extras: number = 0,
    isWide: boolean = false,
    isNoBall: boolean = false,
    isLegBye: boolean = false,
    isBye: boolean = false,
    isOverthrow: boolean = false,
  ) {
    this.matchId = matchId;
    this.over = over;
    this.ballNumber = ballNumber;
    this.batsmanId = batsmanId;
    this.bowlerId = bowlerId;
    this.runs = runs;
    this.isWicket = isWicket;
    this.extras = extras;
    this.isWide = isWide;
    this.isNoBall = isNoBall;
    this.isLegBye = isLegBye;
    this.isBye = isBye;
    this.isOverthrow = isOverthrow;
  }
}
