# Módulo Curso

## 📋 Descrição

O módulo Curso é responsável pela gestão dos cursos no sistema, permitindo o cadastro, consulta, atualização e exclusão de registros de cursos.

## 🏗️ Estrutura

```
curso/
│
├── controllers/
│   └── CursoController.ts
├── dtos/
│   ├── CursoRequestDTO.ts
│   └── CursoResponseDTO.ts
├── models/
│   └── CursoModel.ts
├── repositories/
│   └── CursoRepository.ts
├── services/
│   └── CursoService.ts
└── routes.ts
```

---

## 🚦 Rotas

> **Todas as rotas exigem autenticação JWT.**

| Método | Rota         | Descrição                        |
|--------|--------------|----------------------------------|
| GET    | `/curso/`    | Lista todos os cursos            |
| GET    | `/curso/:id` | Busca curso por ID               |
| POST   | `/curso/`    | Cria um novo curso               |
| PUT    | `/curso/:id` | Atualiza um curso existente      |
| DELETE | `/curso/:id` | Remove um curso                  |

---

## 📦 Formatos de Dados

### CursoRequestDTO (para criar/atualizar)

```json
{
  "nome": "string",
  "habilitacao": "string (opcional)",
  "nivel": "string (opcional)"
}
```

### CursoResponseDTO (resposta)

```json
{
  "id": 1,
  "nome": "string",
  "habilitacao": "string (opcional)",
  "nivel": "string (opcional)"
}
```

---

## ⚠️ Regras e Observações

- **Autenticação:** Todas as rotas exigem JWT.
- **Campo obrigatório:** `nome`.
- **Campos opcionais:** `habilitacao`, `nivel`.
- **Mensagens de erro:** 
  - Se o ID for inválido, retorna erro 400.
  - Se o curso não for encontrado, retorna erro 404.
  - Se não houver cursos cadastrados, retorna mensagem informativa.

---

## 📝 Exemplos de Fluxo

1. **Listar cursos:**  
   - `GET /curso/`  
   - Resposta: array de cursos.

2. **Buscar curso:**  
   - `GET /curso/:id`  
   - Resposta: objeto do curso.

3. **Criar curso:**  
   - `POST /curso/`  
   - Corpo: conforme `CursoRequestDTO`.  
   - Resposta: curso criado.

4. **Atualizar curso:**  
   - `PUT /curso/:id`  
   - Corpo: conforme `CursoRequestDTO`.  
   - Resposta: curso atualizado.

5. **Deletar curso:**  
   - `DELETE /curso/:id`  
   - Resposta: mensagem de sucesso.

---

Se precisar de exemplos de requisições ou respostas reais, posso complementar!

