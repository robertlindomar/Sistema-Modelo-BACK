# Módulo Gerar Termo - Template Word

Este módulo gera termos de estágio usando um template Word personalizado com substituição automática de placeholders.

## 🎯 Funcionalidades

- ✅ **Geração com Template Word** - Usa `termo_estagio_template.docx` como base
- ✅ **Fallback Automático** - Se template falhar, usa geração programática
- ✅ **Substituição de Placeholders** - Substitui automaticamente todos os campos
- ✅ **Download Direto** - Gera e baixa o arquivo automaticamente

## 📋 Placeholders Suportados

| Placeholder                         | Descrição                 | Exemplo                                            |
| ----------------------------------- | ------------------------- | -------------------------------------------------- |
| `{{CONCEDENTE_NOME}}`               | Nome da empresa           | EMPRESA EXEMPLO LTDA                               |
| `{{CONCEDENTE_ENDERECO}}`           | Endereço da empresa       | AV. EXEMPLO, 123                                   |
| `{{CONCEDENTE_CIDADE_UF}}`          | Cidade-UF da empresa      | SÃO PAULO-SP                                       |
| `{{CONCEDENTE_CNPJ}}`               | CNPJ da empresa           | 12.345.678/0001-90                                 |
| `{{ALUNO_NOME}}`                    | Nome do aluno             | JOÃO DA SILVA                                      |
| `{{ALUNO_RG}}`                      | RG do aluno               | 12.345.678-9                                       |
| `{{ALUNO_ENDERECO}}`                | Endereço do aluno         | RUA EXEMPLO, 456                                   |
| `{{ALUNO_CIDADE_UF}}`               | Cidade-UF do aluno        | SANTOS-SP                                          |
| `{{ALUNO_CPF}}`                     | CPF do aluno              | 123.456.789-00                                     |
| `{{ALUNO_SERIE}}`                   | Série do aluno            | 3º                                                 |
| `{{CURSO_HABILITACAO}}`             | Habilitação do curso      | TÉCNICO EM INFORMÁTICA                             |
| `{{INSTITUICAO_NOME}}`              | Nome da instituição       | ETEC EXEMPLO                                       |
| `{{ESTAGIO_DATA_INICIO}}`           | Data de início            | 01/01/2024                                         |
| `{{ESTAGIO_DATA_TERMINO}}`          | Data de término           | 31/12/2024                                         |
| `{{ESTAGIO_CARGA_HORARIA_SEMANAL}}` | Carga horária semanal     | 20                                                 |
| `{{ESTAGIO_CARGA_HORARIA_EXTENSO}}` | Carga horária por extenso | vinte                                              |
| `{{ESTAGIO_HORARIOS_DETALHADOS}}`   | Horários formatados       | das 08:00 às 12:00, de segunda-feira a sexta-feira |
| `{{ESTAGIO_BOLSA_AUXILIO_VALOR}}`   | Valor da bolsa            | R$ 500,00                                          |
| `{{ESTAGIO_BOLSA_AUXILIO_EXTENSO}}` | Valor por extenso         | quinhentos reais                                   |
| `{{ESTAGIO_SEGURO_APOLICE}}`        | Número da apólice         | 123456789                                          |
| `{{ESTAGIO_NOME_SEGURADORA}}`       | Nome da seguradora        | SEGURADORA EXEMPLO                                 |
| `{{ESTAGIO_DATA_ASSINATURA}}`       | Data de assinatura        | 15 de janeiro de 2024                              |

## 🚀 API Endpoints

### POST `/gerar-termo/:estagioId/template`

Gera termo de estágio usando template Word.

**Parâmetros:**

- `estagioId` (path) - ID do estágio
- `outputPath` (body, opcional) - Caminho de saída do arquivo

**Exemplo:**

```bash
POST /gerar-termo/1/template
{
  "outputPath": "meu_termo.docx"
}
```

### GET `/gerar-termo/:estagioId/dados`

Busca dados completos do estágio para preview.

**Parâmetros:**

- `estagioId` (path) - ID do estágio

**Exemplo:**

```bash
GET /gerar-termo/1/dados
```

### GET `/gerar-termo/:estagioId/download`

Gera e faz download do termo de estágio.

**Parâmetros:**

- `estagioId` (path) - ID do estágio

**Exemplo:**

```bash
GET /gerar-termo/1/download
```

## 🛠️ Uso Programático

```typescript
import {
  gerarTermoComTemplate,
  buscarDadosEstagioCompleto,
} from "./gerarTermo";

// Buscar dados do estágio
const dados = await buscarDadosEstagioCompleto(1);
console.log("Dados:", dados);

// Gerar termo com template
const sucesso = await gerarTermoComTemplate(1, "meu_termo.docx");
if (sucesso) {
  console.log("Termo gerado com sucesso!");
}
```

## 📁 Estrutura de Arquivos

```
gerarTermo/
├── controllers/
│   └── GerarTermoController.ts    # Controllers da API
├── gerarTermo.ts                  # Lógica principal
├── routes.ts                      # Definição das rotas
├── termo_estagio_template.docx    # Template Word
└── README.md                      # Esta documentação
```

## 🔧 Configuração

1. **Template Word**: Coloque seu template em `termo_estagio_template.docx`
2. **Placeholders**: Use a sintaxe `{{NOME_DO_CAMPO}}` no template
3. **Fallback**: Se o template falhar, usa geração programática automaticamente

## 🧪 Teste

```bash
# Teste via script
node teste-template.js

# Teste via API
curl -X POST http://localhost:3000/gerar-termo/1/template
curl -X GET http://localhost:3000/gerar-termo/1/download
```

## ⚠️ Notas Importantes

- O template deve estar no formato `.docx`
- Use placeholders com chaves duplas: `{{CAMPO}}`
- O sistema tem fallback automático se o template falhar
- Todos os campos são opcionais e têm valores padrão
