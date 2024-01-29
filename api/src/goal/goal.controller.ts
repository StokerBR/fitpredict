import { GoalService } from './goal.service';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { RegisterGoalDto } from './dto/register-goal.dto';
import { JwtUserAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  Body,
  Get,
  Post,
  Put,
  Param,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@ApiTags('Goals')
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  // Cadastrar uma nova meta
  @Post('')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    // Documentação da resposta pro swagger
    description: 'Cadastro realizado com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            message: 'Meta cadastrada com sucesso.',
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Erro ao cadastrar a meta',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 500,
            message:
              'Não foi possível cadastrar a meta. Tente novamente mais tarde.',
          },
        },
      },
    },
  })
  register(@Request() req: any, @Body() registerGoalDto: RegisterGoalDto) {
    return this.goalService.register(req, registerGoalDto);
  }

  // Atualizar os dados de uma meta
  @Put('')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    // Documentação da resposta pro swagger
    description: 'Dados atualizados com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            message: 'Meta atualizada com sucesso.',
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Erro ao atualizar dados da meta',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 500,
            message:
              'Não foi possível atualizar dados da meta. Tente novamente mais tarde.',
          },
        },
      },
    },
  })
  update(@Request() req: any, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalService.register(req, updateGoalDto);
  }

  //Obter as metas do usuário logado
  @Get('')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    // Documentação da resposta pro swagger
    description: 'Metas do usuário obtidos com sucesso',
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
              stepsWalked: 1000,
              lastSync: '2024-01-22 12:30:00',
              completedAt: '2024-01-22 12:30:00',
            },
            {
              id: 2,
              userId: 1,
              steps: 50,
              distance: 20,
              calories: 30,
              stepsWalked: 10,
              lastSync: '2024-01-20 10:00:00',
            },
          ],
        },
      },
    },
  })
  getGoals(@Request() req: any) {
    return this.goalService.getGoals(req);
  }

  //Obter as metas do usuário logado
  @Get(':id')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    // Documentação da resposta pro swagger
    description: 'Meta obtida com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            userId: 1,
            steps: 1000,
            distance: 750,
            calories: 50,
            stepsWalked: 1000,
            lastSync: '2024-01-22 12:30:00',
            completedAt: '2024-01-22 12:30:00',
          },
        },
      },
    },
  })
  getGoal(@Param('id') id: number) {
    return this.goalService.getGoal(id);
  }
}
