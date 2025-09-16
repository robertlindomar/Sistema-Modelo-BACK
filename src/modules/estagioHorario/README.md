# Módulo EstagioHorario

## 📋 Descrição

O módulo EstagioHorario é responsável pela gestão dos horários de estágio no sistema, permitindo o cadastro, consulta, atualização e exclusão dos horários vinculados a cada estágio. Cada registro de horário contém o dia da semana e o período (início e fim) em que o estágio é realizado.

## 🏗️ Estrutura

```
estagioHorario/
│
├── controllers/
│   └── EstagioHorarioController.ts
├── dtos/
│   ├── EstagioHorarioRequestDTO.ts
│   └── EstagioHorarioResponseDTO.ts
├── models/
│   └── EstagioHorarioModel.ts
├── repositories/
│   └── EstagioHorarioRepository.ts
├── services/
│   └── EstagioHorarioService.ts
└── routes.ts
```

---

## 🚦 Rotas

> **Todas as rotas exigem autenticação JWT.**

| Método | Rota                  | Descrição                              |
|--------|----------------------|----------------------------------------|
| GET    | `/estagioHorario/`    | Lista todos os horários                |
| GET    | `/estagioHorario/:id` | Busca horário por ID                   |
| POST   | `/estagioHorario/`    | Cria um novo horário                   |
| PUT    | `/estagioHorario/:id` | Atualiza um horário existente          |
| DELETE | `/estagioHorario/:id` | Remove um horário                      |

---

## 📦 Formatos de Dados

### EstagioHorarioRequestDTO (para criar/atualizar)

```json
{
  "estagioId": 1,
  "diaSemana": "Segunda | Terca | Quarta | Quinta | Sexta | Sabado | Domingo",
  "horarioInicio": "2024-01-01T08:00:00.000Z",
  "horarioFim": "2024-01-01T12:00:00.000Z"
}
```

### EstagioHorarioResponseDTO (resposta)

```json
{
  "id": 1,
  "estagioId": 1,
  "diaSemana": "Segunda | Terca | Quarta | Quinta | Sexta | Sabado | Domingo",
  "horarioInicio": "2024-01-01T08:00:00.000Z",
  "horarioFim": "2024-01-01T12:00:00.000Z"
}
```

---

## ⚠️ Regras e Observações

- **Autenticação:** Todas as rotas exigem JWT.
- **Campos obrigatórios:** Todos os campos são obrigatórios.
- **Validações:**
  - O horário de início deve ser menor que o horário de fim
  - Não pode existir mais de um horário para o mesmo estágio no mesmo dia da semana
  - O dia da semana deve ser um dos valores válidos do enum DiaSemana
- **Mensagens de erro:** 
  - Se o ID for inválido, retorna erro 400
  - Se o horário não for encontrado, retorna erro 404
  - Se já existir horário no mesmo dia para o estágio, retorna erro 409
  - Se não houver horários cadastrados, retorna mensagem informativa

---

## 📝 Exemplos de Fluxo

1. **Listar horários:**  
   - `GET /estagioHorario/`  
   - Resposta: array de horários.

2. **Buscar horário:**  
   - `GET /estagioHorario/:id`  
   - Resposta: objeto do horário.

3. **Criar horário:**  
   - `POST /estagioHorario/`  
   ```json
   {
     "estagioId": 1,
     "diaSemana": "Segunda",
     "horarioInicio": "2024-01-01T08:00:00.000Z",
     "horarioFim": "2024-01-01T12:00:00.000Z"
   }
   ```
   - Resposta: horário criado.

4. **Atualizar horário:**  
   - `PUT /estagioHorario/:id`  
   - Corpo: mesmo formato do criar
   - Resposta: horário atualizado.

5. **Deletar horário:**  
   - `DELETE /estagioHorario/:id`  
   - Resposta: mensagem de sucesso.

---

## 🔍 Validações Específicas

1. **Horários válidos:**
   - O horário de início deve ser anterior ao horário de fim
   - Os horários devem estar no formato ISO 8601

2. **Dia da semana:**
   - Deve ser um dos valores do enum DiaSemana:
     - Segunda
     - Terca
     - Quarta
     - Quinta
     - Sexta
     - Sabado
     - Domingo

3. **Unicidade:**
   - Não é permitido cadastrar mais de um horário para o mesmo estágio no mesmo dia da semana
   - Tentativas de cadastro duplicado resultarão em erro 409 (Conflict)
