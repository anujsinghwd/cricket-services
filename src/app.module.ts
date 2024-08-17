// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerService } from './application/services/player.service';
import { MatchService } from './application/services/match.service';
import { TeamService } from './application/services/team.service';
import { PlayerSchema } from './infrastructure/database/mongoose/schemas/player.schema';
import { MatchSchema } from './infrastructure/database/mongoose/schemas/match.schema';
import { TeamSchema } from './infrastructure/database/mongoose/schemas/team.schema';
import { PlayerRepository } from './infrastructure/database/mongoose/repositories/player.repository.impl';
import { MatchRepository } from './infrastructure/database/mongoose/repositories/match.repository.impl';
import { TeamRepository } from './infrastructure/database/mongoose/repositories/team.repository.impl';
import { PlayerController } from './interfaces/http/controllers/player.controller';
import { MatchController } from './interfaces/http/controllers/match.controller';
import { TeamController } from './interfaces/http/controllers/team.controller';
import { Match } from './domain/entities/match.entity';
import { Team } from './domain/entities/team.entity';
import { Player } from './domain/entities/player.entity';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://naturalslaao:f4LSZBwJNK55Yh3c@learn-mongo.j4erclh.mongodb.net/learn-mongo',
    ),
    MongooseModule.forFeature([
      { name: Player.name, schema: PlayerSchema },
      { name: Match.name, schema: MatchSchema },
      { name: Team.name, schema: TeamSchema },
    ]),
  ],
  controllers: [PlayerController, MatchController, TeamController],
  providers: [
    PlayerService,
    MatchService,
    TeamService,
    { provide: 'IPlayerRepository', useClass: PlayerRepository },
    { provide: 'IMatchRepository', useClass: MatchRepository },
    { provide: 'ITeamRepository', useClass: TeamRepository },
  ],
})
export class AppModule {}
