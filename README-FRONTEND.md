# 📄 API de Geração de Termos - Guia Frontend

## 🚀 Como Usar no Frontend

### 1. **Buscar Dados do Estágio**

```javascript
// Buscar dados para preview
const response = await fetch("/gerar-termo/1/dados");
const data = await response.json();

if (data.success) {
  console.log("Dados do estágio:", data.data);
  // Exibir dados na tela
} else {
  console.error("Erro:", data.message);
}
```

### 2. **Gerar Termo com Template**

```javascript
// Gerar termo usando template Word
const response = await fetch("/gerar-termo/1/template", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    outputPath: "termo_estagio_1.docx", // opcional
  }),
});

const result = await response.json();

if (result.success) {
  console.log("Termo gerado com sucesso!");
  // Mostrar mensagem de sucesso
} else {
  console.error("Erro ao gerar termo:", result.message);
}
```

### 3. **Download Direto do Termo**

```javascript
// Download direto do arquivo
const response = await fetch("/gerar-termo/1/download");

if (response.ok) {
  // Criar blob e fazer download
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "termo_estagio.docx";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
} else {
  console.error("Erro no download");
}
```

## 🎯 Exemplo Completo com React

```jsx
import React, { useState } from "react";

function GerarTermo({ estagioId }) {
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState(null);

  // Buscar dados do estágio
  const buscarDados = async () => {
    try {
      const response = await fetch(`/gerar-termo/${estagioId}/dados`);
      const data = await response.json();

      if (data.success) {
        setDados(data.data);
      } else {
        alert("Erro ao buscar dados: " + data.message);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Gerar e baixar termo
  const gerarTermo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/gerar-termo/${estagioId}/download`);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `termo_estagio_${estagioId}.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Erro ao gerar termo");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Geração de Termo de Estágio</h2>

      <button onClick={buscarDados}>Buscar Dados</button>

      <button onClick={gerarTermo} disabled={loading}>
        {loading ? "Gerando..." : "Gerar e Baixar Termo"}
      </button>

      {dados && (
        <div>
          <h3>Dados do Estágio:</h3>
          <p>
            <strong>Aluno:</strong> {dados.aluno_nome}
          </p>
          <p>
            <strong>Empresa:</strong> {dados.empresa_nome}
          </p>
          <p>
            <strong>Curso:</strong> {dados.curso_habilitacao}
          </p>
          <p>
            <strong>Período:</strong> {dados.data_inicio} a {dados.data_termino}
          </p>
        </div>
      )}
    </div>
  );
}

export default GerarTermo;
```

## 🔗 Endpoints Disponíveis

| Método | Endpoint                    | Descrição                |
| ------ | --------------------------- | ------------------------ |
| `GET`  | `/gerar-termo/:id/dados`    | Busca dados do estágio   |
| `POST` | `/gerar-termo/:id/template` | Gera termo com template  |
| `GET`  | `/gerar-termo/:id/download` | Download direto do termo |

## ⚠️ Observações Importantes

- **Sem Autenticação**: As rotas são públicas para facilitar testes
- **Template Automático**: Usa `termo_estagio_template.docx` como base
- **Fallback**: Se template falhar, usa geração programática
- **Formato**: Sempre gera arquivo `.docx` (Word)

## 🎨 Exemplo de Botão Simples

```html
<!-- HTML simples -->
<button onclick="gerarTermo(1)">📄 Gerar Termo de Estágio</button>

<script>
  async function gerarTermo(estagioId) {
    try {
      const response = await fetch(`/gerar-termo/${estagioId}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `termo_estagio_${estagioId}.docx`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }
</script>
```

## 🚀 Pronto para Usar!

A API está funcionando e pronta para ser integrada no seu frontend. Basta chamar os endpoints com o ID do estágio desejado!
