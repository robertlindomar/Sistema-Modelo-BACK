# Módulo Motivo Encerramento Estágio

## 📋 Descrição

Módulo responsável pelo cadastro, consulta, atualização e exclusão dos motivos de encerramento de estágio, permitindo associar múltiplos motivos a um estágio e registrar informações detalhadas sobre o encerramento.

## 🏗️ Estrutura

```
motivoEncerramentoEstagio/
├── controllers/
│   └── MotivoEncerramentoEstagioController.ts
├── dtos/
│   ├── MotivoEncerramentoEstagioRequestDTO.ts
│   └── MotivoEncerramentoEstagioResponseDTO.ts
├── models/
│   └── MotivoEncerramentoEstagioModel.ts
├── repositories/
│   └── MotivoEncerramentoEstagioRepository.ts
├── services/
│   └── MotivoEncerramentoEstagioService.ts
├── routes.ts
└── README.md
```

## 📡 Endpoints

Todos os endpoints requerem autenticação JWT.

- `GET /motivo-encerramento-estagio` - Listar todos os motivos de encerramento
- `GET /motivo-encerramento-estagio/:id` - Buscar motivo de encerramento por ID
- `GET /motivo-encerramento-estagio/estagio/:estagioId` - Buscar motivo de encerramento pelo ID do estágio
- `POST /motivo-encerramento-estagio` - Criar novo motivo de encerramento
- `PUT /motivo-encerramento-estagio/:id` - Atualizar motivo de encerramento existente
- `DELETE /motivo-encerramento-estagio/:id` - Excluir motivo de encerramento

## 🔐 Autenticação

Todos os endpoints requerem autenticação JWT através do header:

```
Authorization: Bearer <token>
```

## 📊 Modelo de Dados

### MotivoEncerramentoEstagioRequestDTO (para criação/atualização)

```typescript
interface MotivoEncerramentoEstagioRequestDTO {
  estagioId: number;
  motivoPrincipal: string;
  motivoPrincipalOutros?: string;
  motivosEmpresa?: string;
  motivosEmpresaOutros?: string;
  statusEstagio?: StatusEstagio; // Ex: 'ATIVO' | 'ENCERRADO' | 'CANCELADO'
}
```

### MotivoEncerramentoEstagioResponseDTO (resposta)

```typescript
interface MotivoEncerramentoEstagioResponseDTO {
  id: number;
  estagioId: number;
  motivoPrincipal: string;
  motivoPrincipalOutros?: string;
  motivosEmpresa?: string;
  motivosEmpresaOutros?: string;
  dataRegistro: string; // ISO
}
```

## 🛠️ Funcionalidades

- Cadastro de motivo de encerramento de estágio
- Atualização de motivo de encerramento
- Consulta de motivos (todos, por ID ou por estágio)
- Exclusão de motivo de encerramento
- Atualização automática do status do estágio ao cadastrar motivo

## 🔒 Segurança

- Todos os endpoints protegidos por autenticação JWT
- Validação de dados obrigatórios
- Tratamento de erros seguro

## 📝 Exemplos de Uso

### Criar Motivo de Encerramento

```bash
POST /motivoEncerramentoEstagio
Authorization: Bearer <token>
Content-Type: application/json

{
  "estagioId": 1,
  "motivoPrincipal": "Conclusão do curso",
  "motivosEmpresa": "Projeto finalizado",
  "statusEstagio": "ENCERRADO"
}
```

### Buscar Motivo por Estágio

```bash
GET /motivo-encerramento-estagio/estagio/1
Authorization: Bearer <token>
```

### Atualizar Motivo

```bash
PUT /motivo-encerramento-estagio/2
Authorization: Bearer <token>
Content-Type: application/json

{
  "motivoPrincipal": "Desistência do aluno",
  "motivoPrincipalOutros": "Mudança de cidade"
}
```

### Excluir Motivo

```bash
DELETE /motivo-encerramento-estagio/2
Authorization: Bearer <token>
```

## ⚠️ Validações

- `estagioId` e `motivoPrincipal` são obrigatórios
- O estágio informado deve existir
- Campos opcionais podem ser omitidos

## 🚨 Tratamento de Erros

- Dados obrigatórios ausentes ou inválidos
- Motivo ou estágio não encontrado
- Erros de autenticação (token ausente ou inválido)
- Erros internos do servidor
