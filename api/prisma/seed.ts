import { PrismaClient } from '@prisma/client';
import { userSeeder } from './seeders/index';
import { statSeeder } from './seeders/stat-seeder';
import { goalSeeder } from './seeders/goal-seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seeders');

  // Caso o argumento --docker seja passado, verificar se os seeders já foram executados
  if (process.argv.includes('--docker')) {
    let countUsers = await prisma.user.count();
    if (countUsers > 0) {
      console.log('Seeders já realizados');
      return true;
    }
  }

  // Executar os seeders
  await userSeeder(prisma, 5);
  await statSeeder(prisma, 30);
  await goalSeeder(prisma, 20);

  console.log('Seeders finalizados');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
