# Módulo Estágio

## 📋 Descrição

Módulo responsável pela gestão dos estágios no sistema, incluindo cadastro, atualização, consulta e exclusão de registros de estágio, além de relacionamentos com aluno, empresa, instituição, seguradora e motivo de encerramento.

## 🏗️ Estrutura

```
estagio/
├── controllers/
│   └── EstagioController.ts         # Controlador principal
├── dtos/
│   ├── EstagioRequestDTO.ts         # DTO para requisições (criação/atualização)
│   ├── EstagioResponseDTO.ts        # DTO para respostas simples
│   └── EstagioCompletoResponseDTO.ts# DTO para respostas completas (com relacionamentos)
├── models/
│   └── EstagioModel.ts              # Modelo de dados
├── repositories/
│   └── EstagioRepository.ts         # Camada de acesso a dados
├── services/
│   └── EstagioService.ts            # Lógica de negócio
├── routes.ts                        # Definição das rotas
└── README.md                        # Este arquivo
```

## 📡 Endpoints

Todos os endpoints requerem autenticação JWT.

- `GET /estagio` - Listar todos os estágios
- `GET /estagio?status=Ativo` - Listar estágios por status (Ativo, Cancelado, Concluído)
- `GET /estagio/:id` - Buscar estágio por ID
- `POST /estagio` - Criar novo estágio
- `PUT /estagio/:id` - Atualizar estágio existente
- `DELETE /estagio/:id` - Excluir estágio

## 🔐 Autenticação

Todos os endpoints requerem autenticação JWT através do header:

```
Authorization: Bearer <token>
```

## 📊 Modelo de Dados

### EstagioRequestDTO (para criação/atualização)

```typescript
interface EstagioRequestDTO {
  alunoId: number;
  empresaId: number;
  instituicaoId: number;
  tipo: TipoEstagio; // Ex: 'OBRIGATORIO' | 'NÃO_OBRIGATORIO'
  remunerado: boolean;
  origemInstituicao?: string;
  dataInicio: string; // formato ISO
  dataTermino: string; // formato ISO
  cargaHorariaSemanal?: number;
  bolsaAuxilio?: string;
  seguroApolice?: string;
  seguradoraId?: number;
  status: StatusEstagio; // Ex: 'ATIVO' | 'ENCERRADO' | 'CANCELADO'
  dataAssinatura?: string;
  dataCancelamento?: string;
  motivoEncerramentoId?: number;
  possuiResponsavelMenor: boolean;
}
```

### EstagioResponseDTO (resposta simples)

```typescript
interface EstagioResponseDTO {
  id: number;
  alunoId: number;
  empresaId: number;
  instituicaoId: number;
  tipo: TipoEstagio;
  remunerado: boolean;
  origemInstituicao?: string;
  dataInicio: string;
  dataTermino: string;
  cargaHorariaSemanal?: number;
  bolsaAuxilio?: string;
  seguroApolice?: string;
  seguradoraId?: number;
  status: StatusEstagio;
  dataAssinatura?: string;
  dataCancelamento?: string;
  motivoEncerramentoId?: number;
  possuiResponsavelMenor: boolean;
}
```

### EstagioCompletoResponseDTO (resposta detalhada)

```typescript
interface EstagioCompletoResponseDTO {
  id: number;
  alunoId: number;
  empresaId: number;
  instituicaoId: number;
  tipo: TipoEstagio;
  remunerado: boolean;
  origemInstituicao?: string;
  dataInicio: string;
  dataTermino: string;
  cargaHorariaSemanal?: number;
  bolsaAuxilio?: string;
  seguroApolice?: string;
  seguradoraId?: number;
  status: StatusEstagio;
  dataAssinatura?: string;
  dataCancelamento?: string;
  motivoEncerramentoId?: number;
  motivoEncerramento?: MotivoEncerramentoEstagioResponseDTO;
  possuiResponsavelMenor: boolean;
  aluno?: AlunoResponseDTO;
  empresa?: EmpresaResponseDTO;
  instituicao?: InstituicaoResponseDTO;
  seguradora?: SeguradoraResponseDTO;
}
```

## 🛠️ Funcionalidades

- Cadastro de estágio com validação de dados obrigatórios
- Atualização de estágio existente
- Consulta de estágios (todos ou por ID)
- Exclusão de estágio
- Relacionamento com aluno, empresa, instituição, seguradora e motivo de encerramento

## 🔒 Segurança

- Todos os endpoints protegidos por autenticação JWT
- Validação de dados de entrada
- Tratamento de erros seguro

## 📝 Exemplos de Uso

### Listar Estágios por Status

```bash
# Listar apenas estágios ativos
GET /estagio?status=Ativo
Authorization: Bearer <token>

# Listar apenas estágios cancelados
GET /estagio?status=Cancelado
Authorization: Bearer <token>

# Listar apenas estágios concluídos
GET /estagio?status=Concluído
Authorization: Bearer <token>
```

**Status válidos:**

- `Ativo` - Estágios em andamento
- `Cancelado` - Estágios cancelados
- `Concluído` - Estágios finalizados

### Criar Estágio

```bash
POST /estagio
Authorization: Bearer <token>
Content-Type: application/json

{
  "alunoId": 1,
  "empresaId": 2,
  "instituicaoId": 3,
  "tipo": "OBRIGATORIO",
  "remunerado": true,
  "dataInicio": "2024-08-01",
  "dataTermino": "2024-12-01",
  "status": "ATIVO",
  "possuiResponsavelMenor": false
}
```

### Buscar Estágio por ID

```bash
GET /estagio/1
Authorization: Bearer <token>
```

### Atualizar Estágio

```bash
PUT /estagio/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "ENCERRADO",
  "dataCancelamento": "2024-12-02",
  "motivoEncerramentoId": 5
}
```

### Excluir Estágio

```bash
DELETE /estagio/1
Authorization: Bearer <token>
```

## ⚠️ Validações

- Todos os campos obrigatórios devem ser preenchidos
- Datas devem estar em formato válido
- IDs de entidades relacionadas devem existir
- Status e tipo devem ser valores válidos conforme enum

## 🚨 Tratamento de Erros

- ID inválido ou não numérico
- Estágio não encontrado
- Dados obrigatórios ausentes ou inválidos
- Erros de autenticação (token ausente ou inválido)
- Erros internos do servidor
