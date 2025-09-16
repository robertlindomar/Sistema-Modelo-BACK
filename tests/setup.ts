import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configurações globais para testes
beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test_secret_key_for_jwt';
  
  // Limpar banco de dados de teste se necessário
  // await prisma.$executeRaw`TRUNCATE TABLE usuario, aluno, empresa, cidade, curso, instituicao, seguradora, estagio RESTART IDENTITY CASCADE;`;
});

afterAll(async () => {
  // Limpar conexões
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Limpar dados de teste antes de cada teste se necessário
});

afterEach(async () => {
  // Limpeza após cada teste se necessário
});
