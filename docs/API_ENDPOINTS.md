# Documentação dos Endpoints da API

## 📋 Visão Geral

Esta documentação detalha todos os endpoints disponíveis na API do Sistema de Estágio, incluindo parâmetros, exemplos de requisição e resposta.

## 🔐 Autenticação

Todas as rotas (exceto login e criação de usuário) requerem autenticação JWT.

**Header obrigatório:**

```
Authorization: Bearer <token>
```

## 📊 Paginação

Todos os endpoints de listagem suportam paginação:

**Parâmetros:**

- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10, máximo: 100)

**Exemplo:**

```
GET /aluno?page=2&limit=20
```

## 🚦 Códigos de Status

- `200` - Sucesso
- `201` - Criado com sucesso
- `204` - Deletado com sucesso
- `400` - Dados inválidos
- `401` - Não autenticado
- `404` - Não encontrado
- `409` - Conflito (duplicação)
- `500` - Erro interno do servidor

---

## 👤 Usuários

### POST /usuario

Criar novo usuário.

**Body:**

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Resposta (201):**

```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### POST /usuario/login

Fazer login.

**Body:**

```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Resposta (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /usuario

Listar usuários com paginação.

**Resposta (200):**

```json
{
  "data": [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### GET /usuario/:id

Buscar usuário por ID.

**Resposta (200):**

```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### PUT /usuario/:id

Atualizar usuário.

**Body:**

```json
{
  "nome": "João Silva Santos"
}
```

### PUT /usuario/:id/trocar-senha

Trocar senha do usuário.

**Body:**

```json
{
  "senhaAtual": "123456",
  "novaSenha": "654321"
}
```

---

## 🏙️ Cidades

### POST /cidade

Criar nova cidade.

**Body:**

```json
{
  "nome": "São Paulo",
  "uf": "SP"
}
```

### GET /cidade

Listar cidades com paginação.

### GET /cidade/:id

Buscar cidade por ID.

### GET /cidade/nome/:nome

Buscar cidade por nome.

### GET /cidade/uf/:uf

Buscar cidades por UF.

### PUT /cidade/:id

Atualizar cidade.

### DELETE /cidade/:id

Deletar cidade.

---

## 🎓 Cursos

### POST /curso

Criar novo curso.

**Body:**

```json
{
  "nome": "Ciência da Computação",
  "habilitacao": "Bacharelado",
  "nivel": "Superior"
}
```

### GET /curso

Listar cursos com paginação.

### GET /curso/:id

Buscar curso por ID.

### PUT /curso/:id

Atualizar curso.

### DELETE /curso/:id

Deletar curso.

---

## 🏢 Empresas

### POST /empresa

Criar nova empresa.

**Body:**

```json
{
  "nome": "Tech Solutions LTDA",
  "nomeFantasia": "TechSol",
  "cnpj": "12.345.678/0001-90",
  "endereco": "Rua das Flores, 123",
  "cidadeId": 1,
  "telefone1": "(11) 99999-9999",
  "email": "contato@techsol.com",
  "representante": "João Silva",
  "cargoRepresentante": "Diretor"
}
```

### GET /empresa

Listar empresas com paginação.

### GET /empresa/:id

Buscar empresa por ID.

### PUT /empresa/:id

Atualizar empresa.

### DELETE /empresa/:id

Deletar empresa.

---

## 🏛️ Instituições

### POST /instituicao

Criar nova instituição.

**Body:**

```json
{
  "nome": "Universidade Federal de São Paulo",
  "nomeFantasia": "UNIFESP",
  "cnpj": "12.345.678/0001-91",
  "endereco": "Rua Sena Madureira, 1500",
  "cidadeId": 1,
  "telefone": "(11) 3385-4100",
  "email": "contato@unifesp.br",
  "nomeDiretor": "Maria Santos",
  "cpfDiretor": "123.456.789-00"
}
```

### GET /instituicao

Listar instituições com paginação.

### GET /instituicao/:id

Buscar instituição por ID.

### PUT /instituicao/:id

Atualizar instituição.

### DELETE /instituicao/:id

Deletar instituição.

---

## 🛡️ Seguradoras

### POST /seguradora

Criar nova seguradora.

**Body:**

```json
{
  "nome": "Seguradora Nacional"
}
```

### GET /seguradora

Listar seguradoras com paginação.

### GET /seguradora/:id

Buscar seguradora por ID.

### PUT /seguradora/:id

Atualizar seguradora.

### DELETE /seguradora/:id

Deletar seguradora.

---

## 👨‍🎓 Alunos

### POST /aluno

Criar novo aluno.

**Body:**

```json
{
  "nome": "João da Silva",
  "rg": "12.345.678-9",
  "cpf": "123.456.789-00",
  "endereco": "Rua das Palmeiras, 456",
  "cidadeId": 1,
  "cursoId": 1,
  "serie": "3º Ano",
  "telefone": "(11) 99999-8888",
  "telefonePai": "(11) 99999-7777",
  "email": "joao@email.com",
  "dataNascimento": "2000-01-15T00:00:00.000Z"
}
```

### GET /aluno

Listar alunos com paginação.

### GET /aluno/:id

Buscar aluno por ID.

### PUT /aluno/:id

Atualizar aluno.

### DELETE /aluno/:id

Deletar aluno.

---

## 📋 Estágios

### POST /estagio

Criar novo estágio.

**Body:**

```json
{
  "alunoId": 1,
  "empresaId": 1,
  "instituicaoId": 1,
  "tipo": "Obrigatorio",
  "remunerado": true,
  "origemInstituicao": "Convênio",
  "dataInicio": "2024-01-15T00:00:00.000Z",
  "dataTermino": "2024-12-15T00:00:00.000Z",
  "cargaHorariaSemanal": 30,
  "bolsaAuxilio": "800.00",
  "seguroApolice": "123456789",
  "seguradoraId": 1,
  "status": "Ativo",
  "dataAssinatura": "2024-01-10T00:00:00.000Z",
  "possuiResponsavelMenor": false,
  "cursoId": 1
}
```

### GET /estagio

Listar estágios com paginação.

### GET /estagio/:id

Buscar estágio por ID.

### GET /estagio/status/:status

Buscar estágios por status.

**Parâmetros válidos para status:**

- `Ativo`
- `Cancelado`
- `Concluido`

### PUT /estagio/:id

Atualizar estágio.

### DELETE /estagio/:id

Deletar estágio.

---

## ❌ Tratamento de Erros

### Erro de Validação (400)

```json
{
  "errors": [
    "Nome é obrigatório",
    "Email deve ter formato válido",
    "CPF deve ter 11 dígitos"
  ]
}
```

### Erro de Negócio (404)

```json
{
  "error": "Usuário não encontrado",
  "statusCode": 404
}
```

### Erro de Autenticação (401)

```json
{
  "error": "Token inválido",
  "statusCode": 401
}
```

### Erro de Conflito (409)

```json
{
  "error": "Usuário com este email já existe",
  "statusCode": 409
}
```

---

## 🧪 Exemplos de Teste

### Teste com cURL

**Criar usuário:**

```bash
curl -X POST http://localhost:3000/usuario \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@teste.com","senha":"123456"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/usuario/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@teste.com","senha":"123456"}'
```

**Listar usuários:**

```bash
curl -X GET http://localhost:3000/usuario \
  -H "Authorization: Bearer <token>"
```

### Teste com JavaScript

```javascript
// Criar usuário
const response = await fetch("http://localhost:3000/usuario", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nome: "Teste",
    email: "teste@teste.com",
    senha: "123456",
  }),
});

// Login
const loginResponse = await fetch("http://localhost:3000/usuario/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "teste@teste.com",
    senha: "123456",
  }),
});

const { token } = await loginResponse.json();

// Listar usuários
const usersResponse = await fetch("http://localhost:3000/usuario", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

## 📝 Notas Importantes

1. **Validação**: Todos os endpoints possuem validação manual
2. **Paginação**: Todos os endpoints de listagem suportam paginação
3. **Autenticação**: JWT é obrigatório para rotas protegidas
4. **Timestamps**: Todos os registros possuem `createdAt` e `updatedAt`
5. **Relacionamentos**: Os DTOs de resposta incluem dados relacionados quando aplicável
6. **Atualização Parcial**: Endpoints PUT suportam atualização parcial (campos opcionais)
