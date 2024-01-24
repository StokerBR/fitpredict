import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { dateToString } from '../../src/util/functions';

/**
 * Insere a quantidade especificada de estatísticas aleatórios no banco de dados
 * @param prisma PrismaClient
 * @param qty integer
 */
export async function statSeeder(prisma: PrismaClient, qty = 30) {
  let countUsers = await prisma.user.count();
  let date = new Date();

  // Gerar uma estatística aleatória
  const fakerStat = () => ({
    userId: faker.number.int({ min: 1, max: countUsers }),
    date: date,
    steps: faker.number.int({ min: 0, max: 10000 }),
    distance: faker.number.int({ min: 0, max: 1000 }),
    calories: faker.number.int({ min: 0, max: 100 }),
  });

  console.log('Executando seeder de estatísticas');

  // Cadastrar as estatísticas aleatórias
  for (let i = 0; i < qty; i++) {
    date.setDate(date.getDate() - 1);
    await prisma.stat.create({ data: fakerStat() });
  }
}
