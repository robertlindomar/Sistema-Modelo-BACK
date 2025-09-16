import { 
  validateData
} from "../../../shared/utils/validations";
import { TipoRelatorio } from "@prisma/client";

/**
 * Validações específicas do módulo RelatorioEstagio
 */

// Validação para criar relatório
export function validateCreateRelatorio(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  if (!data.estagioId) {
    errors.push("Estágio é obrigatório");
  } else if (isNaN(Number(data.estagioId)) || Number(data.estagioId) <= 0) {
    errors.push("Estágio deve ser um ID válido");
  }
  
  if (!data.tipo) {
    errors.push("Tipo de relatório é obrigatório");
  } else if (!Object.values(TipoRelatorio).includes(data.tipo)) {
    errors.push("Tipo de relatório deve ser 'Inicial', 'Parcial' ou 'Final'");
  }
  
  if (!data.prazoEntrega) {
    errors.push("Prazo de entrega é obrigatório");
  } else {
    errors.push(...validateData(data.prazoEntrega, "Prazo de entrega"));
    
    // Validar se prazo é futuro ou igual à data atual
    const prazo = new Date(data.prazoEntrega);
    const hoje = new Date();
    // Permitir prazo igual à data atual (hoje)
    if (prazo < hoje) {
      errors.push("Prazo de entrega deve ser posterior ou igual à data atual");
    }
  }
  
  // Validações opcionais
  if (data.dataEntregue) {
    errors.push(...validateData(data.dataEntregue, "Data de entrega"));
    
    // Validar se data de entrega é válida
    const entregue = new Date(data.dataEntregue);
    const hoje = new Date();
    if (entregue > hoje) {
      errors.push("Data de entrega não pode ser futura");
    }
    
    // Validar se data de entrega não é posterior ao prazo (permite igual)
    if (data.prazoEntrega) {
      const prazo = new Date(data.prazoEntrega);
      if (entregue > prazo) {
        errors.push("Data de entrega não pode ser posterior ao prazo de entrega");
      }
    }
  }
  
  // Validações de tamanho
  if (data.observacao && data.observacao.length > 500) {
    errors.push("Observação deve ter no máximo 500 caracteres");
  }
  
  return errors;
}

// Validação para atualizar relatório
export function validateUpdateRelatorio(data: any): string[] {
  const errors: string[] = [];
  
  // Validações opcionais (apenas se fornecidas)
  if (data.estagioId !== undefined) {
    if (isNaN(Number(data.estagioId)) || Number(data.estagioId) <= 0) {
      errors.push("Estágio deve ser um ID válido");
    }
  }
  
  if (data.tipo !== undefined) {
    if (!Object.values(TipoRelatorio).includes(data.tipo)) {
      errors.push("Tipo de relatório deve ser 'Inicial', 'Parcial' ou 'Final'");
    }
  }
  
  if (data.prazoEntrega !== undefined) {
    errors.push(...validateData(data.prazoEntrega, "Prazo de entrega"));
    
    // Validar se prazo é futuro ou igual à data atual
    const prazo = new Date(data.prazoEntrega);
    const hoje = new Date();
    // Permitir prazo igual à data atual (hoje)
    if (prazo < hoje) {
      errors.push("Prazo de entrega deve ser posterior ou igual à data atual");
    }
  }
  
  if (data.dataEntregue !== undefined && data.dataEntregue !== '') {
    errors.push(...validateData(data.dataEntregue, "Data de entrega"));
    
    // Validar se data de entrega é válida
    const entregue = new Date(data.dataEntregue);
    const hoje = new Date();
    if (entregue > hoje) {
      errors.push("Data de entrega não pode ser futura");
    }
    
    // Validar se data de entrega não é posterior ao prazo (permite igual)
    if (data.prazoEntrega) {
      const prazo = new Date(data.prazoEntrega);
      if (entregue > prazo) {
        errors.push("Data de entrega não pode ser posterior ao prazo de entrega");
      }
    }
  }
  
  // Validações de tamanho
  if (data.observacao !== undefined && data.observacao && data.observacao.length > 500) {
    errors.push("Observação deve ter no máximo 500 caracteres");
  }
  
  return errors;
}

// Validação para paginação
export function validatePaginationQuery(query: any): string[] {
  const errors: string[] = [];
  
  if (query.page !== undefined) {
    const pageNum = Number(query.page);
    if (isNaN(pageNum) || !Number.isInteger(pageNum) || pageNum < 1) {
      errors.push("Page deve ser um número inteiro positivo");
    }
  }
  
  if (query.limit !== undefined) {
    const limitNum = Number(query.limit);
    if (isNaN(limitNum) || !Number.isInteger(limitNum) || limitNum < 1) {
      errors.push("Limit deve ser um número inteiro positivo");
    } else if (limitNum > 100) {
      errors.push("Limit deve ser no máximo 100");
    }
  }
  
  if (query.tipo !== undefined) {
    if (!Object.values(TipoRelatorio).includes(query.tipo)) {
      errors.push("Tipo de relatório deve ser 'Inicial', 'Parcial' ou 'Final'");
    }
  }
  
  if (query.status !== undefined) {
    const statusValidos = ['pendente', 'entregue', 'atrasado'];
    if (!statusValidos.includes(query.status)) {
      errors.push("Status deve ser 'pendente', 'entregue' ou 'atrasado'");
    }
  }
  
  if (query.search !== undefined && query.search && query.search.length > 100) {
    errors.push("Busca deve ter no máximo 100 caracteres");
  }
  
  return errors;
}

// Validação para ID de estágio
export function validateEstagioIdParam(params: any): string[] {
  const errors: string[] = [];
  if (!params.estagioId) {
    errors.push("ID do estágio é obrigatório");
    return errors;
  }
  
  const id = Number(params.estagioId);
  if (isNaN(id)) {
    errors.push("ID do estágio deve ser um número");
  } else if (id <= 0) {
    errors.push("ID do estágio deve ser um número positivo");
  } else if (!Number.isInteger(id)) {
    errors.push("ID do estágio deve ser um número inteiro");
  }
  
  return errors;
}