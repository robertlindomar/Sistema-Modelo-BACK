import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (em ordem reversa devido às foreign keys)
  console.log('🧹 Limpando dados existentes...');
  await prisma.relatorioEstagio.deleteMany();
  await prisma.estagioHorario.deleteMany();
  await prisma.motivoEncerramentoEstagio.deleteMany();
  await prisma.estagio.deleteMany();
  await prisma.aluno.deleteMany();
  await prisma.empresa.deleteMany();
  await prisma.instituicao.deleteMany();
  await prisma.curso.deleteMany();
  await prisma.seguradora.deleteMany();
  await prisma.cidade.deleteMany();
  await prisma.usuario.deleteMany();

  // Criar usuários
  console.log('👤 Criando usuários...');
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: 'Admin Sistema',
      email: 'admin@sistema.com',
      senha: await bcrypt.hash('123456', 10),
    },
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: 'Coordenador Estágio',
      email: 'coordenador@ifsp.edu.br',
      senha: await bcrypt.hash('123456', 10),
    },
  });

  // Criar cidades
  console.log('🏙️ Criando cidades...');
  const cidade1 = await prisma.cidade.create({
    data: {
      nome: 'São Paulo',
      uf: 'SP',
    },
  });

  const cidade2 = await prisma.cidade.create({
    data: {
      nome: 'Rio de Janeiro',
      uf: 'RJ',
    },
  });

  const cidade3 = await prisma.cidade.create({
    data: {
      nome: 'Belo Horizonte',
      uf: 'MG',
    },
  });

  const cidade4 = await prisma.cidade.create({
    data: {
      nome: 'Salvador',
      uf: 'BA',
    },
  });

  const cidade5 = await prisma.cidade.create({
    data: {
      nome: 'Brasília',
      uf: 'DF',
    },
  });

  // Criar instituições
  console.log('🏫 Criando instituições...');
  const instituicao1 = await prisma.instituicao.create({
    data: {
      nome: 'Instituto Federal de São Paulo',
      nomeFantasia: 'IFSP',
      cnpj: '12.345.678/0001-90',
      endereco: 'Rua Pedro Vicente, 625 - Canindé',
      cidadeId: cidade1.id,
      telefone: '(11) 3322-0000',
      email: 'contato@ifsp.edu.br',
      nomeDiretor: 'João Silva Santos',
      cpfDiretor: '123.456.789-00',
    },
  });

  const instituicao2 = await prisma.instituicao.create({
    data: {
      nome: 'Universidade Federal do Rio de Janeiro',
      nomeFantasia: 'UFRJ',
      cnpj: '12.345.678/0001-91',
      endereco: 'Av. Pedro Calmon, 550 - Cidade Universitária',
      cidadeId: cidade2.id,
      telefone: '(21) 3938-0000',
      email: 'contato@ufrj.br',
      nomeDiretor: 'Maria Oliveira Costa',
      cpfDiretor: '987.654.321-00',
    },
  });

  const instituicao3 = await prisma.instituicao.create({
    data: {
      nome: 'Universidade Federal de Minas Gerais',
      nomeFantasia: 'UFMG',
      cnpj: '12.345.678/0001-92',
      endereco: 'Av. Antônio Carlos, 6627 - Pampulha',
      cidadeId: cidade3.id,
      telefone: '(31) 3409-3000',
      email: 'contato@ufmg.br',
      nomeDiretor: 'Carlos Eduardo Pereira',
      cpfDiretor: '456.789.123-00',
    },
  });

  // Criar cursos
  console.log('📚 Criando cursos...');
  const curso1 = await prisma.curso.create({
    data: {
      nome: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
      habilitacao: 'Tecnólogo',
      nivel: 'Superior',
    },
  });

  const curso2 = await prisma.curso.create({
    data: {
      nome: 'Engenharia de Software',
      habilitacao: 'Bacharel',
      nivel: 'Superior',
    },
  });

  const curso3 = await prisma.curso.create({
    data: {
      nome: 'Ciência da Computação',
      habilitacao: 'Bacharel',
      nivel: 'Superior',
    },
  });

  const curso4 = await prisma.curso.create({
    data: {
      nome: 'Técnico em Informática',
      habilitacao: 'Técnico',
      nivel: 'Médio',
    },
  });

  const curso5 = await prisma.curso.create({
    data: {
      nome: 'Administração',
      habilitacao: 'Bacharel',
      nivel: 'Superior',
    },
  });

  // Criar alunos
  console.log('👨‍🎓 Criando alunos...');
  const aluno1 = await prisma.aluno.create({
    data: {
      nome: 'Ana Carolina Silva',
      rg: '12.345.678-9',
      cpf: '123.456.789-01',
      endereco: 'Rua das Flores, 123 - Centro',
      cidadeId: cidade1.id,
      cursoId: curso1.id,
      serie: '3º Semestre',
      telefone: '(11) 99999-1111',
      telefonePai: '(11) 99999-2222',
      email: 'ana.silva@email.com',
      dataNascimento: new Date('2000-05-15'),
    },
  });

  const aluno2 = await prisma.aluno.create({
    data: {
      nome: 'Bruno Santos Oliveira',
      rg: '23.456.789-0',
      cpf: '234.567.890-12',
      endereco: 'Av. Paulista, 456 - Bela Vista',
      cidadeId: cidade1.id,
      cursoId: curso2.id,
      serie: '5º Semestre',
      telefone: '(11) 99999-3333',
      telefonePai: '(11) 99999-4444',
      email: 'bruno.oliveira@email.com',
      dataNascimento: new Date('1999-08-22'),
    },
  });

  const aluno3 = await prisma.aluno.create({
    data: {
      nome: 'Carlos Eduardo Lima',
      rg: '34.567.890-1',
      cpf: '345.678.901-23',
      endereco: 'Rua Copacabana, 789 - Copacabana',
      cidadeId: cidade2.id,
      cursoId: curso3.id,
      serie: '7º Semestre',
      telefone: '(21) 99999-5555',
      telefonePai: '(21) 99999-6666',
      email: 'carlos.lima@email.com',
      dataNascimento: new Date('1998-12-10'),
    },
  });

  const aluno4 = await prisma.aluno.create({
    data: {
      nome: 'Diana Ferreira Costa',
      rg: '45.678.901-2',
      cpf: '456.789.012-34',
      endereco: 'Rua Savassi, 321 - Savassi',
      cidadeId: cidade3.id,
      cursoId: curso4.id,
      serie: '2º Ano',
      telefone: '(31) 99999-7777',
      telefonePai: '(31) 99999-8888',
      email: 'diana.costa@email.com',
      dataNascimento: new Date('2001-03-18'),
    },
  });

  const aluno5 = await prisma.aluno.create({
    data: {
      nome: 'Eduardo Martins Pereira',
      rg: '56.789.012-3',
      cpf: '567.890.123-45',
      endereco: 'Rua Pelourinho, 654 - Centro Histórico',
      cidadeId: cidade4.id,
      cursoId: curso5.id,
      serie: '6º Semestre',
      telefone: '(71) 99999-9999',
      telefonePai: '(71) 99999-0000',
      email: 'eduardo.pereira@email.com',
      dataNascimento: new Date('1999-07-25'),
    },
  });

  // Criar empresas
  console.log('🏢 Criando empresas...');
  const empresa1 = await prisma.empresa.create({
    data: {
      nome: 'Tech Solutions Ltda',
      nomeFantasia: 'TechSol',
      cnpj: '98.765.432/0001-10',
      endereco: 'Av. Faria Lima, 1000 - Itaim Bibi',
      cidadeId: cidade1.id,
      telefone1: '(11) 3333-1111',
      telefone2: '(11) 3333-2222',
      email: 'contato@techsol.com.br',
      representante: 'Roberto Almeida',
      cargoRepresentante: 'Diretor de RH',
    },
  });

  const empresa2 = await prisma.empresa.create({
    data: {
      nome: 'Inovação Digital S.A.',
      nomeFantasia: 'InovaDigital',
      cnpj: '87.654.321/0001-20',
      endereco: 'Rua da Carioca, 200 - Centro',
      cidadeId: cidade2.id,
      telefone1: '(21) 2222-3333',
      telefone2: '(21) 2222-4444',
      email: 'rh@inovadigital.com.br',
      representante: 'Patricia Santos',
      cargoRepresentante: 'Gerente de Pessoas',
    },
  });

  const empresa3 = await prisma.empresa.create({
    data: {
      nome: 'Sistemas Avançados Ltda',
      nomeFantasia: 'SysAv',
      cnpj: '76.543.210/0001-30',
      endereco: 'Av. Afonso Pena, 300 - Centro',
      cidadeId: cidade3.id,
      telefone1: '(31) 3333-5555',
      telefone2: '(31) 3333-6666',
      email: 'estagio@sysav.com.br',
      representante: 'Marcos Oliveira',
      cargoRepresentante: 'Supervisor de Estágios',
    },
  });

  const empresa4 = await prisma.empresa.create({
    data: {
      nome: 'João Silva',
      nomeFantasia: 'Desenvolvimento Web JS',
      cpfAutonomo: '123.456.789-00',
      numClassAutonomo: '1234567890123456789012345',
      endereco: 'Rua do Pelourinho, 50 - Centro Histórico',
      cidadeId: cidade4.id,
      telefone1: '(71) 3333-7777',
      email: 'joao.silva@freelancer.com.br',
      representante: 'João Silva',
      cargoRepresentante: 'Desenvolvedor Autônomo',
    },
  });

  const empresa5 = await prisma.empresa.create({
    data: {
      nome: 'Governo Federal',
      nomeFantasia: 'Ministério da Educação',
      cnpj: '00.000.000/0001-00',
      endereco: 'Esplanada dos Ministérios, Bloco L - Zona Cívico-Administrativa',
      cidadeId: cidade5.id,
      telefone1: '(61) 2022-3000',
      email: 'estagio@mec.gov.br',
      representante: 'Maria da Silva',
      cargoRepresentante: 'Coordenadora de Estágios',
    },
  });

  // Criar seguradoras
  console.log('🛡️ Criando seguradoras...');
  const seguradora1 = await prisma.seguradora.create({
    data: {
      nome: 'Seguradora Nacional de Estágios',
    },
  });

  const seguradora2 = await prisma.seguradora.create({
    data: {
      nome: 'Estágio Seguro Ltda',
    },
  });

  const seguradora3 = await prisma.seguradora.create({
    data: {
      nome: 'Proteção Estudantil S.A.',
    },
  });

  // Criar estágios
  console.log('💼 Criando estágios...');
  const estagio1 = await prisma.estagio.create({
    data: {
      alunoId: aluno1.id,
      empresaId: empresa1.id,
      instituicaoId: instituicao1.id,
      tipo: 'Obrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-01-15'),
      dataTermino: new Date('2024-12-15'),
      cargaHorariaSemanal: 30,
      bolsaAuxilio: 800.00,
      seguroApolice: 'EST-2024-001',
      seguradoraId: seguradora1.id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-01-10'),
      possuiResponsavelMenor: false,
      cursoId: curso1.id,
    },
  });

  const estagio2 = await prisma.estagio.create({
    data: {
      alunoId: aluno2.id,
      empresaId: empresa2.id,
      instituicaoId: instituicao2.id,
      tipo: 'NaoObrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-02-01'),
      dataTermino: new Date('2024-11-30'),
      cargaHorariaSemanal: 20,
      bolsaAuxilio: 600.00,
      seguroApolice: 'EST-2024-002',
      seguradoraId: seguradora2.id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-01-25'),
      possuiResponsavelMenor: false,
      cursoId: curso2.id,
    },
  });

  const estagio3 = await prisma.estagio.create({
    data: {
      alunoId: aluno3.id,
      empresaId: empresa3.id,
      instituicaoId: instituicao3.id,
      tipo: 'Obrigatorio',
      remunerado: false,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2023-08-01'),
      dataTermino: new Date('2024-07-31'),
      cargaHorariaSemanal: 25,
      seguroApolice: 'EST-2023-003',
      seguradoraId: seguradora3.id,
      status: 'Concluido',
      dataAssinatura: new Date('2023-07-25'),
      dataCancelamento: new Date('2024-07-31'),
      possuiResponsavelMenor: false,
      cursoId: curso3.id,
    },
  });

  const estagio4 = await prisma.estagio.create({
    data: {
      alunoId: aluno4.id,
      empresaId: empresa4.id,
      instituicaoId: instituicao1.id,
      tipo: 'Obrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Técnico',
      dataInicio: new Date('2024-03-01'),
      dataTermino: new Date('2024-12-31'),
      cargaHorariaSemanal: 20,
      bolsaAuxilio: 500.00,
      seguroApolice: 'EST-2024-004',
      seguradoraId: seguradora1.id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-02-20'),
      possuiResponsavelMenor: true,
      cursoId: curso4.id,
    },
  });

  const estagio5 = await prisma.estagio.create({
    data: {
      alunoId: aluno5.id,
      empresaId: empresa5.id,
      instituicaoId: instituicao2.id,
      tipo: 'NaoObrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-01-01'),
      dataTermino: new Date('2024-06-30'),
      cargaHorariaSemanal: 30,
      bolsaAuxilio: 1000.00,
      seguroApolice: 'EST-2024-005',
      seguradoraId: seguradora2.id,
      status: 'Cancelado',
      dataAssinatura: new Date('2023-12-15'),
      dataCancelamento: new Date('2024-03-15'),
      possuiResponsavelMenor: false,
      cursoId: curso5.id,
    },
  });

  // Criar horários de estágio
  console.log('⏰ Criando horários de estágio...');
  await prisma.estagioHorario.createMany({
    data: [
      // Estágio 1 - Segunda a Sexta, 8h às 14h
      {
        estagioId: estagio1.id,
        diaSemana: 'Segunda',
        horarioInicio: new Date('2024-01-15T08:00:00'),
        horarioFim: new Date('2024-01-15T14:00:00'),
      },
      {
        estagioId: estagio1.id,
        diaSemana: 'Terca',
        horarioInicio: new Date('2024-01-15T08:00:00'),
        horarioFim: new Date('2024-01-15T14:00:00'),
      },
      {
        estagioId: estagio1.id,
        diaSemana: 'Quarta',
        horarioInicio: new Date('2024-01-15T08:00:00'),
        horarioFim: new Date('2024-01-15T14:00:00'),
      },
      {
        estagioId: estagio1.id,
        diaSemana: 'Quinta',
        horarioInicio: new Date('2024-01-15T08:00:00'),
        horarioFim: new Date('2024-01-15T14:00:00'),
      },
      {
        estagioId: estagio1.id,
        diaSemana: 'Sexta',
        horarioInicio: new Date('2024-01-15T08:00:00'),
        horarioFim: new Date('2024-01-15T14:00:00'),
      },
      // Estágio 2 - Terça e Quinta, 14h às 18h
      {
        estagioId: estagio2.id,
        diaSemana: 'Terca',
        horarioInicio: new Date('2024-01-15T14:00:00'),
        horarioFim: new Date('2024-01-15T18:00:00'),
      },
      {
        estagioId: estagio2.id,
        diaSemana: 'Quinta',
        horarioInicio: new Date('2024-01-15T14:00:00'),
        horarioFim: new Date('2024-01-15T18:00:00'),
      },
      // Estágio 3 - Segunda, Quarta e Sexta, 9h às 13h
      {
        estagioId: estagio3.id,
        diaSemana: 'Segunda',
        horarioInicio: new Date('2024-01-15T09:00:00'),
        horarioFim: new Date('2024-01-15T13:00:00'),
      },
      {
        estagioId: estagio3.id,
        diaSemana: 'Quarta',
        horarioInicio: new Date('2024-01-15T09:00:00'),
        horarioFim: new Date('2024-01-15T13:00:00'),
      },
      {
        estagioId: estagio3.id,
        diaSemana: 'Sexta',
        horarioInicio: new Date('2024-01-15T09:00:00'),
        horarioFim: new Date('2024-01-15T13:00:00'),
      },
    ],
  });

  // Criar relatórios de estágio
  console.log('📋 Criando relatórios de estágio...');
  await prisma.relatorioEstagio.createMany({
    data: [
      {
        estagioId: estagio1.id,
        tipo: 'Inicial',
        prazoEntrega: new Date('2024-02-15'),
        dataEntregue: new Date('2024-02-10'),
        observacao: 'Relatório entregue dentro do prazo',
      },
      {
        estagioId: estagio1.id,
        tipo: 'Parcial',
        prazoEntrega: new Date('2024-07-15'),
        observacao: 'Aguardando entrega',
      },
      {
        estagioId: estagio1.id,
        tipo: 'Final',
        prazoEntrega: new Date('2024-12-15'),
        observacao: 'Aguardando entrega',
      },
      {
        estagioId: estagio2.id,
        tipo: 'Inicial',
        prazoEntrega: new Date('2024-03-01'),
        dataEntregue: new Date('2024-02-28'),
        observacao: 'Relatório inicial entregue',
      },
      {
        estagioId: estagio3.id,
        tipo: 'Inicial',
        prazoEntrega: new Date('2023-09-01'),
        dataEntregue: new Date('2023-08-25'),
        observacao: 'Relatório inicial entregue',
      },
      {
        estagioId: estagio3.id,
        tipo: 'Parcial',
        prazoEntrega: new Date('2024-01-31'),
        dataEntregue: new Date('2024-01-25'),
        observacao: 'Relatório parcial entregue',
      },
      {
        estagioId: estagio3.id,
        tipo: 'Final',
        prazoEntrega: new Date('2024-07-31'),
        dataEntregue: new Date('2024-07-25'),
        observacao: 'Relatório final entregue - Estágio concluído',
      },
    ],
  });

  // Criar motivos de encerramento
  console.log('📝 Criando motivos de encerramento...');
  await prisma.motivoEncerramentoEstagio.create({
    data: {
      estagioId: estagio5.id,
      motivoPrincipal: 'Conclusão do curso',
      motivosEmpresa: 'Reestruturação organizacional',
      motivosEmpresaOutros: 'Mudança de foco estratégico da empresa',
    },
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log(`
📊 Dados criados:
- ${await prisma.usuario.count()} usuários
- ${await prisma.cidade.count()} cidades
- ${await prisma.instituicao.count()} instituições
- ${await prisma.curso.count()} cursos
- ${await prisma.aluno.count()} alunos
- ${await prisma.empresa.count()} empresas
- ${await prisma.seguradora.count()} seguradoras
- ${await prisma.estagio.count()} estágios
- ${await prisma.estagioHorario.count()} horários de estágio
- ${await prisma.relatorioEstagio.count()} relatórios de estágio
- ${await prisma.motivoEncerramentoEstagio.count()} motivos de encerramento
  `);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
