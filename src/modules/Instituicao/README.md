# Módulo Instituição

## 📋 Descrição

Módulo responsável pela gestão de instituições de ensino no sistema. Permite o cadastro, consulta, atualização e exclusão de instituições educacionais, incluindo informações como CNPJ, endereço, contatos e dados do diretor.

## 🏗️ Estrutura

```
Instituicao/
├── controllers/
│   └── InstituicaoController.ts # Controlador principal
├── dtos/
│   ├── InstituicaoRequestDTO.ts # DTO para requisições
│   └── InstituicaoResponseDTO.ts # DTO para respostas
├── models/
│   └── Instituicao.ts           # Modelo de dados
├── repositories/
│   └── InstituicaoRepository.ts # Camada de acesso a dados
├── services/
│   └── InstituicaoService.ts    # Lógica de negócio
├── routes.ts                    # Definição das rotas
└── README.md                    # Este arquivo
```

## 📡 Endpoints

### CRUD Básico
- `GET /instituicao` - Listar todas as instituições
- `GET /instituicao/:id` - Buscar instituição por ID
- `POST /instituicao` - Criar nova instituição
- `PUT /instituicao/:id` - Atualizar instituição
- `DELETE /instituicao/:id` - Excluir instituição

## 🔐 Autenticação

Todos os endpoints requerem autenticação JWT através do header:
```
Authorization: Bearer <token>
```

## 📊 Modelo de Dados

```typescript
interface Instituicao {
  id: number;
  nome: string;
  nomeFantasia: string;
  cnpj?: string;
  endereco?: string;
  cidadeId: number;
  telefone?: string;
  email?: string;
  nomeDiretor?: string;
  cpfDiretor?: string;
  cidade: Cidade;
  estagios?: Estagio[];
}
```

## 🛠️ Funcionalidades

### Listagem de Instituições
- Retorna todas as instituições cadastradas
- Inclui dados da cidade relacionada
- Ordenação alfabética por nome
- Paginação (quando implementada)

### Busca por ID
- Retorna instituição específica
- Inclui relacionamentos (cidade, estágios)
- Tratamento para instituição não encontrada

### Criação de Instituição
- Validação de dados obrigatórios
- Verificação de CNPJ único (quando fornecido)
- Validação de cidade existente
- Criação de registro no banco

### Atualização
- Validação de dados
- Atualização seletiva de campos
- Manutenção de integridade dos dados
- Verificação de CNPJ único

### Exclusão
- Verificação de dependências (estágios)
- Exclusão segura
- Tratamento de restrições de chave estrangeira

## 🔗 Relacionamentos

O módulo Instituição possui relacionamentos com:

- **Cidade** - Uma instituição pertence a uma cidade
- **Estágios** - Uma instituição pode ter múltiplos estágios

## 📝 Exemplos de Uso

### Criar Instituição
```bash
POST /instituicao
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Escola Técnica Estadual",
  "nomeFantasia": "ETEC",
  "cnpj": "12.345.678/0001-90",
  "endereco": "Rua das Flores, 123",
  "cidadeId": 1,
  "telefone": "(11) 1234-5678",
  "email": "contato@etec.edu.br",
  "nomeDiretor": "João Silva",
  "cpfDiretor": "123.456.789-00"
}
```

### Buscar Instituição
```bash
GET /instituicao/1
Authorization: Bearer <token>
```

### Atualizar Instituição
```bash
PUT /instituicao/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Escola Técnica Estadual Atualizada",
  "telefone": "(11) 9876-5432",
  "email": "novo@etec.edu.br"
}
```

### Listar Instituições
```bash
GET /instituicao
Authorization: Bearer <token>
```

## ⚠️ Validações

### Campos Obrigatórios
- Nome da instituição
- Nome fantasia
- ID da cidade

### Validações Específicas
- CNPJ deve ter formato válido (quando fornecido)
- CPF do diretor deve ter formato válido (quando fornecido)
- Email deve ter formato válido (quando fornecido)
- Telefone deve ter formato válido (quando fornecido)
- Cidade deve existir no sistema
- CNPJ deve ser único no sistema

## 🚨 Tratamento de Erros

- Instituição não encontrada
- CNPJ já cadastrado
- Cidade não encontrada
- Dados obrigatórios ausentes
- Formato inválido de dados
- Erro de validação de dados
- Erro de exclusão com dependências

## 📊 Respostas

### Sucesso (200/201)
```json
{
  "id": 4,
  "nome": "Universidade Estadual Paulista",
  "nomeFantasia": "UNESP",
  "cnpj": "98.765.432/0001-11",
  "endereco": "Avenida Universitária, 456",
  "cidadeId": 2,
  "telefone": "(14) 3344-5566",
  "email": "contato@unesp.br",
  "nomeDiretor": "Maria Oliveira",
  "cpfDiretor": "987.654.321-00"
}
```

### Listagem (200)
```json
[
  {
    "id": 4,
    "nome": "Universidade Estadual Paulista",
    "nomeFantasia": "UNESP",
    "cnpj": "98.765.432/0001-11",
    "endereco": "Avenida Universitária, 456",
    "cidadeId": 2,
    "telefone": "(14) 3344-5566",
    "email": "contato@unesp.br",
    "nomeDiretor": "Maria Oliveira",
    "cpfDiretor": "987.654.321-00"
  },
  {
    "id": 5,
    "nome": "Instituto Federal",
    "nomeFantasia": "IFSP",
    "cnpj": "12.345.678/0001-99",
    "endereco": "Rua Exemplo, 123",
    "cidadeId": 1,
    "telefone": "(11) 1234-5678",
    "email": "contato@ifsp.edu.br",
    "nomeDiretor": "João da Silva",
    "cpfDiretor": "123.456.789-00"
  }
]
```

```

### Erro (400/404/500)
```json
{
  "success": false,
  "error": "Instituição não encontrada"
}
```

## 🔍 Funcionalidades Específicas

### Validação de CNPJ
- Formato: XX.XXX.XXX/XXXX-XX
- Validação de dígitos verificadores
- Verificação de unicidade

### Validação de CPF
- Formato: XXX.XXX.XXX-XX
- Validação de dígitos verificadores
- Aplicável apenas ao CPF do diretor

### Relacionamento com Cidade
- Validação de existência da cidade
- Inclusão automática dos dados da cidade nas respostas
- Manutenção da integridade referencial

## 📋 Campos Opcionais

- **CNPJ** - Para instituições com CNPJ
- **Endereço** - Endereço físico da instituição
- **Telefone** - Telefone de contato
- **Email** - Email de contato
- **Nome do Diretor** - Nome do diretor responsável
- **CPF do Diretor** - CPF do diretor responsável

## 🎯 Casos de Uso

### Instituições Públicas
- CNPJ obrigatório
- Dados do diretor importantes
- Validação rigorosa de documentos

### Instituições Privadas
- CNPJ obrigatório
- Dados comerciais relevantes
- Controle de qualidade

### Instituições Informais
- CNPJ opcional
- Foco em dados básicos
- Flexibilidade na validação 