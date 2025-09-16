# Módulo Seguradora

## 📋 Descrição

Módulo responsável pela gestão de seguradoras do sistema. Permite cadastro, consulta, atualização e exclusão de seguradoras.

## 🏗️ Estrutura

```
seguradora/
├── controllers/
│   └── SeguradoraController.ts
├── dtos/
│   ├── SeguradoraRequestDTO.ts
│   └── SeguradoraResponseDTO.ts
├── models/
│   └── SeguradoraModel.ts
├── repositories/
│   └── SeguradoraRepository.ts
├── services/
│   └── SeguradoraService.ts
├── routes.ts
└── README.md
```

---

## 📑 Endpoints

### CRUD Básico
- `GET /seguradora` - Listar todas as seguradoras
- `GET /seguradora/:id` - Buscar seguradora por ID
- `POST /seguradora` - Criar nova seguradora
- `PUT /seguradora/:id` - Atualizar seguradora
- `DELETE /seguradora/:id` - Excluir seguradora

> **Todos os endpoints requerem autenticação JWT via header:**
> ```
> Authorization: Bearer <token>
> ```

---

## 📊 Modelo de Dados

### SeguradoraRequestDTO (para criar/atualizar)

```typescript
{
  nome: string
}
```

### SeguradoraResponseDTO (resposta)

```typescript
{
  id: number,
  nome: string
}
```

---

## ⚙️ Funcionalidades

- Listagem, busca, criação, atualização e exclusão de seguradoras
- Validação de campos obrigatórios (`nome`)
- Mensagens de erro padronizadas

---

## 🧪 Exemplos de Uso

### Criar Seguradora
```bash
POST /seguradora
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Seguradora XPTO"
}
```

### Buscar Seguradora por ID
```bash
GET /seguradora/1
Authorization: Bearer <token>
```

### Atualizar Seguradora
```bash
PUT /seguradora/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Seguradora XPTO Ltda"
}
```

---

## ⚠️ Validações

- `nome` é obrigatório
- Nome deve ser único
- Nome deve ter pelo menos 2 caracteres

---

## 🚨 Tratamento de Erros

- Seguradora não encontrada
- Seguradora já cadastrada (nome)
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
    "nome": "Seguradora XPTO"
  }
}
```

### Erro (400/404/500)
```json
{
  "success": false,
  "error": "Seguradora não encontrada"
}
```
