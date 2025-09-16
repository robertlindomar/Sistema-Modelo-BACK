# Módulo Relatório de Estágio

Este módulo é responsável por gerenciar os relatórios de estágio no sistema, seguindo os padrões estabelecidos de validação, paginação e tratamento de erros.

## Estrutura

```
relatorioEstagio/
├── controllers/
│   └── RelatorioEstagioController.ts
├── services/
│   └── RelatorioEstagioService.ts
├── repositories/
│   └── RelatorioEstagioRepository.ts
├── models/
│   └── RelatorioEstagioModel.ts
├── dtos/
│   ├── RelatorioEstagioRequestDTO.ts
│   └── RelatorioEstagioResponseDTO.ts
├── validations/
│   └── relatorioEstagioValidations.ts
├── routes.ts
└── README.md
```

## Endpoints

| Método | Endpoint                         | Descrição                                 | Validações                |
| ------ | -------------------------------- | ----------------------------------------- | ------------------------- |
| GET    | `/relatorio-estagio/`            | Lista relatórios com paginação e filtros  | Paginação, Filtros        |
| GET    | `/relatorio-estagio/:id`         | Busca relatório por ID                    | ID válido                 |
| GET    | `/relatorio-estagio/estagio/:id` | Lista relatórios de um estágio específico | ID de estágio válido      |
| POST   | `/relatorio-estagio/`            | Cria um novo relatório                    | Dados completos           |
| PUT    | `/relatorio-estagio/:id`         | Atualiza um relatório existente           | ID válido, Dados parciais |
| DELETE | `/relatorio-estagio/:id`         | Remove um relatório                       | ID válido                 |

## Modelo de Dados

### RelatorioEstagio

```typescript
interface RelatorioEstagio {
  id: number;
  estagioId: number;
  tipo: "Inicial" | "Parcial" | "Final";
  prazoEntrega: Date;
  dataEntregue?: Date;
  observacao?: string;
  createdAt: Date;
  updatedAt: Date;
  estagio?: {
    id: number;
    aluno?: Aluno;
    empresa?: Empresa;
    instituicao?: Instituicao;
  };
}
```

## Validações Implementadas

### Criação de Relatório

- **estagioId**: Obrigatório, número inteiro positivo
- **tipo**: Obrigatório, enum ["Inicial", "Parcial", "Final"]
- **prazoEntrega**: Obrigatório, data futura válida
- **dataEntregue**: Opcional, data válida anterior ou igual ao prazo
- **observacao**: Opcional, máximo 500 caracteres

### Atualização de Relatório

- Todos os campos são opcionais
- Validações aplicadas apenas aos campos fornecidos
- Mantém regras de negócio para datas

### Paginação e Filtros

- **page**: Número inteiro positivo (padrão: 1)
- **limit**: Número entre 1 e 100 (padrão: 10)
- **search**: Busca em observações e nomes de aluno/empresa
- **tipo**: Filtro por tipo de relatório
- **status**: Filtro por status (pendente, entregue, atrasado)

## Regras de Negócio

1. **Unicidade**: Não pode existir mais de um relatório do mesmo tipo para o mesmo estágio
2. **Prazo**: O prazo de entrega deve ser posterior à data atual
3. **Entrega**: A data de entrega não pode ser futura nem anterior ao prazo
4. **Estágio**: O estágio deve existir e estar ativo
5. **Paginação**: Limite máximo de 100 registros por página
6. **Busca**: Busca case-insensitive em observações e nomes relacionados

## Filtros Disponíveis

### Por Status

- **pendente**: Relatórios não entregues com prazo futuro
- **entregue**: Relatórios com data de entrega preenchida
- **atrasado**: Relatórios não entregues com prazo vencido

### Por Tipo

- **Inicial**: Relatório inicial do estágio
- **Parcial**: Relatório parcial (meio do estágio)
- **Final**: Relatório final do estágio

### Por Busca

- Busca em campos de observação
- Busca em nome do aluno
- Busca em nome da empresa

## Exemplos de Uso

### Criar Relatório

```bash
curl -X POST http://localhost:3000/relatorio-estagio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "estagioId": 1,
    "tipo": "Inicial",
    "prazoEntrega": "2024-12-31T23:59:59.000Z",
    "observacao": "Relatório inicial do estágio"
  }'
```

### Listar Relatórios com Filtros

```bash
# Listar com paginação
curl -X GET "http://localhost:3000/relatorio-estagio?page=1&limit=10" \
  -H "Authorization: Bearer <token>"

# Filtrar por tipo
curl -X GET "http://localhost:3000/relatorio-estagio?tipo=Inicial" \
  -H "Authorization: Bearer <token>"

# Filtrar por status
curl -X GET "http://localhost:3000/relatorio-estagio?status=pendente" \
  -H "Authorization: Bearer <token>"

# Buscar por texto
curl -X GET "http://localhost:3000/relatorio-estagio?search=relatório" \
  -H "Authorization: Bearer <token>"
```

### Buscar por Estágio

```bash
curl -X GET http://localhost:3000/relatorio-estagio/estagio/1 \
  -H "Authorization: Bearer <token>"
```

### Atualizar Relatório

```bash
curl -X PUT http://localhost:3000/relatorio-estagio/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "dataEntregue": "2024-12-15T10:00:00.000Z",
    "observacao": "Relatório entregue com sucesso"
  }'
```

### Deletar Relatório

```bash
curl -X DELETE http://localhost:3000/relatorio-estagio/1 \
  -H "Authorization: Bearer <token>"
```

## Resposta da API

### Lista Paginada

```json
{
  "data": [
    {
      "id": 1,
      "estagioId": 1,
      "tipo": "Inicial",
      "prazoEntrega": "2024-12-31T23:59:59.000Z",
      "dataEntregue": null,
      "observacao": "Relatório inicial",
      "estagio": {
        "id": 1,
        "aluno": { "nome": "João Silva" },
        "empresa": { "nome": "Empresa ABC" }
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Tratamento de Erros

O módulo retorna erros HTTP apropriados com mensagens detalhadas:

- **400**: Dados inválidos ou regras de negócio violadas
- **401**: Token de autenticação inválido ou ausente
- **404**: Relatório não encontrado
- **409**: Conflito (ex: relatório duplicado)
- **500**: Erro interno do servidor

### Exemplo de Erro de Validação

```json
{
  "error": "Dados inválidos",
  "details": [
    {
      "field": "prazoEntrega",
      "message": "Prazo de entrega deve ser posterior à data atual"
    }
  ]
}
```

## Dependências

- **Prisma**: ORM para acesso ao banco de dados
- **Express**: Framework web
- **Zod**: Validação de dados
- **JWT**: Autenticação
- **TypeScript**: Tipagem estática

## Testes

O módulo inclui validações robustas e tratamento de erros adequado, seguindo os padrões estabelecidos no sistema.
