import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SyncDto } from './dto/sync.dto';
import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { dateToString, stringToDate } from 'src/util/functions';
import * as moment from 'moment';

@Injectable()
export class SyncService {
  constructor(private prisma: PrismaService) {}

  /**
   * Sincroniza os dados com o app
   * @param req
   * @param SyncDto
   * @returns object
   */
  async sync(req: any, syncDto: SyncDto) {
    const requestUser: User = {
      ...req.user,
      lastSync: moment(req.user.lastSync).utcOffset(3, true).toDate(),
    };

    await this.syncUser(requestUser, syncDto);
    await this.syncStats(requestUser, syncDto);
    await this.syncGoals(requestUser, syncDto);

    // Obter os dados atualizados de metas, estatísticas e usuário
    const { goals, stats, ...user } = await this.prisma.user.findUnique({
      where: {
        id: requestUser.id,
      },
      include: {
        goals: true,
        stats: true,
      },
    });

    // Retornar os dados atualizados
    return {
      user: {
        ...user,
        lastSync: dateToString(user.lastSync, true),
        password: null,
      },
      goals: goals.map((goal) => {
        return {
          ...goal,
          lastSync: dateToString(goal.lastSync, true),
          completedAt: goal.completedAt
            ? dateToString(goal.completedAt, true)
            : null,
        };
      }),
      stats: stats.map((stat) => {
        return {
          ...stat,
          date: dateToString(stat.date),
          lastSync: dateToString(stat.lastSync, true),
        };
      }),
    };
  }

  // --------------------------------------------------

  // Sincroniza os dados do usuário
  private async syncUser(user: User, syncDto: SyncDto) {
    const userDto: UserDto = syncDto.user;

    if (stringToDate(userDto.lastSync) >= user.lastSync) {
      // Atualizar o usuário
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: { ...userDto, lastSync: new Date() },
      });
    }
  }

  // Sincroniza os dados de estatísticas
  private async syncStats(user: User, syncDto: SyncDto) {
    if (syncDto.stats.length > 0) {
      for (const stat of syncDto.stats) {
        // Verificar se o stat já existe
        let dbStat = await this.prisma.stat.findFirst({
          where: {
            /* userId: user.id,
            date: stringToDate(stat.date), */
            AND: [
              {
                userId: user.id,
              },
              {
                date: stringToDate(stat.date),
              },
            ],
          },
        });

        if (dbStat) {
          dbStat = {
            ...dbStat,
            lastSync: moment(dbStat.lastSync).utcOffset(3, true).toDate(),
          };

          if (
            stat.lastSync != null &&
            stringToDate(stat.lastSync) >= dbStat.lastSync
          ) {
            // Atualizar o stat
            await this.prisma.stat.update({
              where: {
                id: dbStat.id,
              },
              data: {
                ...stat,
                date: stringToDate(stat.date),
                lastSync: new Date(),
              },
            });
          }
        } else {
          // Criar o stat
          await this.prisma.stat.create({
            data: {
              ...stat,
              date: stringToDate(stat.date),
              userId: user.id,
              lastSync: new Date(),
            },
          });
        }
      }
    }
  }

  // Sincroniza os dados de metas
  private async syncGoals(user: User, syncDto: SyncDto) {
    if (syncDto.goals.length > 0) {
      for (const { id, deleted, ...goal } of syncDto.goals) {
        // Verificar se o goal já existe
        let dbGoal = id
          ? await this.prisma.goal.findUnique({
              where: {
                id: id,
              },
            })
          : null;

        if (dbGoal) {
          dbGoal = {
            ...dbGoal,
            lastSync: moment(dbGoal.lastSync).utcOffset(3, true).toDate(),
          };

          if (deleted) {
            // Deletar o goal
            await this.prisma.goal.delete({
              where: {
                id: dbGoal.id,
              },
            });
          } else if (
            goal.lastSync != null &&
            stringToDate(goal.lastSync) >= dbGoal.lastSync
          ) {
            // Atualizar o goal
            await this.prisma.goal.update({
              where: {
                id: dbGoal.id,
              },
              data: {
                ...goal,
                lastSync: new Date(),
                completedAt: goal.completedAt
                  ? stringToDate(goal.completedAt)
                  : null,
              },
            });
          }
        } else {
          // Criar o goal
          await this.prisma.goal.create({
            data: {
              ...goal,
              userId: user.id,
              lastSync: new Date(),
              completedAt: goal.completedAt
                ? stringToDate(goal.completedAt)
                : null,
            },
          });
        }
      }
    }
  }
}
