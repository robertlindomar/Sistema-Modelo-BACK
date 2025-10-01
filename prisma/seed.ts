import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (em ordem reversa devido às foreign keys)
  console.log('🧹 Limpando dados existentes...');
  
  await prisma.usuario.deleteMany();

  // Criar usuários
  console.log('👤 Criando usuários...');
  const nome = `${process.env.NOME_ADMIN}`;
  const email = `${process.env.EMAIL_ADMIN}`;
  const senha = `${process.env.SENHA_ADMIN}`;

  const usuario1 = await prisma.usuario.create({
    data: {
      nome: nome,
      email: email,
      senha: await bcrypt.hash(senha, 10),
    },
  });

}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
