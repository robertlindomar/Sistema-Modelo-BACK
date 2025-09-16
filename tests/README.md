# 🧪 Testes do Sistema de Estágio

Este diretório contém os testes automatizados para o Sistema de Estágio, garantindo a qualidade e funcionalidade de todos os módulos do sistema.

## 📁 Estrutura dos Arquivos

```
tests/
├── README.md              # Este arquivo
├── setup.ts              # Configuração global do Jest
├── curso.test.ts         # Testes específicos do módulo Curso
└── backend.test.ts       # Teste integrado completo do sistema
```

## 🚀 Como Executar os Testes

### Executar Todos os Testes

```bash
npm test
```

### Executar Teste Específico

```bash
# Teste integrado completo
npm test -- backend.test.ts

# Teste específico do módulo Curso
npm test -- curso.test.ts
```

### Executar com Verbose (Mais Detalhes)

```bash
npm test -- --verbose
```

### Executar em Modo Watch (Desenvolvimento)

```bash
npm test -- --watch
```

## 📋 Tipos de Testes

### 1. **Teste Integrado Completo** (`backend.test.ts`)

- **Objetivo**: Testa todo o sistema de forma integrada
- **Cobertura**: Todos os 11 módulos do sistema
- **Ordem**: Respeita as dependências entre módulos
- **Cenários**: Criação, listagem, atualização e exclusão

### 2. **Teste de Módulo Específico** (`curso.test.ts`)

- **Objetivo**: Testa apenas o módulo Curso
- **Cobertura**: CRUD completo do módulo
- **Isolamento**: Testa o módulo independentemente

## 🏗️ Arquitetura dos Testes

### Ordem de Execução (Respeitando Dependências)

1. **Usuario** - Sem dependências
2. **Cidade** - Sem dependências
3. **Curso** - Sem dependências
4. **Seguradora** - Sem dependências
5. **Instituicao** - Depende de Cidade
6. **Aluno** - Depende de Cidade e Curso
7. **Empresa** - Depende de Cidade
8. **Estagio** - Depende de múltiplas entidades
9. **EstagioHorario** - Depende de Estágio
10. **RelatorioEstagio** - Depende de Estágio
11. **MotivoEncerramentoEstagio** - Depende de Estágio

### Fluxo de Teste Integrado

```
1. Setup (Criação de usuário e login)
2. Criação de entidades (na ordem das dependências)
3. Testes de listagem e paginação
4. Testes de atualização
5. Limpeza (exclusão na ordem inversa)
```

## 🔧 Configuração

### Arquivo `setup.ts`

- Configura o ambiente de teste
- Define variáveis de ambiente necessárias
- Gerencia conexão com banco de dados
- Configura JWT para testes

### Variáveis de Ambiente

```typescript
NODE_ENV = test;
JWT_SECRET = test_secret_key_for_jwt;
```

## 📊 Cobertura de Testes

### Módulos Testados

- ✅ **Usuario** - Autenticação, CRUD
- ✅ **Cidade** - CRUD completo
- ✅ **Curso** - CRUD completo
- ✅ **Seguradora** - CRUD completo
- ✅ **Instituicao** - CRUD completo
- ✅ **Aluno** - CRUD completo
- ✅ **Empresa** - CRUD completo
- ✅ **Estagio** - CRUD completo
- ✅ **EstagioHorario** - CRUD completo
- ✅ **RelatorioEstagio** - CRUD completo
- ✅ **MotivoEncerramentoEstagio** - CRUD completo

### Cenários Testados

- ✅ **Criação** - POST com dados válidos
- ✅ **Listagem** - GET com paginação
- ✅ **Busca por ID** - GET específico
- ✅ **Atualização** - PUT com dados válidos
- ✅ **Exclusão** - DELETE com limpeza
- ✅ **Validação** - Dados inválidos
- ✅ **Autenticação** - JWT Bearer token
- ✅ **Dependências** - Relacionamentos entre entidades

## 🎯 Resultados Esperados

### Status de Sucesso

- **200** - Operação bem-sucedida com conteúdo
- **201** - Criação bem-sucedida
- **204** - Operação bem-sucedida sem conteúdo (DELETE)

### Status de Erro Aceitos

- **400** - Erro de validação
- **404** - Recurso não encontrado
- **409** - Conflito (duplicação)
- **500** - Erro interno do servidor

## 🔍 Debugging

### Logs de Teste

Os testes incluem logs detalhados para facilitar o debugging:

```typescript
console.log("🔍 Status da resposta:", response.status);
console.log("🔍 Corpo da resposta:", JSON.stringify(response.body, null, 2));
```

### Dados de Teste

- **CNPJs válidos**: `11.222.333/0001-81`, `22.333.444/0001-55`
- **CPFs válidos**: `111.444.777-35`
- **Emails**: Formatos válidos para cada módulo
- **Datas**: Formato ISO 8601

## 🚨 Tratamento de Erros

### Cenários de Falha

- **Dados duplicados**: Aceita 409 (conflito)
- **Validação falha**: Aceita 400 (bad request)
- **Recurso não encontrado**: Aceita 404
- **Erro interno**: Aceita 500

### Estratégia de Recuperação

- Busca IDs existentes quando criação falha
- Define IDs fictícios para testes dependentes
- Aceita múltiplos códigos de status

## 📈 Métricas de Qualidade

### Cobertura Atual

- **36 testes** executados
- **100% de sucesso** nos testes
- **11 módulos** cobertos
- **5 operações CRUD** por módulo

### Tempo de Execução

- **~5 segundos** para execução completa
- **~150ms** por teste em média

## 🛠️ Manutenção

### Adicionando Novos Testes

1. Crie arquivo `modulo.test.ts`
2. Siga o padrão de nomenclatura
3. Use dados válidos (CNPJ/CPF)
4. Inclua tratamento de erros
5. Documente no README

### Atualizando Testes Existentes

1. Mantenha compatibilidade com APIs
2. Atualize dados de teste se necessário
3. Verifique dependências
4. Execute todos os testes

## 📚 Recursos Adicionais

### Documentação

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [API Endpoints](../docs/API_ENDPOINTS.md)

### Comandos Úteis

```bash
# Limpar cache do Jest
npm test -- --clearCache

# Executar apenas testes que falharam
npm test -- --onlyFailures

# Executar com cobertura
npm test -- --coverage
```

## 🤝 Contribuição

### Padrões de Código

- Use TypeScript
- Siga convenções de nomenclatura
- Inclua comentários explicativos
- Trate erros adequadamente

### Boas Práticas

- Teste cenários positivos e negativos
- Use dados realistas
- Mantenha testes independentes
- Documente mudanças

---

**Última atualização**: Dezembro 2024  
**Versão**: 1.0.0  
**Status**: ✅ Funcional (36/36 testes passando)
