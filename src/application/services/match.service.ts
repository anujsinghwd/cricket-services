// src/application/services/match.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { IBallRepository } from '../../domain/repositories/ball.repository';
import { IMatchRepository } from '../../domain/repositories/match.repository';
import { IPlayerRepository } from '../../domain/repositories/player.repository';
// import { ITeamRepository } from '../../domain/repositories/team.repository';
import { Ball } from '../../domain/entities/ball.entity';
import { CreateMatchDto } from 'src/interfaces/http/dtos/create-match.dto';
import { Match } from 'src/domain/entities/match.entity';

@Injectable()
export class MatchService {
  constructor(
    @Inject('IMatchRepository')
    private readonly matchRepository: IMatchRepository,
    @Inject('IPlayerRepository')
    private readonly playerRepository: IPlayerRepository,
    @Inject('IBallRepository') private readonly ballRepository: IBallRepository,
  ) {}

  // Method to add a regular ball and update statistics
  async processRegularBall(ball: Ball & { team?: string }): Promise<void> {
    await this.ballRepository.addBall(ball);
    await this.updateMatchStatistics(ball.matchId, ball.team);
  }

  // Method to handle a wide ball
  // async processWideBall(
  //   ball: Ball & { team?: 'teamA' | 'teamB' },
  // ): Promise<void> {
  //   // Add the ball event to the database
  //   await this.ballRepository.addBall(ball);

  //   // Update bowler's stats
  //   const bowler = await this.playerRepository.findById(ball.bowlerId);
  //   if (bowler) {
  //     bowler.runsConceded += ball.runs + 1; // 1 run extra for wide
  //     bowler.wides += ball.runs + 1;
  //     await this.playerRepository.updateBowlerStats(ball.bowlerId, {
  //       runsConceded: bowler.runsConceded,
  //       wides: bowler.wides,
  //     });
  //   }

  //   // Update match stats (total runs and overs for the respective team)
  //   const match = await this.matchRepository.findById(ball.matchId);
  //   let scoreTeamA = 0;
  //   let scoreTeamB = 0;
  //   if (match) {
  //     if (ball.team === 'teamA') {
  //       scoreTeamA = match.scoreTeamA + ball.runs + 1; // 1 run extra for wide
  //     } else if (ball.team === 'teamB') {
  //       scoreTeamB = match.scoreTeamB + ball.runs + 1; // 1 run extra for wide
  //     }

  //     // Update the match statistics in the database
  //     await this.matchRepository.update({
  //       id: ball.matchId,
  //       scoreTeamA,
  //       scoreTeamB,
  //     });
  //   }

  //   // Optionally, update other match-level statistics
  //   await this.updateMatchStatistics(ball.matchId, ball.team);
  // }

  // Method to handle a no-ball
  // async processNoBall(ball: Ball & { team?: string }): Promise<void> {
  //   await this.ballRepository.addBall(ball);

  //   const bowler = await this.playerRepository.findById(ball.bowlerId);
  //   if (bowler) {
  //     bowler.runsConceded += ball.runs + 1; // 1 run extra for no-ball
  //     bowler.noBalls += 1;
  //     await this.playerRepository.updateBowlerStats(ball.bowlerId, {
  //       runsConceded: bowler.runsConceded,
  //       noBalls: bowler.noBalls,
  //     });
  //   }

  //   const batsman: any = await this.playerRepository.findById(ball.batsmanId);
  //   if (batsman) {
  //     batsman.runs += ball.runs;
  //     batsman.balls += 1;
  //     batsman.strikeRate = (batsman.runs / batsman.balls) * 100;
  //     await this.playerRepository.updateBatsmanStats(ball.batsmanId, {
  //       runs: batsman.runs,
  //       balls: batsman.balls,
  //       strikeRate: batsman.strikeRate,
  //     });
  //   }

  //   const team: any = await this.teamRepository.getTeamByMatchId(ball.matchId);
  //   if (team) {
  //     team.totalRuns += ball.runs + 1;
  //     await this.teamRepository.updateTeamStats(team.id, {
  //       totalRuns: team.totalRuns,
  //     });
  //   }

  //   await this.updateMatchStatistics(ball.matchId, ball.team);
  // }

  // Method to handle a bye or leg-bye ball
  // async processByeOrLegByeBall(ball: Ball): Promise<void> {
  //   await this.ballRepository.addBall(ball);

  //   const bowler = await this.playerRepository.findById(ball.bowlerId);
  //   if (bowler) {
  //     bowler.runsConceded += ball.extras || 0;
  //     await this.playerRepository.updateBowlerStats(ball.bowlerId, {
  //       runsConceded: bowler.runsConceded,
  //     });
  //   }

  //   const team = await this.teamRepository.getTeamByMatchId(ball.matchId);
  //   if (team) {
  //     team.totalRuns += ball.extras || 0;
  //     await this.teamRepository.updateTeamStats(team.id, {
  //       totalRuns: team.totalRuns,
  //     });
  //   }

  //   await this.updateMatchStatistics(ball.matchId);
  // }

  // Method to update match statistics after processing a ball
  async updateMatchStatistics(matchId: string, team: string): Promise<void> {
    const balls = await this.ballRepository.getBallsByMatchId(matchId);

    let totalRuns = 0;
    let totalBalls = 0;
    let totalWickets = 0;

    const batsmanStats: Record<string, { runs: number; balls: number }> = {};
    const bowlerStats: Record<
      string,
      { runsConceded: number; balls: number; wickets: number }
    > = {};

    for (const ball of balls) {
      totalRuns += ball.runs + (ball.extras || 0);

      if (!ball.isWide && !ball.isNoBall) {
        totalBalls += 1;
      }

      if (!ball.isWide && !ball.isNoBall) {
        if (!batsmanStats[ball.batsmanId]) {
          batsmanStats[ball.batsmanId] = { runs: 0, balls: 0 };
        }
        batsmanStats[ball.batsmanId].runs += ball.runs;
        batsmanStats[ball.batsmanId].balls += 1;
      }

      if (!bowlerStats[ball.bowlerId]) {
        bowlerStats[ball.bowlerId] = { runsConceded: 0, balls: 0, wickets: 0 };
      }
      bowlerStats[ball.bowlerId].runsConceded += ball.runs + (ball.extras || 0);
      if (!ball.isWide && !ball.isNoBall) {
        bowlerStats[ball.bowlerId].balls += 1;
      }

      if (ball.isWicket) {
        totalWickets += 1;
        bowlerStats[ball.bowlerId].wickets += 1;
      }
    }

    const totalOvers = Math.floor(totalBalls / 6) + (totalBalls % 6) / 10;
    // const currentRunRate = totalRuns / totalOvers;
    const match = await this.matchRepository.findById(matchId);
    const updateField: any = {};
    if (match) {
      // const updateField =
      //   team === 'teamA'
      //     ? { scoreTeamA: totalRuns }
      //     : { scoreTeamB: totalRuns };

      if (team === 'teamA') {
        updateField.scoreTeamA = totalRuns;
        updateField.oversPlayedTeamA = totalOvers;
        updateField.wicketsTeamA = totalWickets;
      } else {
        updateField.scoreTeamB = totalRuns;
        updateField.oversPlayedTeamB = totalOvers;
        updateField.wicketsTeamB = totalWickets;
      }
      await this.matchRepository.update({
        id: matchId,
        ...updateField,
      });
    }

    for (const batsmanId of Object.keys(batsmanStats)) {
      const { runs, balls } = batsmanStats[batsmanId];
      const strikeRate = (runs / balls) * 100;

      await this.playerRepository.updateBatsmanStats(batsmanId, {
        runs,
        ballsFaced: balls,
        strikeRate,
      });
    }

    for (const bowlerId of Object.keys(bowlerStats)) {
      const { runsConceded, balls, wickets } = bowlerStats[bowlerId];
      const economyRate = runsConceded / (balls / 6);

      await this.playerRepository.updateBowlerStats(bowlerId, {
        runsConceded,
        balls,
        wickets,
        economy: economyRate,
      });
    }
  }

  async createMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    const {
      teamA,
      teamB,
      scoreTeamA = 0,
      scoreTeamB = 0,
      wicketsTeamA = 0,
      wicketsTeamB = 0,
      oversPlayedTeamA = 0,
      oversPlayedTeamB = 0,
      players = [],
      events = [],
    } = createMatchDto;

    const match = new Match(
      '',
      teamA,
      teamB,
      scoreTeamA,
      scoreTeamB,
      wicketsTeamA,
      wicketsTeamB,
      oversPlayedTeamA,
      oversPlayedTeamB,
      players,
      events,
    );

    return this.matchRepository.create(match);
  }

  async getMatchById(id: string): Promise<Match | null> {
    return this.matchRepository.findById(id);
  }

  async getAllMatches(): Promise<Match[]> {
    return this.matchRepository.findAll();
  }

  async updateMatch(
    id: string,
    updateMatchDto: CreateMatchDto,
  ): Promise<Match> {
    const {
      teamA,
      teamB,
      scoreTeamA = 0,
      scoreTeamB = 0,
      wicketsTeamA = 0,
      wicketsTeamB = 0,
      oversPlayedTeamA = 0,
      oversPlayedTeamB = 0,
      players = [],
      events = [],
    } = updateMatchDto;

    const match = new Match(
      id,
      teamA,
      teamB,
      scoreTeamA,
      scoreTeamB,
      wicketsTeamA,
      wicketsTeamB,
      oversPlayedTeamA,
      oversPlayedTeamB,
      players,
      events,
    );

    return this.matchRepository.update(match);
  }

  async deleteMatch(id: string): Promise<void> {
    await this.matchRepository.delete(id);
  }
}
