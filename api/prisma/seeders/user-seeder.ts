import { Gender, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';
import * as bcrypt from 'bcrypt';

/**
 * Insere a quantidade especificada de usuários aleatórios no banco de dados
 * @param prisma PrismaClient
 * @param qty integer
 */
export async function userSeeder(prisma: PrismaClient, qty = 10) {
  // Gerar um usuário aleatório
  const fakerUser = async () => ({
    email: faker.internet.email(),
    name: faker.person.firstName() + faker.person.lastName(),
    password: await bcrypt.hash(faker.internet.password(), 10),
    gender: faker.number.binary() ? Gender.M : Gender.F,
    height: faker.number.int({ min: 150, max: 200 }),
    weight: faker.number.int({ min: 50, max: 150 }),
  });

  console.log('Executando seeders de usuários');

  // Cadastrar o usuário padrão
  await prisma.user.create({
    data: {
      email: 'usuario@fitpredict.com',
      name: 'Usuário FitPredict',
      password: await bcrypt.hash('fitpredict123', 10),
      gender: Gender.M,
      height: 180,
      weight: 80,
    },
  });

  // Cadastrar os usuários aleatórios
  for (let i = 0; i < qty; i++) {
    await prisma.user.create({ data: await fakerUser() });
  }
}
