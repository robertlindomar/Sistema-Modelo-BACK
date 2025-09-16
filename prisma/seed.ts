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

  // Criar cidades
  console.log('🏙️ Criando cidades...');
  const cidades = await prisma.cidade.createMany({
    data: [
      { nome: 'São Paulo', uf: 'SP' },
      { nome: 'Rio de Janeiro', uf: 'RJ' },
      { nome: 'Belo Horizonte', uf: 'MG' },
      { nome: 'Salvador', uf: 'BA' },
      { nome: 'Brasília', uf: 'DF' },
      { nome: 'Fortaleza', uf: 'CE' },
      { nome: 'Manaus', uf: 'AM' },
      { nome: 'Curitiba', uf: 'PR' },
      { nome: 'Recife', uf: 'PE' },
      { nome: 'Porto Alegre', uf: 'RS' },
      { nome: 'Belém', uf: 'PA' },
      { nome: 'Goiânia', uf: 'GO' },
      { nome: 'Guarulhos', uf: 'SP' },
      { nome: 'Campinas', uf: 'SP' },
      { nome: 'São Luís', uf: 'MA' },
      { nome: 'São Gonçalo', uf: 'RJ' },
      { nome: 'Maceió', uf: 'AL' },
      { nome: 'Duque de Caxias', uf: 'RJ' },
      { nome: 'Natal', uf: 'RN' },
      { nome: 'Teresina', uf: 'PI' },
      { nome: 'Campo Grande', uf: 'MS' },
      { nome: 'Nova Iguaçu', uf: 'RJ' },
      { nome: 'São Bernardo do Campo', uf: 'SP' },
      { nome: 'João Pessoa', uf: 'PB' },
      { nome: 'Santo André', uf: 'SP' },
      { nome: 'Osasco', uf: 'SP' },
      { nome: 'Jaboatão dos Guararapes', uf: 'PE' },
      { nome: 'São José dos Campos', uf: 'SP' },
      { nome: 'Ribeirão Preto', uf: 'SP' },
      { nome: 'Uberlândia', uf: 'MG' },
      { nome: 'Sorocaba', uf: 'SP' },
      { nome: 'Contagem', uf: 'MG' },
      { nome: 'Aracaju', uf: 'SE' },
      { nome: 'Feira de Santana', uf: 'BA' },
      { nome: 'Cuiabá', uf: 'MT' },
      { nome: 'Joinville', uf: 'SC' },
      { nome: 'Aparecida de Goiânia', uf: 'GO' },
      { nome: 'Londrina', uf: 'PR' },
      { nome: 'Ananindeua', uf: 'PA' },
      { nome: 'Serra', uf: 'ES' },
      { nome: 'Niterói', uf: 'RJ' },
      { nome: 'Caxias do Sul', uf: 'RS' },
      { nome: 'Campos dos Goytacazes', uf: 'RJ' },
      { nome: 'Vila Velha', uf: 'ES' },
      { nome: 'Florianópolis', uf: 'SC' },
      { nome: 'Macapá', uf: 'AP' },
      { nome: 'Diadema', uf: 'SP' },
      { nome: 'São João de Meriti', uf: 'RJ' },
      { nome: 'Mauá', uf: 'SP' },
      { nome: 'Carapicuíba', uf: 'SP' },
      { nome: 'Mogi das Cruzes', uf: 'SP' },
      { nome: 'Belford Roxo', uf: 'RJ' },
      { nome: 'São Vicente', uf: 'SP' },
      { nome: 'Jundiaí', uf: 'SP' },
      { nome: 'Franca', uf: 'SP' },
      { nome: 'Blumenau', uf: 'SC' },
      { nome: 'Petrolina', uf: 'PE' },
      { nome: 'Santos', uf: 'SP' },
      { nome: 'Volta Redonda', uf: 'RJ' },
      { nome: 'Canoas', uf: 'RS' },
      { nome: 'Vitória', uf: 'ES' },
      { nome: 'Caucaia', uf: 'CE' },
      { nome: 'Caruaru', uf: 'PE' },
      { nome: 'Olinda', uf: 'PE' },
      { nome: 'Anápolis', uf: 'GO' },
      { nome: 'Cariacica', uf: 'ES' },
      { nome: 'Bauru', uf: 'SP' },
      { nome: 'Itaquaquecetuba', uf: 'SP' },
      { nome: 'São José do Rio Preto', uf: 'SP' },
      { nome: 'Camaçari', uf: 'BA' },
      { nome: 'Montes Claros', uf: 'MG' },
      { nome: 'Mogi Guaçu', uf: 'SP' },
      { nome: 'Piracicaba', uf: 'SP' },
      { nome: 'Caxias', uf: 'MA' },
      { nome: 'Nova Friburgo', uf: 'RJ' },
      { nome: 'Petrópolis', uf: 'RJ' },
      { nome: 'Uberaba', uf: 'MG' },
      { nome: 'Paulista', uf: 'PE' },
      { nome: 'Limeira', uf: 'SP' },
      { nome: 'Cabo Frio', uf: 'RJ' },
      { nome: 'Várzea Grande', uf: 'MT' },
      { nome: 'Suzano', uf: 'SP' },
      { nome: 'Taboão da Serra', uf: 'SP' },
      { nome: 'Sumaré', uf: 'SP' },
      { nome: 'Marília', uf: 'SP' },
      { nome: 'Gravataí', uf: 'RS' },
      { nome: 'Barueri', uf: 'SP' },
      { nome: 'Embu das Artes', uf: 'SP' },
      { nome: 'São Carlos', uf: 'SP' },
      { nome: 'Indaiatuba', uf: 'SP' },
      { nome: 'Cotia', uf: 'SP' },
      { nome: 'Americana', uf: 'SP' },
      { nome: 'Araraquara', uf: 'SP' },
      { nome: 'Itapevi', uf: 'SP' },
      { nome: 'São Caetano do Sul', uf: 'SP' },
      { nome: 'Rio Claro', uf: 'SP' },
      { nome: 'Pindamonhangaba', uf: 'SP' },
      { nome: 'Ferraz de Vasconcelos', uf: 'SP' },
      { nome: 'Francisco Morato', uf: 'SP' },
      { nome: 'Itapecerica da Serra', uf: 'SP' },
      { nome: 'Itu', uf: 'SP' },
      { nome: 'Bragança Paulista', uf: 'SP' },
      { nome: 'Pindamonhangaba', uf: 'SP' },
      { nome: 'Poá', uf: 'SP' },
      { nome: 'Araçatuba', uf: 'SP' },
      { nome: 'Santa Bárbara d\'Oeste', uf: 'SP' },
      { nome: 'Jacareí', uf: 'SP' },
      { nome: 'Hortolândia', uf: 'SP' },
      { nome: 'Suzano', uf: 'SP' },
      { nome: 'Ribeirão Pires', uf: 'SP' },
      { nome: 'São José de Ribamar', uf: 'MA' },
      { nome: 'Guarujá', uf: 'SP' },
      { nome: 'Taubaté', uf: 'SP' },
      { nome: 'Praia Grande', uf: 'SP' },
      { nome: 'Lages', uf: 'SC' },
      { nome: 'Apucarana', uf: 'PR' },
      { nome: 'Foz do Iguaçu', uf: 'PR' },
      { nome: 'Ponta Grossa', uf: 'PR' },
      { nome: 'Cascavel', uf: 'PR' },
      { nome: 'São José dos Pinhais', uf: 'PR' },
      { nome: 'Colombo', uf: 'PR' },
      { nome: 'Guarapuava', uf: 'PR' },
      { nome: 'Paranaguá', uf: 'PR' },
      { nome: 'Araucária', uf: 'PR' },
      { nome: 'Toledo', uf: 'PR' },
      { nome: 'Pinhais', uf: 'PR' },
      { nome: 'Campo Largo', uf: 'PR' },
      { nome: 'Arapongas', uf: 'PR' },
      { nome: 'Almirante Tamandaré', uf: 'PR' },
      { nome: 'Umuarama', uf: 'PR' },
      { nome: 'Piraquara', uf: 'PR' },
      { nome: 'Cambé', uf: 'PR' },
      { nome: 'Fazenda Rio Grande', uf: 'PR' },
      { nome: 'Paranavaí', uf: 'PR' },
      { nome: 'São José dos Pinhais', uf: 'PR' },
      { nome: 'Maringá', uf: 'PR' },
      { nome: 'Cianorte', uf: 'PR' },
      { nome: 'Telêmaco Borba', uf: 'PR' },
      { nome: 'Castro', uf: 'PR' },
      { nome: 'Pato Branco', uf: 'PR' },
      { nome: 'Irati', uf: 'PR' },
      { nome: 'União da Vitória', uf: 'PR' },
      { nome: 'Londrina', uf: 'PR' },
      { nome: 'Ponta Grossa', uf: 'PR' },
      { nome: 'Maringá', uf: 'PR' },
      { nome: 'Cascavel', uf: 'PR' },
      { nome: 'São José dos Pinhais', uf: 'PR' },
      { nome: 'Foz do Iguaçu', uf: 'PR' },
      { nome: 'Guarapuava', uf: 'PR' },
      { nome: 'Paranaguá', uf: 'PR' },
      { nome: 'Araucária', uf: 'PR' },
      { nome: 'Toledo', uf: 'PR' },
      { nome: 'Pinhais', uf: 'PR' },
      { nome: 'Campo Largo', uf: 'PR' },
      { nome: 'Arapongas', uf: 'PR' },
      { nome: 'Almirante Tamandaré', uf: 'PR' },
      { nome: 'Umuarama', uf: 'PR' },
      { nome: 'Piraquara', uf: 'PR' },
      { nome: 'Cambé', uf: 'PR' },
      { nome: 'Fazenda Rio Grande', uf: 'PR' },
      { nome: 'Paranavaí', uf: 'PR' },
      { nome: 'Cianorte', uf: 'PR' },
      { nome: 'Telêmaco Borba', uf: 'PR' },
      { nome: 'Castro', uf: 'PR' },
      { nome: 'Pato Branco', uf: 'PR' },
      { nome: 'Irati', uf: 'PR' },
      { nome: 'União da Vitória', uf: 'PR' },
    ],
  });

  // Buscar cidades criadas para usar nos relacionamentos
  const todasCidades = await prisma.cidade.findMany();
  const cidade1 = todasCidades[0]; // São Paulo
  const cidade2 = todasCidades[1]; // Rio de Janeiro
  const cidade3 = todasCidades[2]; // Belo Horizonte
  const cidade4 = todasCidades[3]; // Salvador
  const cidade5 = todasCidades[4]; // Brasília

  // Criar instituições
  console.log('🏫 Criando instituições...');
  const instituicoes = await prisma.instituicao.createMany({
    data: [
      {
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
      {
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
      {
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
      {
        nome: 'Universidade de São Paulo',
        nomeFantasia: 'USP',
        cnpj: '12.345.678/0001-93',
        endereco: 'Rua do Lago, 717 - Cidade Universitária',
        cidadeId: cidade1.id,
        telefone: '(11) 3091-3000',
        email: 'contato@usp.br',
        nomeDiretor: 'Carlos Gilberto Carlotti Junior',
        cpfDiretor: '111.222.333-44',
      },
      {
        nome: 'Universidade Estadual de Campinas',
        nomeFantasia: 'UNICAMP',
        cnpj: '12.345.678/0001-94',
        endereco: 'Rua da Reitoria, 109 - Cidade Universitária',
        cidadeId: todasCidades[13].id, // Campinas
        telefone: '(19) 3521-1000',
        email: 'contato@unicamp.br',
        nomeDiretor: 'Antonio José de Almeida Meirelles',
        cpfDiretor: '222.333.444-55',
      },
      {
        nome: 'Universidade Federal da Bahia',
        nomeFantasia: 'UFBA',
        cnpj: '12.345.678/0001-95',
        endereco: 'Rua Augusto Viana, s/n - Canela',
        cidadeId: cidade4.id,
        telefone: '(71) 3283-5000',
        email: 'contato@ufba.br',
        nomeDiretor: 'João Carlos Salles Pires da Silva',
        cpfDiretor: '333.444.555-66',
      },
      {
        nome: 'Universidade Federal do Ceará',
        nomeFantasia: 'UFC',
        cnpj: '12.345.678/0001-96',
        endereco: 'Av. da Universidade, 2853 - Benfica',
        cidadeId: todasCidades[5].id, // Fortaleza
        telefone: '(85) 3366-7000',
        email: 'contato@ufc.br',
        nomeDiretor: 'Cândido Gomes Bezerra',
        cpfDiretor: '444.555.666-77',
      },
      {
        nome: 'Universidade Federal do Amazonas',
        nomeFantasia: 'UFAM',
        cnpj: '12.345.678/0001-97',
        endereco: 'Av. General Rodrigo Otávio, 3000 - Coroado',
        cidadeId: todasCidades[6].id, // Manaus
        telefone: '(92) 3305-1181',
        email: 'contato@ufam.edu.br',
        nomeDiretor: 'Sylvio Puga Ferreira',
        cpfDiretor: '555.666.777-88',
      },
      {
        nome: 'Universidade Federal do Paraná',
        nomeFantasia: 'UFPR',
        cnpj: '12.345.678/0001-98',
        endereco: 'Rua XV de Novembro, 1299 - Centro',
        cidadeId: todasCidades[7].id, // Curitiba
        telefone: '(41) 3310-2600',
        email: 'contato@ufpr.br',
        nomeDiretor: 'Ricardo Marcelo Fonseca',
        cpfDiretor: '666.777.888-99',
      },
      {
        nome: 'Universidade Federal de Pernambuco',
        nomeFantasia: 'UFPE',
        cnpj: '12.345.678/0001-99',
        endereco: 'Av. Prof. Moraes Rego, 1235 - Cidade Universitária',
        cidadeId: todasCidades[8].id, // Recife
        telefone: '(81) 2126-8000',
        email: 'contato@ufpe.br',
        nomeDiretor: 'Alfredo Gomes',
        cpfDiretor: '777.888.999-00',
      },
      {
        nome: 'Universidade Federal do Rio Grande do Sul',
        nomeFantasia: 'UFRGS',
        cnpj: '12.345.678/0002-00',
        endereco: 'Av. Paulo Gama, 110 - Farroupilha',
        cidadeId: todasCidades[9].id, // Porto Alegre
        telefone: '(51) 3308-6000',
        email: 'contato@ufrgs.br',
        nomeDiretor: 'Rui Vicente Oppermann',
        cpfDiretor: '888.999.000-11',
      },
      {
        nome: 'Universidade Federal do Pará',
        nomeFantasia: 'UFPA',
        cnpj: '12.345.678/0002-01',
        endereco: 'Rua Augusto Corrêa, 01 - Guamá',
        cidadeId: todasCidades[10].id, // Belém
        telefone: '(91) 3201-7000',
        email: 'contato@ufpa.br',
        nomeDiretor: 'Emmanuel Zagury Tourinho',
        cpfDiretor: '999.000.111-22',
      },
      {
        nome: 'Universidade Federal de Goiás',
        nomeFantasia: 'UFG',
        cnpj: '12.345.678/0002-02',
        endereco: 'Campus Samambaia - Goiânia',
        cidadeId: todasCidades[11].id, // Goiânia
        telefone: '(62) 3521-1000',
        email: 'contato@ufg.br',
        nomeDiretor: 'Angelita Pereira de Lima',
        cpfDiretor: '000.111.222-33',
      },
      {
        nome: 'Instituto Federal do Rio de Janeiro',
        nomeFantasia: 'IFRJ',
        cnpj: '12.345.678/0002-03',
        endereco: 'Rua Professor Carlos Wenceslau, 343 - Realengo',
        cidadeId: cidade2.id,
        telefone: '(21) 3332-4000',
        email: 'contato@ifrj.edu.br',
        nomeDiretor: 'Rafael Almada',
        cpfDiretor: '111.222.333-44',
      },
      {
        nome: 'Instituto Federal de Minas Gerais',
        nomeFantasia: 'IFMG',
        cnpj: '12.345.678/0002-04',
        endereco: 'Rua Coronel Fabriciano, 731 - Centro',
        cidadeId: cidade3.id,
        telefone: '(31) 3773-3000',
        email: 'contato@ifmg.edu.br',
        nomeDiretor: 'Sérgio Pedini',
        cpfDiretor: '222.333.444-55',
      },
      {
        nome: 'Instituto Federal da Bahia',
        nomeFantasia: 'IFBA',
        cnpj: '12.345.678/0002-05',
        endereco: 'Rua Emídio dos Santos, s/n - Barbalho',
        cidadeId: cidade4.id,
        telefone: '(71) 2102-9500',
        email: 'contato@ifba.edu.br',
        nomeDiretor: 'Ailton Oliveira da Silva',
        cpfDiretor: '333.444.555-66',
      },
      {
        nome: 'Instituto Federal do Ceará',
        nomeFantasia: 'IFCE',
        cnpj: '12.345.678/0002-06',
        endereco: 'Av. Treze de Maio, 2081 - Benfica',
        cidadeId: todasCidades[5].id, // Fortaleza
        telefone: '(85) 3307-3600',
        email: 'contato@ifce.edu.br',
        nomeDiretor: 'Virgílio Araripe Furtado',
        cpfDiretor: '444.555.666-77',
      },
      {
        nome: 'Instituto Federal do Amazonas',
        nomeFantasia: 'IFAM',
        cnpj: '12.345.678/0002-07',
        endereco: 'Av. 7 de Setembro, 1975 - Centro',
        cidadeId: todasCidades[6].id, // Manaus
        telefone: '(92) 2125-0300',
        email: 'contato@ifam.edu.br',
        nomeDiretor: 'Antônio Venâncio Castelo Branco',
        cpfDiretor: '555.666.777-88',
      },
      {
        nome: 'Instituto Federal do Paraná',
        nomeFantasia: 'IFPR',
        cnpj: '12.345.678/0002-08',
        endereco: 'Rua João Negrão, 1285 - Rebouças',
        cidadeId: todasCidades[7].id, // Curitiba
        telefone: '(41) 3535-0200',
        email: 'contato@ifpr.edu.br',
        nomeDiretor: 'Odilson Luiz Zanelatto',
        cpfDiretor: '666.777.888-99',
      },
      {
        nome: 'Instituto Federal de Pernambuco',
        nomeFantasia: 'IFPE',
        cnpj: '12.345.678/0002-09',
        endereco: 'Av. Prof. Luiz Freire, 500 - Cidade Universitária',
        cidadeId: todasCidades[8].id, // Recife
        telefone: '(81) 2125-1700',
        email: 'contato@ifpe.edu.br',
        nomeDiretor: 'José Carlos de Sá',
        cpfDiretor: '777.888.999-00',
      },
      {
        nome: 'Instituto Federal do Rio Grande do Sul',
        nomeFantasia: 'IFRS',
        cnpj: '12.345.678/0002-10',
        endereco: 'Rua Osvaldo Aranha, 540 - Bom Fim',
        cidadeId: todasCidades[9].id, // Porto Alegre
        telefone: '(51) 3930-6000',
        email: 'contato@ifrs.edu.br',
        nomeDiretor: 'Júlio César Xandro de Andrade',
        cpfDiretor: '888.999.000-11',
      },
      {
        nome: 'Instituto Federal do Pará',
        nomeFantasia: 'IFPA',
        cnpj: '12.345.678/0002-11',
        endereco: 'Av. Almirante Barroso, 1155 - Marco',
        cidadeId: todasCidades[10].id, // Belém
        telefone: '(91) 3204-1400',
        email: 'contato@ifpa.edu.br',
        nomeDiretor: 'Cláudio Alex Jorge da Rocha',
        cpfDiretor: '999.000.111-22',
      },
      {
        nome: 'Instituto Federal de Goiás',
        nomeFantasia: 'IFG',
        cnpj: '12.345.678/0002-12',
        endereco: 'Rua 75, 46 - Setor Central',
        cidadeId: todasCidades[11].id, // Goiânia
        telefone: '(62) 3229-2500',
        email: 'contato@ifg.edu.br',
        nomeDiretor: 'Oneida Cristina Gomes Irigon',
        cpfDiretor: '000.111.222-33',
      },
      {
        nome: 'Universidade Estadual Paulista',
        nomeFantasia: 'UNESP',
        cnpj: '12.345.678/0002-13',
        endereco: 'Rua Quirino de Andrade, 215 - Centro',
      cidadeId: cidade1.id,
        telefone: '(11) 5627-0000',
        email: 'contato@unesp.br',
        nomeDiretor: 'Pasqual Barretti',
        cpfDiretor: '111.222.333-44',
      },
      {
        nome: 'Universidade Estadual do Rio de Janeiro',
        nomeFantasia: 'UERJ',
        cnpj: '12.345.678/0002-14',
        endereco: 'Rua São Francisco Xavier, 524 - Maracanã',
      cidadeId: cidade2.id,
        telefone: '(21) 2334-0000',
        email: 'contato@uerj.br',
        nomeDiretor: 'Ricardo Lodi Ribeiro',
        cpfDiretor: '222.333.444-55',
      },
      {
        nome: 'Universidade Estadual de Minas Gerais',
        nomeFantasia: 'UEMG',
        cnpj: '12.345.678/0002-15',
        endereco: 'Rua Guajajaras, 175 - Centro',
      cidadeId: cidade3.id,
        telefone: '(31) 3409-5000',
        email: 'contato@uemg.br',
        nomeDiretor: 'Dijon Moraes Junior',
        cpfDiretor: '333.444.555-66',
      },
      {
        nome: 'Universidade Estadual da Bahia',
        nomeFantasia: 'UNEB',
        cnpj: '12.345.678/0002-16',
        endereco: 'Rua Silveira Martins, 2555 - Cabula',
      cidadeId: cidade4.id,
        telefone: '(71) 3117-2400',
        email: 'contato@uneb.br',
        nomeDiretor: 'José Bites de Carvalho',
        cpfDiretor: '444.555.666-77',
      },
      {
        nome: 'Universidade Estadual do Ceará',
        nomeFantasia: 'UECE',
        cnpj: '12.345.678/0002-17',
        endereco: 'Av. Dr. Silas Munguba, 1700 - Itaperi',
        cidadeId: todasCidades[5].id, // Fortaleza
        telefone: '(85) 3101-9600',
        email: 'contato@uece.br',
        nomeDiretor: 'Hidelbrando dos Santos Soares',
        cpfDiretor: '555.666.777-88',
      },
      {
        nome: 'Universidade Estadual do Amazonas',
        nomeFantasia: 'UEA',
        cnpj: '12.345.678/0002-18',
        endereco: 'Av. Djalma Batista, 3578 - Flores',
        cidadeId: todasCidades[6].id, // Manaus
        telefone: '(92) 3236-8000',
        email: 'contato@uea.edu.br',
        nomeDiretor: 'André Zogahib',
        cpfDiretor: '666.777.888-99',
      },
      {
        nome: 'Universidade Estadual do Paraná',
        nomeFantasia: 'UEPG',
        cnpj: '12.345.678/0002-19',
        endereco: 'Campus Central - Uvaranas',
        cidadeId: todasCidades[7].id, // Curitiba
        telefone: '(42) 3220-3000',
        email: 'contato@uepg.br',
        nomeDiretor: 'Miguel Sanches Neto',
        cpfDiretor: '777.888.999-00',
      },
      {
        nome: 'Universidade Estadual de Pernambuco',
        nomeFantasia: 'UPE',
        cnpj: '12.345.678/0002-20',
        endereco: 'Rua Amaro Maltez, 203 - Madalena',
        cidadeId: todasCidades[8].id, // Recife
        telefone: '(81) 3183-3700',
        email: 'contato@upe.br',
        nomeDiretor: 'Pedro Falcão',
        cpfDiretor: '888.999.000-11',
      },
      {
        nome: 'Universidade Estadual do Rio Grande do Sul',
        nomeFantasia: 'UERGS',
        cnpj: '12.345.678/0002-21',
        endereco: 'Av. Osvaldo Aranha, 540 - Bom Fim',
        cidadeId: todasCidades[9].id, // Porto Alegre
        telefone: '(51) 3308-6000',
        email: 'contato@uergs.edu.br',
        nomeDiretor: 'Vilmar Thomé',
        cpfDiretor: '999.000.111-22',
      },
      {
        nome: 'Universidade Estadual do Pará',
        nomeFantasia: 'UEPA',
        cnpj: '12.345.678/0002-22',
        endereco: 'Travessa Djalma Dutra, 1301 - Telegrafo',
        cidadeId: todasCidades[10].id, // Belém
        telefone: '(91) 3249-0000',
        email: 'contato@uepa.br',
        nomeDiretor: 'Rubens Cardoso da Silva',
        cpfDiretor: '000.111.222-33',
      },
      {
        nome: 'Universidade Estadual de Goiás',
        nomeFantasia: 'UEG',
        cnpj: '12.345.678/0002-23',
        endereco: 'Rua 75, 46 - Setor Central',
        cidadeId: todasCidades[11].id, // Goiânia
        telefone: '(62) 3201-3000',
        email: 'contato@ueg.br',
        nomeDiretor: 'Anselmo de Athayde',
        cpfDiretor: '111.222.333-44',
      },
    ],
  });

  // Buscar instituições criadas para usar nos relacionamentos
  const todasInstituicoes = await prisma.instituicao.findMany();
  const instituicao1 = todasInstituicoes[0]; // IFSP
  const instituicao2 = todasInstituicoes[1]; // UFRJ
  const instituicao3 = todasInstituicoes[2]; // UFMG

  // Criar cursos
  console.log('📚 Criando cursos...');
  const cursos = await prisma.curso.createMany({
    data: [
      { nome: 'Tecnologia em Análise e Desenvolvimento de Sistemas', habilitacao: 'Tecnólogo', nivel: 'Superior' },
      { nome: 'Engenharia de Software', habilitacao: 'Bacharel', nivel: 'Superior' },
      { nome: 'Ciência da Computação', habilitacao: 'Bacharel', nivel: 'Superior' },
      { nome: 'Técnico em Informática', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Administração', habilitacao: 'Bacharel', nivel: 'Superior' },
      { nome: 'Engenharia da Computação', habilitacao: 'Bacharel', nivel: 'Superior' },
      { nome: 'Sistemas de Informação', habilitacao: 'Bacharel', nivel: 'Superior' },
      { nome: 'Tecnologia em Redes de Computadores', habilitacao: 'Tecnólogo', nivel: 'Superior' },
      { nome: 'Tecnologia em Jogos Digitais', habilitacao: 'Tecnólogo', nivel: 'Superior' },
      { nome: 'Tecnologia em Segurança da Informação', habilitacao: 'Tecnólogo', nivel: 'Superior' },
      { nome: 'Tecnologia em Banco de Dados', habilitacao: 'Tecnólogo', nivel: 'Superior' },
      { nome: 'Tecnologia em Sistemas para Internet', habilitacao: 'Tecnólogo', nivel: 'Superior' },
      { nome: 'Tecnologia em Gestão da Tecnologia da Informação', habilitacao: 'Tecnólogo', nivel: 'Superior' },
      { nome: 'Técnico em Desenvolvimento de Sistemas', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Redes de Computadores', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Programação de Jogos Digitais', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Manutenção e Suporte em Informática', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Multimídia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Segurança do Trabalho', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Administração', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Contabilidade', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Logística', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Marketing', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Recursos Humanos', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Vendas', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Finanças', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Comércio Exterior', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Gestão de Pequenas Empresas', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Secretariado', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Turismo', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Eventos', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Hospedagem', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Guia de Turismo', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Agronegócio', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Agropecuária', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Meio Ambiente', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Química', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Biotecnologia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Eletrônica', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Eletrotécnica', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Mecânica', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Mecatrônica', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Automação Industrial', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Construção Civil', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Edificações', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Geoprocessamento', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Mineração', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Petróleo e Gás', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Radiologia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Enfermagem', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Farmácia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Nutrição', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Estética', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Massoterapia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Podologia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Prótese Dentária', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Saúde Bucal', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Análises Clínicas', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Hemoterapia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Imobilização Ortopédica', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Necropsia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Patologia Clínica', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Registros e Informações em Saúde', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Vigilância em Saúde', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Gerência de Saúde', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Gerência de Resíduos', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Saneamento', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Controle Ambiental', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Hidrologia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Geologia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Geofísica', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Geodésia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Cartografia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Topografia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Agrimensura', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Desenho de Construção Civil', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Desenho de Arquitetura', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Desenho de Mecânica', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Desenho de Eletrônica', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Desenho de Moda', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Design de Interiores', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Design Gráfico', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Comunicação Visual', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Produção de Moda', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Vestuário', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Têxtil', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Calçados', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Couro', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Joalheria', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Ourivesaria', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Gemologia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Lapidação', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Engastamento', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Soldagem', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Usinagem', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Fundição', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Forjaria', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Estamparia', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Trefilação', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Laminação', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Extrusão', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Injeção', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Sopro', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Termoformagem', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Rotomoldagem', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Calandragem', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Prensagem', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Conformação', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Dobragem', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Corte', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Furação', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Aplainamento', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Fresagem', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Torneamento', habilitacao: 'Técnico', nivel: 'Médio' },
      { nome: 'Técnico em Retificação', habilitacao: 'Técnico', nivel: 'Médio' },
    ],
  });

  // Buscar cursos criados para usar nos relacionamentos
  const todosCursos = await prisma.curso.findMany();
  const curso1 = todosCursos[0]; // ADS
  const curso2 = todosCursos[1]; // Engenharia de Software
  const curso3 = todosCursos[2]; // Ciência da Computação
  const curso4 = todosCursos[3]; // Técnico em Informática
  const curso5 = todosCursos[4]; // Administração

  // Criar alunos
  console.log('👨‍🎓 Criando alunos...');
  const alunos = await prisma.aluno.createMany({
    data: [
      { nome: 'Ana Carolina Silva', rg: '12.345.678-9', cpf: '123.456.789-01', endereco: 'Rua das Flores, 123 - Centro', cidadeId: cidade1.id, cursoId: curso1.id, serie: '3º Semestre', telefone: '(11) 99999-1111', telefonePai: '(11) 99999-2222', email: 'ana.silva@email.com', dataNascimento: new Date('2000-05-15') },
      { nome: 'Bruno Santos Oliveira', rg: '23.456.789-0', cpf: '234.567.890-12', endereco: 'Av. Paulista, 456 - Bela Vista', cidadeId: cidade1.id, cursoId: curso2.id, serie: '5º Semestre', telefone: '(11) 99999-3333', telefonePai: '(11) 99999-4444', email: 'bruno.oliveira@email.com', dataNascimento: new Date('1999-08-22') },
      { nome: 'Carlos Eduardo Lima', rg: '34.567.890-1', cpf: '345.678.901-23', endereco: 'Rua Copacabana, 789 - Copacabana', cidadeId: cidade2.id, cursoId: curso3.id, serie: '7º Semestre', telefone: '(21) 99999-5555', telefonePai: '(21) 99999-6666', email: 'carlos.lima@email.com', dataNascimento: new Date('1998-12-10') },
      { nome: 'Diana Ferreira Costa', rg: '45.678.901-2', cpf: '456.789.012-34', endereco: 'Rua Savassi, 321 - Savassi', cidadeId: cidade3.id, cursoId: curso4.id, serie: '2º Ano', telefone: '(31) 99999-7777', telefonePai: '(31) 99999-8888', email: 'diana.costa@email.com', dataNascimento: new Date('2001-03-18') },
      { nome: 'Eduardo Martins Pereira', rg: '56.789.012-3', cpf: '567.890.123-45', endereco: 'Rua Pelourinho, 654 - Centro Histórico', cidadeId: cidade4.id, cursoId: curso5.id, serie: '6º Semestre', telefone: '(71) 99999-9999', telefonePai: '(71) 99999-0000', email: 'eduardo.pereira@email.com', dataNascimento: new Date('1999-07-25') },
      { nome: 'Fernanda Alves Santos', rg: '67.890.123-4', cpf: '678.901.234-56', endereco: 'Rua das Palmeiras, 100 - Jardins', cidadeId: cidade1.id, cursoId: curso1.id, serie: '4º Semestre', telefone: '(11) 99999-1112', telefonePai: '(11) 99999-2223', email: 'fernanda.santos@email.com', dataNascimento: new Date('2000-02-14') },
      { nome: 'Gabriel Rodrigues Costa', rg: '78.901.234-5', cpf: '789.012.345-67', endereco: 'Av. Ipiranga, 200 - Centro', cidadeId: cidade2.id, cursoId: curso2.id, serie: '6º Semestre', telefone: '(21) 99999-3334', telefonePai: '(21) 99999-4445', email: 'gabriel.costa@email.com', dataNascimento: new Date('1999-11-08') },
      { nome: 'Helena Maria Oliveira', rg: '89.012.345-6', cpf: '890.123.456-78', endereco: 'Rua da Liberdade, 300 - Liberdade', cidadeId: cidade3.id, cursoId: curso3.id, serie: '8º Semestre', telefone: '(31) 99999-5556', telefonePai: '(31) 99999-6667', email: 'helena.oliveira@email.com', dataNascimento: new Date('1998-09-30') },
      { nome: 'Igor Silva Mendes', rg: '90.123.456-7', cpf: '901.234.567-89', endereco: 'Av. Sete de Setembro, 400 - Centro', cidadeId: cidade4.id, cursoId: curso4.id, serie: '3º Ano', telefone: '(71) 99999-7778', telefonePai: '(71) 99999-8889', email: 'igor.mendes@email.com', dataNascimento: new Date('2001-01-12') },
      { nome: 'Juliana Ferreira Lima', rg: '01.234.567-8', cpf: '012.345.678-90', endereco: 'Rua do Comércio, 500 - Comércio', cidadeId: cidade5.id, cursoId: curso5.id, serie: '7º Semestre', telefone: '(61) 99999-9990', telefonePai: '(61) 99999-0001', email: 'juliana.lima@email.com', dataNascimento: new Date('1999-04-03') },
      { nome: 'Lucas Henrique Souza', rg: '12.345.678-9', cpf: '123.456.789-01', endereco: 'Rua das Acácias, 600 - Vila Nova', cidadeId: todasCidades[5].id, cursoId: curso1.id, serie: '2º Semestre', telefone: '(85) 99999-1113', telefonePai: '(85) 99999-2224', email: 'lucas.souza@email.com', dataNascimento: new Date('2002-06-20') },
      { nome: 'Mariana Costa Alves', rg: '23.456.789-0', cpf: '234.567.890-12', endereco: 'Av. Beira Mar, 700 - Praia de Iracema', cidadeId: todasCidades[6].id, cursoId: curso2.id, serie: '4º Semestre', telefone: '(92) 99999-3335', telefonePai: '(92) 99999-4446', email: 'mariana.alves@email.com', dataNascimento: new Date('2000-08-15') },
      { nome: 'Nicolas Pereira Santos', rg: '34.567.890-1', cpf: '345.678.901-23', endereco: 'Rua da Paz, 800 - Centro', cidadeId: todasCidades[7].id, cursoId: curso3.id, serie: '6º Semestre', telefone: '(41) 99999-5557', telefonePai: '(41) 99999-6668', email: 'nicolas.santos@email.com', dataNascimento: new Date('1999-12-01') },
      { nome: 'Olivia Rodrigues Lima', rg: '45.678.901-2', cpf: '456.789.012-34', endereco: 'Av. Boa Viagem, 900 - Boa Viagem', cidadeId: todasCidades[8].id, cursoId: curso4.id, serie: '1º Ano', telefone: '(81) 99999-7779', telefonePai: '(81) 99999-8890', email: 'olivia.lima@email.com', dataNascimento: new Date('2002-03-25') },
      { nome: 'Pedro Henrique Silva', rg: '56.789.012-3', cpf: '567.890.123-45', endereco: 'Rua da Consolação, 1000 - Consolação', cidadeId: todasCidades[9].id, cursoId: curso5.id, serie: '5º Semestre', telefone: '(51) 99999-9991', telefonePai: '(51) 99999-0002', email: 'pedro.silva@email.com', dataNascimento: new Date('2000-10-18') },
      { nome: 'Rafaela Almeida Costa', rg: '67.890.123-4', cpf: '678.901.234-56', endereco: 'Av. Paulista, 1100 - Bela Vista', cidadeId: todasCidades[10].id, cursoId: curso1.id, serie: '3º Semestre', telefone: '(91) 99999-1114', telefonePai: '(91) 99999-2225', email: 'rafaela.costa@email.com', dataNascimento: new Date('2001-07-09') },
      { nome: 'Samuel Oliveira Mendes', rg: '78.901.234-5', cpf: '789.012.345-67', endereco: 'Rua das Rosas, 1200 - Jardim América', cidadeId: todasCidades[11].id, cursoId: curso2.id, serie: '7º Semestre', telefone: '(62) 99999-3336', telefonePai: '(62) 99999-4447', email: 'samuel.mendes@email.com', dataNascimento: new Date('1998-05-22') },
      { nome: 'Tatiana Santos Ferreira', rg: '89.012.345-6', cpf: '890.123.456-78', endereco: 'Av. Atlântica, 1300 - Copacabana', cidadeId: todasCidades[12].id, cursoId: curso3.id, serie: '9º Semestre', telefone: '(11) 99999-5558', telefonePai: '(11) 99999-6669', email: 'tatiana.ferreira@email.com', dataNascimento: new Date('1997-11-14') },
      { nome: 'Vitor Hugo Lima', rg: '90.123.456-7', cpf: '901.234.567-89', endereco: 'Rua da Glória, 1400 - Glória', cidadeId: todasCidades[13].id, cursoId: curso4.id, serie: '4º Ano', telefone: '(19) 99999-7780', telefonePai: '(19) 99999-8891', email: 'vitor.lima@email.com', dataNascimento: new Date('2000-01-07') },
      { nome: 'Wanessa Alves Pereira', rg: '01.234.567-8', cpf: '012.345.678-90', endereco: 'Av. Afonso Pena, 1500 - Centro', cidadeId: todasCidades[14].id, cursoId: curso5.id, serie: '8º Semestre', telefone: '(31) 99999-9992', telefonePai: '(31) 99999-0003', email: 'wanessa.pereira@email.com', dataNascimento: new Date('1998-08-31') },
      { nome: 'Yasmin Costa Silva', rg: '12.345.678-9', cpf: '123.456.789-01', endereco: 'Rua do Pelourinho, 1600 - Centro Histórico', cidadeId: todasCidades[15].id, cursoId: curso1.id, serie: '1º Semestre', telefone: '(71) 99999-1115', telefonePai: '(71) 99999-2226', email: 'yasmin.silva@email.com', dataNascimento: new Date('2003-04-16') },
      { nome: 'Zeca Pagodinho Santos', rg: '23.456.789-0', cpf: '234.567.890-12', endereco: 'Av. Beira Mar, 1700 - Praia do Flamengo', cidadeId: todasCidades[16].id, cursoId: curso2.id, serie: '5º Semestre', telefone: '(21) 99999-3337', telefonePai: '(21) 99999-4448', email: 'zeca.santos@email.com', dataNascimento: new Date('1999-09-28') },
      { nome: 'Alice Rodrigues Lima', rg: '34.567.890-1', cpf: '345.678.901-23', endereco: 'Rua da Consolação, 1800 - Consolação', cidadeId: todasCidades[17].id, cursoId: curso3.id, serie: '6º Semestre', telefone: '(31) 99999-5559', telefonePai: '(31) 99999-6670', email: 'alice.lima@email.com', dataNascimento: new Date('2000-12-05') },
      { nome: 'Beatriz Almeida Costa', rg: '45.678.901-2', cpf: '456.789.012-34', endereco: 'Av. Paulista, 1900 - Bela Vista', cidadeId: todasCidades[18].id, cursoId: curso4.id, serie: '2º Ano', telefone: '(11) 99999-7781', telefonePai: '(11) 99999-8892', email: 'beatriz.costa@email.com', dataNascimento: new Date('2001-06-12') },
      { nome: 'Carla Silva Mendes', rg: '56.789.012-3', cpf: '567.890.123-45', endereco: 'Rua das Flores, 2000 - Jardins', cidadeId: todasCidades[19].id, cursoId: curso5.id, serie: '7º Semestre', telefone: '(21) 99999-9993', telefonePai: '(21) 99999-0004', email: 'carla.mendes@email.com', dataNascimento: new Date('1998-02-19') },
      { nome: 'Diego Henrique Oliveira', rg: '67.890.123-4', cpf: '678.901.234-56', endereco: 'Av. Ipiranga, 2100 - Centro', cidadeId: todasCidades[20].id, cursoId: curso1.id, serie: '4º Semestre', telefone: '(31) 99999-1116', telefonePai: '(31) 99999-2227', email: 'diego.oliveira@email.com', dataNascimento: new Date('2000-10-23') },
      { nome: 'Elisa Ferreira Santos', rg: '78.901.234-5', cpf: '789.012.345-67', endereco: 'Rua da Liberdade, 2200 - Liberdade', cidadeId: todasCidades[21].id, cursoId: curso2.id, serie: '8º Semestre', telefone: '(11) 99999-3338', telefonePai: '(11) 99999-4449', email: 'elisa.santos@email.com', dataNascimento: new Date('1997-07-17') },
      { nome: 'Felipe Costa Lima', rg: '89.012.345-6', cpf: '890.123.456-78', endereco: 'Av. Sete de Setembro, 2300 - Centro', cidadeId: todasCidades[22].id, cursoId: curso3.id, serie: '9º Semestre', telefone: '(21) 99999-5560', telefonePai: '(21) 99999-6671', email: 'felipe.lima@email.com', dataNascimento: new Date('1997-03-11') },
      { nome: 'Giovanna Alves Pereira', rg: '90.123.456-7', cpf: '901.234.567-89', endereco: 'Rua do Comércio, 2400 - Comércio', cidadeId: todasCidades[23].id, cursoId: curso4.id, serie: '3º Ano', telefone: '(31) 99999-7782', telefonePai: '(31) 99999-8893', email: 'giovanna.pereira@email.com', dataNascimento: new Date('2000-11-26') },
      { nome: 'Henrique Silva Costa', rg: '01.234.567-8', cpf: '012.345.678-90', endereco: 'Rua das Acácias, 2500 - Vila Nova', cidadeId: todasCidades[24].id, cursoId: curso5.id, serie: '6º Semestre', telefone: '(11) 99999-9994', telefonePai: '(11) 99999-0005', email: 'henrique.costa@email.com', dataNascimento: new Date('1999-05-04') },
      { nome: 'Isabella Rodrigues Alves', rg: '12.345.678-9', cpf: '123.456.789-01', endereco: 'Av. Paulista, 2600 - Bela Vista', cidadeId: todasCidades[25].id, cursoId: curso1.id, serie: '5º Semestre', telefone: '(11) 99999-1117', telefonePai: '(11) 99999-2228', email: 'isabella.alves@email.com', dataNascimento: new Date('2000-09-13') },
      { nome: 'João Pedro Santos Lima', rg: '23.456.789-0', cpf: '234.567.890-12', endereco: 'Rua da Consolação, 2700 - Consolação', cidadeId: todasCidades[26].id, cursoId: curso2.id, serie: '7º Semestre', telefone: '(11) 99999-3339', telefonePai: '(11) 99999-4450', email: 'joao.lima@email.com', dataNascimento: new Date('1998-12-28') },
      { nome: 'Larissa Costa Mendes', rg: '34.567.890-1', cpf: '345.678.901-23', endereco: 'Av. Ipiranga, 2800 - Centro', cidadeId: todasCidades[27].id, cursoId: curso3.id, serie: '8º Semestre', telefone: '(11) 99999-5561', telefonePai: '(11) 99999-6672', email: 'larissa.mendes@email.com', dataNascimento: new Date('1997-06-15') },
      { nome: 'Matheus Oliveira Ferreira', rg: '45.678.901-2', cpf: '456.789.012-34', endereco: 'Rua da Liberdade, 2900 - Liberdade', cidadeId: todasCidades[28].id, cursoId: curso4.id, serie: '2º Ano', telefone: '(11) 99999-7783', telefonePai: '(11) 99999-8894', email: 'matheus.ferreira@email.com', dataNascimento: new Date('2001-11-02') },
      { nome: 'Natália Silva Pereira', rg: '56.789.012-3', cpf: '567.890.123-45', endereco: 'Av. Sete de Setembro, 3000 - Centro', cidadeId: todasCidades[29].id, cursoId: curso5.id, serie: '6º Semestre', telefone: '(11) 99999-9995', telefonePai: '(11) 99999-0006', email: 'natalia.pereira@email.com', dataNascimento: new Date('1999-03-19') },
    ],
  });

  // Buscar alunos criados para usar nos relacionamentos
  const todosAlunos = await prisma.aluno.findMany();
  const aluno1 = todosAlunos[0]; // Ana Carolina Silva
  const aluno2 = todosAlunos[1]; // Bruno Santos Oliveira
  const aluno3 = todosAlunos[2]; // Carlos Eduardo Lima
  const aluno4 = todosAlunos[3]; // Diana Ferreira Costa
  const aluno5 = todosAlunos[4]; // Eduardo Martins Pereira

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

  const empresa6 = await prisma.empresa.create({
    data: {
      nome: 'Microsoft Brasil Ltda',
      nomeFantasia: 'Microsoft',
      cnpj: '04.712.500/0001-07',
      endereco: 'Av. das Nações Unidas, 12901 - Brooklin',
      cidadeId: cidade1.id,
      telefone1: '(11) 5504-4000',
      email: 'estagio@microsoft.com',
      representante: 'Ana Paula Costa',
      cargoRepresentante: 'Gerente de Talentos',
    },
  });

  const empresa7 = await prisma.empresa.create({
    data: {
      nome: 'Google Brasil Internet Ltda',
      nomeFantasia: 'Google',
      cnpj: '06.990.590/0001-23',
      endereco: 'Av. Brigadeiro Faria Lima, 3729 - Itaim Bibi',
      cidadeId: cidade1.id,
      telefone1: '(11) 3372-3000',
      email: 'estagiarios@google.com',
      representante: 'Carlos Eduardo Silva',
      cargoRepresentante: 'Diretor de RH',
    },
  });

  const empresa8 = await prisma.empresa.create({
    data: {
      nome: 'Petróleo Brasileiro S.A.',
      nomeFantasia: 'Petrobras',
      cnpj: '33.000.167/0001-01',
      endereco: 'Av. República do Chile, 65 - Centro',
      cidadeId: cidade2.id,
      telefone1: '(21) 3224-1510',
      email: 'estagios@petrobras.com.br',
      representante: 'Roberto Machado',
      cargoRepresentante: 'Coordenador de Estágios',
    },
  });

  const empresa9 = await prisma.empresa.create({
    data: {
      nome: 'Banco do Brasil S.A.',
      nomeFantasia: 'Banco do Brasil',
      cnpj: '00.000.000/0001-91',
      endereco: 'SBS Quadra 1, Bloco C, Lote 32 - Asa Sul',
      cidadeId: cidade5.id,
      telefone1: '(61) 3493-9002',
      email: 'programaestagio@bb.com.br',
      representante: 'Fernanda Oliveira',
      cargoRepresentante: 'Gestora de Estágios',
    },
  });

  const empresa10 = await prisma.empresa.create({
    data: {
      nome: 'Itaú Unibanco S.A.',
      nomeFantasia: 'Itaú',
      cnpj: '60.701.190/0001-04',
      endereco: 'Praça Alfredo Egydio de Souza Aranha, 100 - Parque Jabaquara',
      cidadeId: cidade1.id,
      telefone1: '(11) 5019-1234',
      email: 'talentos@itau-unibanco.com.br',
      representante: 'Marina Santos',
      cargoRepresentante: 'Analista de Recursos Humanos',
    },
  });

  // Criar seguradoras
  console.log('🛡️ Criando seguradoras...');
  const seguradoras = await prisma.seguradora.createMany({
    data: [
      { nome: 'Seguradora Nacional de Estágios' },
      { nome: 'Estágio Seguro Ltda' },
      { nome: 'Proteção Estudantil S.A.' },
      { nome: 'Bradesco Seguros S.A.' },
      { nome: 'Porto Seguro S.A.' },
      { nome: 'SulAmérica S.A.' },
      { nome: 'Mapfre Seguros S.A.' },
      { nome: 'Tokio Marine Seguradora S.A.' },
      { nome: 'HDI Seguros S.A.' },
      { nome: 'Zurich Santander Seguros S.A.' },
      { nome: 'Liberty Seguros S.A.' },
      { nome: 'Allianz Seguros S.A.' },
      { nome: 'Sompo Seguros S.A.' },
      { nome: 'Generali Seguros S.A.' },
      { nome: 'Chubb Seguros Brasil S.A.' },
      { nome: 'Seguradora Líder dos Consórcios S.A.' },
      { nome: 'Caixa Seguradora S.A.' },
      { nome: 'Itaú Seguros S.A.' },
      { nome: 'Santander Seguros S.A.' },
      { nome: 'Banco do Brasil Seguros S.A.' },
    ],
  });

  // Buscar seguradoras criadas para usar nos relacionamentos
  const todasSeguradoras = await prisma.seguradora.findMany();
  const seguradora1 = todasSeguradoras[0]; // Seguradora Nacional de Estágios
  const seguradora2 = todasSeguradoras[1]; // Estágio Seguro Ltda
  const seguradora3 = todasSeguradoras[2]; // Proteção Estudantil S.A.

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

  const estagio6 = await prisma.estagio.create({
    data: {
      alunoId: todosAlunos[5].id,
      empresaId: empresa6.id,
      instituicaoId: instituicao1.id,
      tipo: 'Obrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-04-01'),
      dataTermino: new Date('2024-10-31'),
      cargaHorariaSemanal: 20,
      bolsaAuxilio: 1500.00,
      seguroApolice: 'EST-2024-006',
      seguradoraId: todasSeguradoras[3].id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-03-25'),
      possuiResponsavelMenor: false,
      cursoId: todosCursos[0].id,
    },
  });

  const estagio7 = await prisma.estagio.create({
    data: {
      alunoId: todosAlunos[6].id,
      empresaId: empresa7.id,
      instituicaoId: instituicao1.id,
      tipo: 'NaoObrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-05-15'),
      dataTermino: new Date('2024-11-15'),
      cargaHorariaSemanal: 25,
      bolsaAuxilio: 2000.00,
      seguroApolice: 'EST-2024-007',
      seguradoraId: todasSeguradoras[4].id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-05-10'),
      possuiResponsavelMenor: false,
      cursoId: todosCursos[1].id,
    },
  });

  const estagio8 = await prisma.estagio.create({
    data: {
      alunoId: todosAlunos[7].id,
      empresaId: empresa8.id,
      instituicaoId: instituicao2.id,
      tipo: 'Obrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-06-01'),
      dataTermino: new Date('2024-12-31'),
      cargaHorariaSemanal: 30,
      bolsaAuxilio: 1800.00,
      seguroApolice: 'EST-2024-008',
      seguradoraId: todasSeguradoras[5].id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-05-25'),
      possuiResponsavelMenor: false,
      cursoId: todosCursos[2].id,
    },
  });

  const estagio9 = await prisma.estagio.create({
    data: {
      alunoId: todosAlunos[8].id,
      empresaId: empresa9.id,
      instituicaoId: instituicao3.id,
      tipo: 'NaoObrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-07-15'),
      dataTermino: new Date('2025-01-15'),
      cargaHorariaSemanal: 20,
      bolsaAuxilio: 1400.00,
      seguroApolice: 'EST-2024-009',
      seguradoraId: todasSeguradoras[6].id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-07-10'),
      possuiResponsavelMenor: false,
      cursoId: todosCursos[4].id,
    },
  });

  const estagio10 = await prisma.estagio.create({
    data: {
      alunoId: todosAlunos[9].id,
      empresaId: empresa10.id,
      instituicaoId: instituicao1.id,
      tipo: 'Obrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-08-01'),
      dataTermino: new Date('2025-02-01'),
      cargaHorariaSemanal: 25,
      bolsaAuxilio: 1600.00,
      seguroApolice: 'EST-2024-010',
      seguradoraId: todasSeguradoras[7].id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-07-25'),
      possuiResponsavelMenor: false,
      cursoId: todosCursos[3].id,
    },
  });

  const estagio11 = await prisma.estagio.create({
    data: {
      alunoId: todosAlunos[30].id, // Isabella Rodrigues Alves
      empresaId: empresa1.id,
      instituicaoId: instituicao1.id,
      tipo: 'NaoObrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-09-01'),
      dataTermino: new Date('2025-03-01'),
      cargaHorariaSemanal: 20,
      bolsaAuxilio: 1200.00,
      seguroApolice: 'EST-2024-011',
      seguradoraId: todasSeguradoras[8].id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-08-25'),
      possuiResponsavelMenor: false,
      cursoId: todosCursos[0].id,
    },
  });

  const estagio12 = await prisma.estagio.create({
    data: {
      alunoId: todosAlunos[31].id, // João Pedro Santos Lima
      empresaId: empresa2.id,
      instituicaoId: instituicao2.id,
      tipo: 'Obrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-10-15'),
      dataTermino: new Date('2025-04-15'),
      cargaHorariaSemanal: 30,
      bolsaAuxilio: 1800.00,
      seguroApolice: 'EST-2024-012',
      seguradoraId: todasSeguradoras[9].id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-10-10'),
      possuiResponsavelMenor: false,
      cursoId: todosCursos[1].id,
    },
  });

  const estagio13 = await prisma.estagio.create({
    data: {
      alunoId: todosAlunos[32].id, // Larissa Costa Mendes
      empresaId: empresa3.id,
      instituicaoId: instituicao3.id,
      tipo: 'NaoObrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2024-11-01'),
      dataTermino: new Date('2025-05-01'),
      cargaHorariaSemanal: 25,
      bolsaAuxilio: 1500.00,
      seguroApolice: 'EST-2024-013',
      seguradoraId: todasSeguradoras[10].id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-10-25'),
      possuiResponsavelMenor: false,
      cursoId: todosCursos[2].id,
    },
  });

  const estagio14 = await prisma.estagio.create({
    data: {
      alunoId: todosAlunos[33].id, // Matheus Oliveira Ferreira
      empresaId: empresa4.id,
      instituicaoId: instituicao1.id,
      tipo: 'Obrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Técnico',
      dataInicio: new Date('2024-12-01'),
      dataTermino: new Date('2025-06-01'),
      cargaHorariaSemanal: 20,
      bolsaAuxilio: 800.00,
      seguroApolice: 'EST-2024-014',
      seguradoraId: todasSeguradoras[11].id,
      status: 'Ativo',
      dataAssinatura: new Date('2024-11-25'),
      possuiResponsavelMenor: true,
      cursoId: todosCursos[3].id,
    },
  });

  const estagio15 = await prisma.estagio.create({
    data: {
      alunoId: todosAlunos[34].id, // Natália Silva Pereira
      empresaId: empresa5.id,
      instituicaoId: instituicao2.id,
      tipo: 'NaoObrigatorio',
      remunerado: true,
      origemInstituicao: 'Curso Superior',
      dataInicio: new Date('2025-01-15'),
      dataTermino: new Date('2025-07-15'),
      cargaHorariaSemanal: 25,
      bolsaAuxilio: 1400.00,
      seguroApolice: 'EST-2025-015',
      seguradoraId: todasSeguradoras[12].id,
      status: 'Ativo',
      dataAssinatura: new Date('2025-01-10'),
      possuiResponsavelMenor: false,
      cursoId: todosCursos[4].id,
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
      // Estágio 4 - Segunda a Quinta, 13h às 17h
      {
        estagioId: estagio4.id,
        diaSemana: 'Segunda',
        horarioInicio: new Date('2024-01-15T13:00:00'),
        horarioFim: new Date('2024-01-15T17:00:00'),
      },
      {
        estagioId: estagio4.id,
        diaSemana: 'Terca',
        horarioInicio: new Date('2024-01-15T13:00:00'),
        horarioFim: new Date('2024-01-15T17:00:00'),
      },
      {
        estagioId: estagio4.id,
        diaSemana: 'Quarta',
        horarioInicio: new Date('2024-01-15T13:00:00'),
        horarioFim: new Date('2024-01-15T17:00:00'),
      },
      {
        estagioId: estagio4.id,
        diaSemana: 'Quinta',
        horarioInicio: new Date('2024-01-15T13:00:00'),
        horarioFim: new Date('2024-01-15T17:00:00'),
      },
      // Estágio 5 - Segunda, Quarta e Sexta, 10h às 16h
      {
        estagioId: estagio5.id,
        diaSemana: 'Segunda',
        horarioInicio: new Date('2024-01-15T10:00:00'),
        horarioFim: new Date('2024-01-15T16:00:00'),
      },
      {
        estagioId: estagio5.id,
        diaSemana: 'Quarta',
        horarioInicio: new Date('2024-01-15T10:00:00'),
        horarioFim: new Date('2024-01-15T16:00:00'),
      },
      {
        estagioId: estagio5.id,
        diaSemana: 'Sexta',
        horarioInicio: new Date('2024-01-15T10:00:00'),
        horarioFim: new Date('2024-01-15T16:00:00'),
      },
      // Estágio 6 - Terça e Quinta, 8h às 12h
      {
        estagioId: estagio6.id,
        diaSemana: 'Terca',
        horarioInicio: new Date('2024-01-15T08:00:00'),
        horarioFim: new Date('2024-01-15T12:00:00'),
      },
      {
        estagioId: estagio6.id,
        diaSemana: 'Quinta',
        horarioInicio: new Date('2024-01-15T08:00:00'),
        horarioFim: new Date('2024-01-15T12:00:00'),
      },
      // Estágio 7 - Segunda a Sexta, 14h às 18h
      {
        estagioId: estagio7.id,
        diaSemana: 'Segunda',
        horarioInicio: new Date('2024-01-15T14:00:00'),
        horarioFim: new Date('2024-01-15T18:00:00'),
      },
      {
        estagioId: estagio7.id,
        diaSemana: 'Terca',
        horarioInicio: new Date('2024-01-15T14:00:00'),
        horarioFim: new Date('2024-01-15T18:00:00'),
      },
      {
        estagioId: estagio7.id,
        diaSemana: 'Quarta',
        horarioInicio: new Date('2024-01-15T14:00:00'),
        horarioFim: new Date('2024-01-15T18:00:00'),
      },
      {
        estagioId: estagio7.id,
        diaSemana: 'Quinta',
        horarioInicio: new Date('2024-01-15T14:00:00'),
        horarioFim: new Date('2024-01-15T18:00:00'),
      },
      {
        estagioId: estagio7.id,
        diaSemana: 'Sexta',
        horarioInicio: new Date('2024-01-15T14:00:00'),
        horarioFim: new Date('2024-01-15T18:00:00'),
      },
      // Estágio 8 - Segunda, Quarta e Sexta, 9h às 15h
      {
        estagioId: estagio8.id,
        diaSemana: 'Segunda',
        horarioInicio: new Date('2024-01-15T09:00:00'),
        horarioFim: new Date('2024-01-15T15:00:00'),
      },
      {
        estagioId: estagio8.id,
        diaSemana: 'Quarta',
        horarioInicio: new Date('2024-01-15T09:00:00'),
        horarioFim: new Date('2024-01-15T15:00:00'),
      },
      {
        estagioId: estagio8.id,
        diaSemana: 'Sexta',
        horarioInicio: new Date('2024-01-15T09:00:00'),
        horarioFim: new Date('2024-01-15T15:00:00'),
      },
      // Estágio 9 - Terça e Quinta, 13h às 17h
      {
        estagioId: estagio9.id,
        diaSemana: 'Terca',
        horarioInicio: new Date('2024-01-15T13:00:00'),
        horarioFim: new Date('2024-01-15T17:00:00'),
      },
      {
        estagioId: estagio9.id,
        diaSemana: 'Quinta',
        horarioInicio: new Date('2024-01-15T13:00:00'),
        horarioFim: new Date('2024-01-15T17:00:00'),
      },
      // Estágio 10 - Segunda a Quinta, 8h às 13h
      {
        estagioId: estagio10.id,
        diaSemana: 'Segunda',
        horarioInicio: new Date('2024-01-15T08:00:00'),
        horarioFim: new Date('2024-01-15T13:00:00'),
      },
      {
        estagioId: estagio10.id,
        diaSemana: 'Terca',
        horarioInicio: new Date('2024-01-15T08:00:00'),
        horarioFim: new Date('2024-01-15T13:00:00'),
      },
      {
        estagioId: estagio10.id,
        diaSemana: 'Quarta',
        horarioInicio: new Date('2024-01-15T08:00:00'),
        horarioFim: new Date('2024-01-15T13:00:00'),
      },
      {
        estagioId: estagio10.id,
        diaSemana: 'Quinta',
        horarioInicio: new Date('2024-01-15T08:00:00'),
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
      // Relatórios para os novos estágios
      {
        estagioId: estagio4.id,
        tipo: 'Inicial',
        prazoEntrega: new Date('2024-04-01'),
        dataEntregue: new Date('2024-03-28'),
        observacao: 'Relatório inicial entregue',
      },
      {
        estagioId: estagio4.id,
        tipo: 'Parcial',
        prazoEntrega: new Date('2024-08-01'),
        observacao: 'Aguardando entrega',
      },
      {
        estagioId: estagio5.id,
        tipo: 'Inicial',
        prazoEntrega: new Date('2024-02-01'),
        dataEntregue: new Date('2024-01-25'),
        observacao: 'Relatório inicial entregue',
      },
      {
        estagioId: estagio6.id,
        tipo: 'Inicial',
        prazoEntrega: new Date('2024-05-01'),
        dataEntregue: new Date('2024-04-28'),
        observacao: 'Relatório inicial entregue',
      },
      {
        estagioId: estagio6.id,
        tipo: 'Parcial',
        prazoEntrega: new Date('2024-08-01'),
        observacao: 'Aguardando entrega',
      },
      {
        estagioId: estagio7.id,
        tipo: 'Inicial',
        prazoEntrega: new Date('2024-06-15'),
        dataEntregue: new Date('2024-06-10'),
        observacao: 'Relatório inicial entregue',
      },
      {
        estagioId: estagio8.id,
        tipo: 'Inicial',
        prazoEntrega: new Date('2024-07-01'),
        dataEntregue: new Date('2024-06-28'),
        observacao: 'Relatório inicial entregue',
      },
      {
        estagioId: estagio8.id,
        tipo: 'Parcial',
        prazoEntrega: new Date('2024-10-01'),
        observacao: 'Aguardando entrega',
      },
      {
        estagioId: estagio9.id,
        tipo: 'Inicial',
        prazoEntrega: new Date('2024-08-15'),
        dataEntregue: new Date('2024-08-10'),
        observacao: 'Relatório inicial entregue',
      },
      {
        estagioId: estagio10.id,
        tipo: 'Inicial',
        prazoEntrega: new Date('2024-09-01'),
        dataEntregue: new Date('2024-08-28'),
        observacao: 'Relatório inicial entregue',
      },
      {
        estagioId: estagio10.id,
        tipo: 'Parcial',
        prazoEntrega: new Date('2024-12-01'),
        observacao: 'Aguardando entrega',
      },
    ],
  });

  // Criar motivos de encerramento
  console.log('📝 Criando motivos de encerramento...');
  await prisma.motivoEncerramentoEstagio.createMany({
    data: [
      {
      estagioId: estagio5.id,
      motivoPrincipal: 'Conclusão do curso',
      motivosEmpresa: 'Reestruturação organizacional',
      motivosEmpresaOutros: 'Mudança de foco estratégico da empresa',
    },
      {
        estagioId: estagio2.id,
        motivoPrincipal: 'Desistência do estagiário',
        motivosEmpresa: 'Não se aplica',
        motivosEmpresaOutros: 'Estagiário optou por focar nos estudos',
      },
      {
        estagioId: estagio4.id,
        motivoPrincipal: 'Conclusão do estágio',
        motivosEmpresa: 'Não se aplica',
        motivosEmpresaOutros: 'Estágio concluído com sucesso',
      },
      {
        estagioId: estagio6.id,
        motivoPrincipal: 'Transferência de curso',
        motivosEmpresa: 'Não se aplica',
        motivosEmpresaOutros: 'Aluno transferiu para outro curso',
      },
      {
        estagioId: estagio8.id,
        motivoPrincipal: 'Problemas de desempenho',
        motivosEmpresa: 'Não se aplica',
        motivosEmpresaOutros: 'Dificuldades de adaptação ao ambiente de trabalho',
      },
      {
        estagioId: estagio9.id,
        motivoPrincipal: 'Conclusão do curso',
        motivosEmpresa: 'Não se aplica',
        motivosEmpresaOutros: 'Estágio finalizado com aproveitamento',
      },
      {
        estagioId: estagio10.id,
        motivoPrincipal: 'Desistência do estagiário',
        motivosEmpresa: 'Não se aplica',
        motivosEmpresaOutros: 'Estagiário optou por mudança de área',
      },
    ],
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
