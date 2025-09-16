# Módulo Aluno

## 📋 Descrição

O módulo Aluno é responsável pela gestão dos alunos no sistema, permitindo o cadastro, consulta, atualização e exclusão de registros de alunos. Cada aluno está vinculado a uma cidade e a um curso.

## 🏗️ Estrutura

```
aluno/
│
├── controllers/
│   └── AlunoController.ts
├── dtos/
│   ├── AlunoRequestDTO.ts
│   ├── AlunoResponseDTO.ts
│   └── AlunoComCidadeCursoResponseDTO.ts
├── models/
│   └── AlunoModel.ts
├── repositories/
│   └── AlunoRepository.ts
├── services/
│   └── AlunoService.ts
└── routes.ts
```

---

## 🚦 Rotas

> **Todas as rotas exigem autenticação JWT.**

| Método | Rota         | Descrição                        |
|--------|--------------|----------------------------------|
| GET    | `/aluno/`    | Lista todos os alunos            |
| GET    | `/aluno/:id` | Busca aluno por ID               |
| POST   | `/aluno/`    | Cria um novo aluno               |
| PUT    | `/aluno/:id` | Atualiza um aluno existente      |
| DELETE | `/aluno/:id` | Remove um aluno                  |

---

## 📦 Formatos de Dados

### AlunoRequestDTO (para criar/atualizar)

```json
{
  "nome": "string",
  "rg": "string (opcional)",
  "cpf": "string (opcional)",
  "endereco": "string (opcional)",
  "cidadeId": 1,
  "cursoId": 1,
  "serie": "string (opcional)",
  "telefone": "string (opcional)",
  "telefonePai": "string (opcional)",
  "email": "string (opcional)",
  "dataNascimento": "2024-01-01T00:00:00.000Z (opcional)"
}
```

### AlunoResponseDTO (resposta básica)

```json
{
  "id": 1,
  "nome": "string",
  "rg": "string (opcional)",
  "cpf": "string (opcional)",
  "endereco": "string (opcional)",
  "cidadeId": 1,
  "cursoId": 1,
  "serie": "string (opcional)",
  "telefone": "string (opcional)",
  "telefonePai": "string (opcional)",
  "email": "string (opcional)",
  "dataNascimento": "2024-01-01T00:00:00.000Z (opcional)"
}
```

### AlunoComCidadeCursoResponseDTO (resposta detalhada)

```json
{
  "id": 1,
  "nome": "string",
  "rg": "string (opcional)",
  "cpf": "string (opcional)",
  "endereco": "string (opcional)",
  "cidadeId": 1,
  "cursoId": 1,
  "serie": "string (opcional)",
  "telefone": "string (opcional)",
  "telefonePai": "string (opcional)",
  "email": "string (opcional)",
  "dataNascimento": "2024-01-01T00:00:00.000Z (opcional)",
  "cidade": {
    "id": 1,
    "nome": "string",
    "uf": "string"
  },
  "curso": {
    "id": 1,
    "nome": "string",
    "habilitacao": "string",
    "nivel": "string"
  }
}
```

---

## ⚠️ Regras e Observações

- **Autenticação:** Todas as rotas exigem JWT.
- **Campos obrigatórios:** `nome`, `cidadeId`, `cursoId`.
- **Campos opcionais:** `rg`, `cpf`, `endereco`, `serie`, `telefone`, `telefonePai`, `email`, `dataNascimento`.
- **Mensagens de erro:** 
  - Se o ID for inválido, retorna erro 400.
  - Se o aluno não for encontrado, retorna erro 404.
  - Se não houver alunos cadastrados, retorna mensagem informativa.

---

## 📝 Exemplos de Fluxo

1. **Listar alunos:**  
   - `GET /aluno/`  
   - Resposta: array de alunos.

2. **Buscar aluno:**  
   - `GET /aluno/:id`  
   - Resposta: objeto do aluno.

3. **Criar aluno:**  
   - `POST /aluno/`  
   - Corpo: conforme `AlunoRequestDTO`.  
   - Resposta: aluno criado.

4. **Atualizar aluno:**  
   - `PUT /aluno/:id`  
   - Corpo: conforme `AlunoRequestDTO`.  
   - Resposta: aluno atualizado.

5. **Deletar aluno:**  
   - `DELETE /aluno/:id`  
   - Resposta: mensagem de sucesso.

---

Se precisar de exemplos de requisições ou respostas reais, posso complementar!