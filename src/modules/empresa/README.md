# Módulo Empresa

## 📋 Descrição

Módulo responsável pela gestão de empresas do sistema. Permite cadastro, consulta, atualização e exclusão de empresas. Cada empresa está vinculada a uma cidade.

## 🏗️ Estrutura

```
empresa/
├── controllers/
│   └── EmpresaController.ts
├── dtos/
│   ├── EmpresaRequestDTO.ts
│   ├── EmpresaResponseDTO.ts
│   └── EmpresaComCidadeResponseDTO.ts
├── models/
│   └── EmpresaModel.ts
├── repositories/
│   └── EmpresaRepository.ts
├── services/
│   └── EmpresaService.ts
├── routes.ts
└── README.md
```

---

## 📑 Endpoints

### CRUD Básico
- `GET /empresa` - Listar todas as empresas
- `GET /empresa/:id` - Buscar empresa por ID
- `POST /empresa` - Criar nova empresa
- `PUT /empresa/:id` - Atualizar empresa
- `DELETE /empresa/:id` - Excluir empresa

> **Todos os endpoints requerem autenticação JWT via header:**
> ```
> Authorization: Bearer <token>
> ```

---

## 📊 Modelo de Dados

### EmpresaRequestDTO (para criar/atualizar)

```typescript
{
  nome: string,
  nomeFantasia: string,
  cnpj?: string,
  cpfAutonomo?: string,
  numClassAutonomo?: string,
  endereco?: string,
  cidadeId: number,
  telefone1?: string,
  telefone2?: string,
  email?: string,
  representante?: string,
  cargoRepresentante?: string
}
```

### EmpresaResponseDTO (resposta)

```typescript
{
  id?: number,
  nome: string,
  nomeFantasia: string,
  cnpj?: string,
  cpfAutonomo?: string,
  numClassAutonomo?: string,
  endereco?: string,
  cidadeId: number,
  telefone1?: string,
  telefone2?: string,
  email?: string,
  representante?: string,
  cargoRepresentante?: string
}
```

### EmpresaComCidadeResponseDTO (resposta detalhada)

```typescript
{
  id?: number,
  nome: string,
  nomeFantasia: string,
  cnpj?: string,
  cpfAutonomo?: string,
  numClassAutonomo?: string,
  endereco?: string,
  cidadeId: number,
  telefone1?: string,
  telefone2?: string,
  email?: string,
  representante?: string,
  cargoRepresentante?: string,
  cidade: {
    id: number,
    nome: string,
    uf: string
  }
}
```

---

## ⚙️ Funcionalidades

- Listagem, busca, criação, atualização e exclusão de empresas
- Validação de campos obrigatórios (`nome`, `nomeFantasia`, `cidadeId`)
- Relacionamento com cidade
- Mensagens de erro padronizadas

---

## 🧪 Exemplos de Uso

### Criar Empresa
```bash
POST /empresa
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Empresa XPTO",
  "nomeFantasia": "XPTO",
  "cidadeId": 1,
  "cnpj": "00.000.000/0001-00"
}
```

### Buscar Empresa por ID
```bash
GET /empresa/1
Authorization: Bearer <token>
```

### Atualizar Empresa
```bash
PUT /empresa/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Empresa XPTO Ltda",
  "nomeFantasia": "XPTO",
  "cidadeId": 1
}
```

---

## ⚠️ Validações

- `nome`, `nomeFantasia` e `cidadeId` são obrigatórios
- CNPJ deve ser único se informado
- Nome deve ter pelo menos 2 caracteres

---

## 🚨 Tratamento de Erros

- Empresa não encontrada
- Empresa já cadastrada (CNPJ)
- Dados obrigatórios ausentes
- Erro de validação de dados

---

## 📦 Respostas

### Sucesso (200/201)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "Empresa XPTO"
    // ...
  }
}
```

### Erro (400/404/500)
```json
{
  "success": false,
  "error": "Empresa não encontrada"
}
```

---

Se precisar de exemplos de requisições ou respostas reais, posso complementar!