import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@taskflow.com' },
    update: {
      password: 'password123',
      name: 'Admin',
    },
    create: {
      email: 'admin@taskflow.com',
      password: 'password123',
      name: 'Admin',
    },
  });

  const projects = [
    { name: 'App Mobile', color: '#3498db' },
    { name: 'API Back', color: '#2ecc71' },
  ];

  for (const project of projects) {
    const exists = await prisma.project.findFirst({
      where: { name: project.name },
    });

    if (!exists) {
      await prisma.project.create({ data: project });
    }
  }

  console.log('Seed done!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
