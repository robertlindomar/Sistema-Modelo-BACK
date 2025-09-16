# 🧪 Documentação de Testes - Sistema de Estágio

## 📋 Visão Geral

Esta documentação descreve a estrutura de testes automatizados do Sistema de Estágio, incluindo testes unitários, de integração e de API.

## 🏗️ Estrutura de Testes

```
tests/
├── setup.ts              # Configuração global dos testes
├── auth.test.ts          # Testes de autenticação
├── cidade.test.ts        # Testes do módulo Cidade
├── aluno.test.ts         # Testes do módulo Aluno
├── empresa.test.ts       # Testes do módulo Empresa
├── curso.test.ts         # Testes do módulo Curso
├── instituicao.test.ts   # Testes do módulo Instituição
├── seguradora.test.ts    # Testes do módulo Seguradora
├── estagio.test.ts       # Testes do módulo Estágio
└── integration.test.ts   # Testes de integração completos
```

## 🚀 Como Executar os Testes

### Instalação das Dependências

```bash
npm install
```

### Executar Todos os Testes

```bash
npm test
```

### Executar Testes em Modo Watch

```bash
npm run test:watch
```

### Executar Testes com Cobertura

```bash
npm run test:coverage
```

### Executar Testes Específicos

```bash
# Testes de autenticação
npm test -- auth.test.ts

# Testes de cidade
npm test -- cidade.test.ts

# Testes de aluno
npm test -- aluno.test.ts
```

## 📊 Cobertura de Testes

Os testes cobrem:

- ✅ **Autenticação**: Login, criação de usuário, troca de senha
- ✅ **CRUD Completo**: Criação, leitura, atualização, exclusão
- ✅ **Validações**: Dados inválidos, campos obrigatórios
- ✅ **Paginação**: Listagem com parâmetros de paginação
- ✅ **Relacionamentos**: Testes com dados relacionados
- ✅ **Tratamento de Erros**: Códigos de status e mensagens
- ✅ **Segurança**: Autenticação JWT, autorização

## 🔧 Configuração dos Testes

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testTimeout: 30000,
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
```

### Setup Global

```typescript
// tests/setup.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET = "test_secret_key_for_jwt";
});

afterAll(async () => {
  await prisma.$disconnect();
});
```

## 📝 Exemplos de Testes

### Teste de Autenticação

```typescript
describe("🔐 Autenticação", () => {
  describe("POST /usuario/login", () => {
    it("deve fazer login com credenciais válidas", async () => {
      const response = await request(app).post("/usuario/login").send({
        email: "teste@teste.com",
        senha: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
    });
  });
});
```

### Teste de CRUD

```typescript
describe("🏙️ Cidades", () => {
  describe("POST /cidade", () => {
    it("deve criar uma nova cidade", async () => {
      const response = await request(app)
        .post("/cidade")
        .set("Authorization", `Bearer ${token}`)
        .send({
          nome: "São Paulo",
          uf: "SP",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("nome", "São Paulo");
      expect(response.body).toHaveProperty("uf", "SP");
    });
  });
});
```

### Teste de Validação

```typescript
describe("Validações", () => {
  it("deve retornar erro para dados inválidos", async () => {
    const response = await request(app)
      .post("/cidade")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "",
        uf: "INVALID",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });
});
```

### Teste de Paginação

```typescript
describe("Paginação", () => {
  it("deve listar com paginação", async () => {
    const response = await request(app)
      .get("/cidade?page=1&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("pagination");
    expect(response.body.pagination).toHaveProperty("page", 1);
    expect(response.body.pagination).toHaveProperty("limit", 10);
  });
});
```

## 🎯 Cenários de Teste

### 1. Fluxo Completo de Autenticação

1. ✅ Criar usuário
2. ✅ Fazer login
3. ✅ Usar token para acessar rotas protegidas
4. ✅ Trocar senha
5. ✅ Fazer login com nova senha

### 2. Fluxo Completo de CRUD

1. ✅ Criar registro
2. ✅ Listar registros (com paginação)
3. ✅ Buscar por ID
4. ✅ Atualizar registro
5. ✅ Validar atualização

### 3. Cenários de Erro

1. ✅ Dados inválidos
2. ✅ Campos obrigatórios ausentes
3. ✅ Registros duplicados
4. ✅ IDs inexistentes
5. ✅ Autenticação inválida

### 4. Relacionamentos

1. ✅ Criar cidade
2. ✅ Criar curso
3. ✅ Criar aluno vinculado à cidade e curso
4. ✅ Validar relacionamentos na resposta

## 📊 Métricas de Qualidade

### Cobertura de Código

- **Mínimo**: 80%
- **Ideal**: 90%+
- **Arquivos excluídos**: server.ts, prisma/index.ts

### Tipos de Teste

- **Unitários**: Funções isoladas
- **Integração**: Módulos interagindo
- **API**: Endpoints completos
- **E2E**: Fluxos completos

## 🚨 Tratamento de Erros nos Testes

### Códigos de Status Esperados

- `200` - Sucesso
- `201` - Criado
- `400` - Dados inválidos
- `401` - Não autenticado
- `404` - Não encontrado
- `409` - Conflito (duplicação)

### Estrutura de Erro

```json
{
  "errors": ["Nome é obrigatório", "Email deve ter formato válido"]
}
```

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## 📚 Recursos Adicionais

### Documentação

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

### Comandos Úteis

```bash
# Executar testes em modo debug
npm test -- --verbose

# Executar testes específicos por padrão
npm test -- --testNamePattern="deve criar"

# Executar testes com relatório detalhado
npm test -- --coverage --verbose

# Limpar cache do Jest
npm test -- --clearCache
```

## 🎯 Próximos Passos

1. **Testes de Performance**: Adicionar testes de carga
2. **Testes de Segurança**: Testes de vulnerabilidades
3. **Testes de Acessibilidade**: Validação de acessibilidade
4. **Testes de Compatibilidade**: Diferentes versões do Node.js
5. **Testes de Integração**: Com banco de dados real

## 📞 Suporte

Para dúvidas sobre os testes:

- 📧 Email: suporte@sistemaestagio.com
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/sistema-estagio/issues)
- 📖 Documentação: [Wiki do Projeto](https://github.com/seu-usuario/sistema-estagio/wiki)
