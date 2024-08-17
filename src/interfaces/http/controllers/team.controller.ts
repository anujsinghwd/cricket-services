// src/interfaces/http/controllers/team.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TeamService } from '../../../application/services/team.service';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { CommonResponse } from '../../../application/dto/common-response.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.teamService.getTeamById(id);
  }

  @Get()
  async findAll() {
    try {
      const teams = await this.teamService.getAllTeams();
      return CommonResponse.success(teams);
    } catch (error) {
      throw new HttpException(
        CommonResponse.failure('Failed to retrieve teams', error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: CreateTeamDto) {
    return this.teamService.updateTeam(id, updateTeamDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.teamService.deleteTeam(id);
  }
}
