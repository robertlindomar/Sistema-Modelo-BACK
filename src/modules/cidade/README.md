# Módulo Cidade

## 📋 Descrição

Módulo responsável pela gestão de cidades e estados do sistema. Permite o cadastro, consulta, atualização e exclusão de cidades, além de funcionalidades de busca por nome e UF.

## 🏗️ Estrutura

```
cidade/
├── controllers/
│   └── CidadeController.ts     # Controlador principal
├── dtos/
│   ├── CidadeRequestDTO.ts     # DTO para requisições
│   └── CidadeResponseDTO.ts    # DTO para respostas
├── models/
│   └── CidadeModel.ts          # Modelo de dados
├── repositories/
│   └── CidadeRepository.ts     # Camada de acesso a dados
├── services/
│   └── CidadeService.ts        # Lógica de negócio
├── routes.ts                   # Definição das rotas
└── README.md                   # Este arquivo
```

## 📡 Endpoints

### CRUD Básico
- `GET /cidade` - Listar todas as cidades
- `GET /cidade/:id` - Buscar cidade por ID
- `POST /cidade` - Criar nova cidade
- `PUT /cidade/:id` - Atualizar cidade
- `DELETE /cidade/:id` - Excluir cidade

### Buscas Específicas
- `GET /cidade/buscar-por-nome/:nome` - Buscar cidades por nome
- `GET /cidade/buscar-por-uf/:uf` - Buscar cidades por UF

## 🔐 Autenticação

Todos os endpoints requerem autenticação JWT através do header:
```
Authorization: Bearer <token>
```

## 📊 Modelo de Dados

```typescript
interface Cidade {
  id: number;
  nome: string;
  uf: string;
  instituicoes?: Instituicao[];
  alunos?: Aluno[];
  empresas?: Empresa[];
}
```

## 🛠️ Funcionalidades

### Listagem de Cidades
- Retorna todas as cidades cadastradas
- Ordenação alfabética por nome
- Paginação (quando implementada)

### Busca por ID
- Retorna cidade específica
- Inclui relacionamentos (instituições, alunos, empresas)
- Tratamento para cidade não encontrada

### Criação de Cidade
- Validação de dados obrigatórios
- Verificação de cidade única (nome + UF)
- Criação de registro no banco

### Atualização
- Validação de dados
- Atualização seletiva de campos
- Manutenção de integridade dos dados

### Exclusão
- Verificação de dependências
- Exclusão segura (soft delete quando aplicável)
- Tratamento de restrições de chave estrangeira

### Busca por Nome
- Busca parcial por nome da cidade
- Case-insensitive
- Retorna múltiplos resultados

### Busca por UF
- Busca todas as cidades de um estado
- Ordenação alfabética
- Retorna lista completa

## 🔗 Relacionamentos

O módulo Cidade possui relacionamentos com:

- **Instituições** - Uma cidade pode ter múltiplas instituições
- **Alunos** - Uma cidade pode ter múltiplos alunos
- **Empresas** - Uma cidade pode ter múltiplas empresas

## 📝 Exemplos de Uso

### Criar Cidade
```bash
POST /cidade
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "São Paulo",
  "uf": "SP"
}
```

### Buscar por Nome
```bash
GET /cidade/buscar-por-nome/São Paulo
Authorization: Bearer <token>
```

### Buscar por UF
```bash
GET /cidade/buscar-por-uf/SP
Authorization: Bearer <token>
```

### Atualizar Cidade
```bash
PUT /cidade/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "São Paulo Capital",
  "uf": "SP"
}
```

## ⚠️ Validações

- Nome da cidade é obrigatório
- UF é obrigatória e deve ter 2 caracteres
- Combinação nome + UF deve ser única
- UF deve estar em maiúsculas
- Nome deve ter pelo menos 2 caracteres

## 🚨 Tratamento de Erros

- Cidade não encontrada
- Cidade já cadastrada (nome + UF)
- Dados obrigatórios ausentes
- UF inválida
- Erro de validação de dados
- Erro de exclusão com dependências

## 📊 Respostas

### Sucesso (200/201)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "São Paulo",
    "uf": "SP"
  }
}
```

### Listagem (200)
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "São Paulo",
      "uf": "SP"
    },
    {
      "id": 2,
      "nome": "Rio de Janeiro",
      "uf": "RJ"
    }
  ]
}
```

### Erro (400/404/500)
```json
{
  "success": false,
  "error": "Cidade não encontrada"
}
```

## 🔍 Funcionalidades de Busca

### Busca por Nome
- Suporte a busca parcial
- Case-insensitive
- Ordenação alfabética
- Limite de resultados

### Busca por UF
- Busca exata por UF
- Retorna todas as cidades do estado
- Ordenação por nome da cidade
- Útil para formulários de endereço 