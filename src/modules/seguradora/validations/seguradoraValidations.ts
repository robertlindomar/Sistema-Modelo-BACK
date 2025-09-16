import { validateNome } from "../../../shared/utils/validations";

/**
 * Validações específicas do módulo Seguradora
 */

// Validação para criar seguradora
export function validateCreateSeguradora(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  
  return errors;
}

// Validação para atualizar seguradora
export function validateUpdateSeguradora(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  
  return errors;
}
