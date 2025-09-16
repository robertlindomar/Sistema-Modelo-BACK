# 📮 Guia do Postman - Sistema de Estágio

## 📋 Visão Geral

Este guia explica como usar a collection do Postman para testar a API do Sistema de Estágio de forma eficiente e organizada.

## 🚀 Configuração Inicial

### 1. Importar a Collection

1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo: `docs/postman/Sistema-Estagio-API-Complete.postman_collection.json`
4. Clique em **Import**

### 2. Importar o Ambiente

1. Clique em **Import**
2. Selecione o arquivo: `docs/postman/Sistema-Estagio-Environment.postman_environment.json`
3. Clique em **Import**

### 3. Configurar o Ambiente

1. No canto superior direito, selecione o ambiente **"Sistema Estágio - Ambiente"**
2. Verifique se a variável `base_url` está configurada para `http://localhost:3000`

## 🔧 Variáveis de Ambiente

A collection utiliza as seguintes variáveis:

| Variável         | Descrição                 | Exemplo                   |
| ---------------- | ------------------------- | ------------------------- |
| `base_url`       | URL base da API           | `http://localhost:3000`   |
| `token`          | Token JWT de autenticação | `eyJhbGciOiJIUzI1NiIs...` |
| `user_id`        | ID do usuário logado      | `1`                       |
| `cidade_id`      | ID da cidade criada       | `1`                       |
| `curso_id`       | ID do curso criado        | `1`                       |
| `empresa_id`     | ID da empresa criada      | `1`                       |
| `instituicao_id` | ID da instituição criada  | `1`                       |
| `seguradora_id`  | ID da seguradora criada   | `1`                       |
| `aluno_id`       | ID do aluno criado        | `1`                       |
| `estagio_id`     | ID do estágio criado      | `1`                       |

## 🔐 Fluxo de Autenticação

### 1. Criar Usuário

1. Execute a requisição **"Criar Usuário"** em `🔐 Autenticação`
2. O `user_id` será automaticamente salvo nas variáveis

### 2. Fazer Login

1. Execute a requisição **"Login"** em `🔐 Autenticação`
2. O `token` será automaticamente salvo nas variáveis
3. Agora você pode acessar todas as rotas protegidas

## 📊 Estrutura da Collection

### 🔐 Autenticação

- **Criar Usuário** - Cria um novo usuário no sistema
- **Login** - Autentica e retorna token JWT

### 👤 Usuários

- **Listar Usuários** - Lista usuários com paginação
- **Buscar Usuário por ID** - Busca usuário específico
- **Atualizar Usuário** - Atualiza dados do usuário
- **Trocar Senha** - Altera senha do usuário

### 🏙️ Cidades

- **Criar Cidade** - Cria nova cidade
- **Listar Cidades** - Lista cidades com paginação
- **Buscar Cidade por ID** - Busca cidade específica
- **Buscar Cidade por Nome** - Busca cidade pelo nome
- **Buscar Cidades por UF** - Busca cidades por estado
- **Atualizar Cidade** - Atualiza dados da cidade

### 🎓 Cursos

- **Criar Curso** - Cria novo curso
- **Listar Cursos** - Lista cursos com paginação
- **Buscar Curso por ID** - Busca curso específico
- **Atualizar Curso** - Atualiza dados do curso

### 🏢 Empresas

- **Criar Empresa** - Cria nova empresa
- **Listar Empresas** - Lista empresas com paginação
- **Buscar Empresa por ID** - Busca empresa específica
- **Atualizar Empresa** - Atualiza dados da empresa

### 🏛️ Instituições

- **Criar Instituição** - Cria nova instituição
- **Listar Instituições** - Lista instituições com paginação
- **Buscar Instituição por ID** - Busca instituição específica
- **Atualizar Instituição** - Atualiza dados da instituição

### 🛡️ Seguradoras

- **Criar Seguradora** - Cria nova seguradora
- **Listar Seguradoras** - Lista seguradoras com paginação
- **Buscar Seguradora por ID** - Busca seguradora específica
- **Atualizar Seguradora** - Atualiza dados da seguradora

### 👨‍🎓 Alunos

- **Criar Aluno** - Cria novo aluno
- **Listar Alunos** - Lista alunos com paginação
- **Buscar Aluno por ID** - Busca aluno específico
- **Atualizar Aluno** - Atualiza dados do aluno

### 📋 Estágios

- **Criar Estágio** - Cria novo estágio
- **Listar Estágios** - Lista estágios com paginação
- **Buscar Estágio por ID** - Busca estágio específico
- **Buscar Estágios por Status** - Busca estágios por status
- **Atualizar Estágio** - Atualiza dados do estágio

### 🧪 Testes Automatizados

- **Teste Completo - Fluxo Principal** - Executa fluxo completo de testes

## 🎯 Fluxo Recomendado de Testes

### 1. Configuração Inicial

```
1. Criar Usuário
2. Login
```

### 2. Dados Base

```
3. Criar Cidade
4. Criar Curso
5. Criar Empresa
6. Criar Instituição
7. Criar Seguradora
```

### 3. Dados Principais

```
8. Criar Aluno
9. Criar Estágio
```

### 4. Testes de Consulta

```
10. Listar todos os módulos
11. Buscar por IDs
12. Testar paginação
```

### 5. Testes de Atualização

```
13. Atualizar todos os registros criados
14. Testar validações
```

## 🔄 Automação de Testes

### Scripts de Teste

Cada requisição possui scripts de teste que:

1. **Verificam o status da resposta**
2. **Salvam IDs automaticamente** nas variáveis
3. **Validam a estrutura da resposta**
4. **Testam cenários de erro**

### Exemplo de Script de Teste

```javascript
// Verificar se a resposta foi bem-sucedida
pm.test("Status code is successful", function () {
  pm.expect(pm.response.code).to.be.oneOf([200, 201, 204]);
});

// Salvar ID se criado com sucesso
if (pm.response.code === 201) {
  const response = pm.response.json();
  pm.collectionVariables.set("cidade_id", response.id);
}
```

## 📊 Monitoramento de Testes

### Collection Runner

1. Clique em **Collections** no menu lateral
2. Clique nos três pontos da collection
3. Selecione **Run collection**
4. Configure os parâmetros:
   - **Environment**: Sistema Estágio - Ambiente
   - **Iterations**: 1
   - **Delay**: 1000ms
5. Clique em **Run Sistema Estágio API - Completa**

### Relatórios de Teste

O Collection Runner gera relatórios mostrando:

- ✅ Testes que passaram
- ❌ Testes que falharam
- 📊 Estatísticas de performance
- 📝 Logs detalhados

## 🚨 Tratamento de Erros

### Códigos de Status Esperados

| Código | Descrição             | Quando Ocorre              |
| ------ | --------------------- | -------------------------- |
| 200    | OK                    | Operação bem-sucedida      |
| 201    | Created               | Recurso criado com sucesso |
| 400    | Bad Request           | Dados inválidos            |
| 401    | Unauthorized          | Token inválido ou ausente  |
| 404    | Not Found             | Recurso não encontrado     |
| 409    | Conflict              | Conflito (ex: duplicação)  |
| 500    | Internal Server Error | Erro interno do servidor   |

### Estrutura de Erro

```json
{
  "errors": ["Nome é obrigatório", "Email deve ter formato válido"]
}
```

## 🔧 Dicas e Truques

### 1. Variáveis Dinâmicas

Use variáveis para tornar os testes mais flexíveis:

```javascript
// No body da requisição
{
  "cidadeId": {{cidade_id}},
  "cursoId": {{curso_id}}
}
```

### 2. Testes Condicionais

```javascript
// Testar apenas se a resposta foi bem-sucedida
if (pm.response.code === 200) {
  pm.test("Response has required fields", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property("id");
    pm.expect(response).to.have.property("nome");
  });
}
```

### 3. Validação de Tipos

```javascript
pm.test("Response is an array", function () {
  const response = pm.response.json();
  pm.expect(response.data).to.be.an("array");
});
```

### 4. Testes de Paginação

```javascript
pm.test("Pagination metadata is correct", function () {
  const response = pm.response.json();
  pm.expect(response.pagination).to.have.property("page");
  pm.expect(response.pagination).to.have.property("limit");
  pm.expect(response.pagination).to.have.property("total");
  pm.expect(response.pagination).to.have.property("totalPages");
});
```

## 📚 Recursos Adicionais

### Documentação

- [Postman Learning Center](https://learning.postman.com/)
- [Postman API Documentation](https://documenter.postman.com/)
- [Collection Runner Guide](https://learning.postman.com/docs/running-collections/intro-to-collection-runs/)

### Comandos Úteis

```bash
# Iniciar servidor para testes
npm run dev

# Executar testes automatizados
npm test

# Verificar logs do servidor
npm run dev | grep -E "(error|Error|ERROR)"
```

## 🎯 Próximos Passos

1. **Testes de Performance**: Adicionar testes de carga
2. **Testes de Segurança**: Validar vulnerabilidades
3. **Testes de Integração**: Testar fluxos completos
4. **Monitoramento**: Configurar alertas automáticos
5. **CI/CD**: Integrar com pipelines de deploy

## 📞 Suporte

Para dúvidas sobre o Postman:

- 📧 Email: suporte@sistemaestagio.com
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/sistema-estagio/issues)
- 📖 Documentação: [Wiki do Projeto](https://github.com/seu-usuario/sistema-estagio/wiki)
