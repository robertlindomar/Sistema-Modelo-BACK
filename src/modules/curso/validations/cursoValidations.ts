import { validateNome } from "../../../shared/utils/validations";

/**
 * Validações específicas do módulo Curso
 */

// Validação para criar curso
export function validateCreateCurso(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  
  // Validações opcionais
  if (data.habilitacao && data.habilitacao.length > 100) {
    errors.push("Habilitação deve ter no máximo 100 caracteres");
  }
  
  if (data.nivel && data.nivel.length > 50) {
    errors.push("Nível deve ter no máximo 50 caracteres");
  }
  
  return errors;
}

// Validação para atualizar curso
export function validateUpdateCurso(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  
  // Validações opcionais
  if (data.habilitacao && data.habilitacao.length > 100) {
    errors.push("Habilitação deve ter no máximo 100 caracteres");
  }
  
  if (data.nivel && data.nivel.length > 50) {
    errors.push("Nível deve ter no máximo 50 caracteres");
  }
  
  return errors;
}
