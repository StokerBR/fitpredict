import * as moment from 'moment';
import { getWeekDays } from './../util/functions';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class StatService {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca as estatísticas de um usuário
   * @param req
   * @returns Stats
   */
  async getStats(req: any) {
    try {
      // Buscar as metas
      const stats = await this.prisma.stat.findMany({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          date: 'desc',
        },
      });
      return stats;
    } catch (error) {
      throw new HttpException(
        'Falha ao buscar estatísticas. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /**
   * Busca a estatística de um usuário do dia atual
   * @param req
   * @returns Stats
   */
  async getTodayStat(req: any) {
    try {
      const todayDate = new Date(moment().utc(true).format('YYYY-MM-DD'));
      // Buscar as metas
      const todayStat = (
        await this.prisma.stat.findMany({
          where: {
            userId: req.user.id,
            date: todayDate,
          },
        })
      )?.[0];

      if (!todayStat?.id) {
        const defaultStat = {
          userId: +req.user.id,
          steps: 0,
          distance: 0,
          calories: 0,
          date: todayDate,
        };
        const newStat = await this.prisma.stat.create({
          data: defaultStat,
        });
        return {
          ...newStat,
          date: moment(newStat.date).toISOString().split('T')[0],
        };
      }

      return {
        ...todayStat,
        date: moment(todayStat.date).toISOString().split('T')[0],
      };
    } catch (error) {
      throw new HttpException(
        'Falha ao buscar estatística. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Busca a estatística de um usuário da semana atual
   * @param req
   * @returns Stats
   */
  async getWeekStats(req: any) {
    try {
      // Pega os dias da semana
      const weekDays = getWeekDays();

      // Busca as estatísticas da semana
      const weekStats = await Promise.all(
        weekDays.map(async (day) => {
          day = new Date(moment(day).format('YYYY-MM-DD'));
          const stat = await this.prisma.stat.findUnique({
            where: {
              userId_date: {
                userId: +req.user.id,
                date: day,
              },
            },
          });

          if (!stat?.id) {
            const defaultStat = {
              userId: +req.user.id,
              steps: 0,
              distance: 0,
              calories: 0,
              date: day,
            };
            const newStat = await this.prisma.stat.create({
              data: defaultStat,
            });
            return {
              ...newStat,
              date: moment(newStat.date).toISOString().split('T')[0],
            };
          }
          return {
            ...stat,
            date: moment(stat.date).toISOString().split('T')[0],
          };
        }),
      );

      return weekStats;
    } catch (error) {
      throw new HttpException(
        'Falha ao buscar estatística. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
