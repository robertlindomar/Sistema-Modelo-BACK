import { 
  validateNome, 
  validateUF
} from "../../../shared/utils/validations";

/**
 * Validações específicas do módulo Cidade
 */

// Validação para criar cidade
export function validateCreateCidade(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  errors.push(...validateUF(data.uf));
  
  return errors;
}

// Validação para atualizar cidade
export function validateUpdateCidade(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  errors.push(...validateUF(data.uf));
  
  return errors;
}

// Validação para buscar por nome
export function validateNomeParam(params: any): string[] {
  const errors: string[] = [];
  
  if (!params.nome) {
    errors.push("Nome é obrigatório");
  } else if (typeof params.nome !== 'string' || params.nome.trim() === '') {
    errors.push("Nome deve ser uma string válida");
  }
  
  return errors;
}

// Validação para buscar por UF
export function validateUFParam(params: any): string[] {
  const errors: string[] = [];
  
  if (!params.uf) {
    errors.push("UF é obrigatória");
  } else {
    errors.push(...validateUF(params.uf));
  }
  
  return errors;
}
