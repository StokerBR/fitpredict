import { GoalDto } from './dto/goal.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterGoalDto } from './dto/register-goal.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cadastrar uma nova meta
   * @param req
   * @param RegisterGoalDto
   * @returns Goal
   */
  async register(req: any, RegisterGoalDto: RegisterGoalDto) {
    try {
      // Cadastrar a meta
      const goal = await this.prisma.goal.create({
        data: {
          ...RegisterGoalDto,
          userId: req.user.id,
        },
      });

      goal['message'] = 'Meta cadastrada com sucesso.';

      return goal;
    } catch (error) {
      throw new HttpException(
        'Falha ao cadastrar meta. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Atualiza os dados de uma meta
   * @param req
   * @param GoalDto
   * @param goalId
   * @returns Goal
   */
  async update(req: any, goalDto: GoalDto, goalId: number) {
    try {
      // Verificar se a meta existe
      const goal = await this.getGoal(goalId);
      if (!goal) {
        throw new HttpException('Meta não encontrada.', HttpStatus.NOT_FOUND);
      }

      // Cadastrar a meta
      const newGoal = await this.prisma.goal.update({
        data: {
          ...goalDto,
        },
        where: {
          id: goalId,
        },
      });

      newGoal['message'] = 'Meta cadastrada com sucesso.';

      return newGoal;
    } catch (error) {
      throw new HttpException(
        'Falha ao atualizar meta. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Deleta uma meta
   * @param goalId
   * @returns Goal
   */
  async delete(goalId: number) {
    try {
      // Verificar se a meta existe
      const goal = await this.getGoal(goalId);
      if (!goal) {
        throw new HttpException('Meta não encontrada.', HttpStatus.NOT_FOUND);
      }

      // Deletar a meta
      const newGoal = await this.prisma.goal.delete({
        where: {
          id: goalId,
        },
      });

      newGoal['message'] = 'Meta deletada com sucesso.';

      return newGoal;
    } catch (error) {
      throw new HttpException(
        'Falha ao deletar meta. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Busca as metas de um usuário
   * @param req
   * @returns Goals
   */
  async getGoals(req: any) {
    try {
      // Buscar as metas
      const goals = await this.prisma.goal.findMany({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          id: 'desc',
        },
      });
      return goals;
    } catch (error) {
      throw new HttpException(
        'Falha ao buscar metas. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Busca uma meta de um usuário
   * @param req
   * @param goalId
   * @returns Goal
   */
  async getGoal(goalId: number) {
    try {
      // Buscar a meta
      const goal = await this.prisma.goal.findUnique({
        where: {
          id: goalId,
        },
      });

      return goal;
    } catch (error) {
      throw new HttpException(
        'Falha ao busca meta. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
