import { StatService } from './stat.service';
import { JwtUserAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Get, Request, UseGuards, Controller } from '@nestjs/common';

import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@ApiTags('Stats')
@Controller('stat')
export class StatController {
  constructor(private readonly statService: StatService) {}

  //Obter as estatísticas do usuário logado
  @Get('')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    // Documentação da resposta pro swagger
    description: 'Estatísticas do usuário obtidos com sucesso',
    content: {
      'application/json': {
        schema: {
          example: [
            {
              id: 1,
              userId: 1,
              steps: 1000,
              distance: 750,
              calories: 50,
              date: '2024-01-22',
              lastSync: '2024-01-22 12:30:00',
            },
            {
              id: 2,
              userId: 1,
              steps: 500,
              distance: 400,
              calories: 30,
              date: '2024-01-15',
              lastSync: '2024-01-15 10:00:00',
            },
          ],
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Erro ao buscar as estatísticas do usuário',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 500,
            message:
              'Não foi possível buscar as estatísticas. Tente novamente mais tarde.',
          },
        },
      },
    },
  })
  getGoals(@Request() req: any) {
    return this.statService.getStats(req);
  }

  //Obter a estatística do dia do usuário logado
  @Get('today')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    // Documentação da resposta pro swagger
    description: 'Estatística do dia do usuário obtidos com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            userId: 1,
            steps: 1000,
            distance: 750,
            calories: 50,
            date: '2024-01-22',
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Erro ao buscar a estatística do dia do usuário',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 500,
            message:
              'Não foi possível buscar a estatística. Tente novamente mais tarde.',
          },
        },
      },
    },
  })
  getTodayGoal(@Request() req: any) {
    return this.statService.getTodayStat(req);
  }

  //Obter as estatísticas da semana do usuário logado
  @Get('week')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    // Documentação da resposta pro swagger
    description: 'Estatísticas da semana do usuário obtidos com sucesso',
    content: {
      'application/json': {
        schema: {
          example: [
            {
              userId: 1,
              steps: 1000,
              distance: 750,
              calories: 50,
              date: '2024-01-22',
            },
            {
              userId: 1,
              steps: 500,
              distance: 400,
              calories: 30,
              date: '2024-01-15',
            },
          ],
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Erro ao buscar as estatísticas da semana do usuário',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 500,
            message:
              'Não foi possível buscar as estatísticas. Tente novamente mais tarde.',
          },
        },
      },
    },
  })
  getWeekStats(@Request() req: any) {
    return this.statService.getWeekStats(req);
  }
}
