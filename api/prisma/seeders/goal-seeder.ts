import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { dateToString } from '../../src/util/functions';

/**
 * Insere a quantidade especificada de metas aleatórios no banco de dados
 * @param prisma PrismaClient
 * @param qty integer
 */
export async function goalSeeder(prisma: PrismaClient, qty = 20) {
  let countUsers = await prisma.user.count();

  // Gerar uma meta aleatória
  function fakerGoal() {
    let steps = faker.number.int({ min: 0, max: 10000 });
    let completed = faker.number.binary();

    return {
      userId: faker.number.int({ min: 1, max: countUsers }),
      steps: steps,
      distance: faker.number.int({ min: 0, max: 1000 }),
      calories: faker.number.int({ min: 0, max: 100 }),
      stepsWalked: completed
        ? steps
        : faker.number.int({ min: 0, max: steps - 1 }),
      completedAt: completed ? faker.date.recent() : null,
    };
  }

  console.log('Executando seeder de metas');

  // Cadastrar as metas aleatórias
  for (let i = 0; i < qty; i++) {
    await prisma.goal.create({ data: fakerGoal() });
  }
}
