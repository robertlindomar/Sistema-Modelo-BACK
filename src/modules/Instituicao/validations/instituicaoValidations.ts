import { 
  validateNome, 
  validateCNPJ,
  validateCPF,
  validateTelefone,
  validateEmailFormat
} from "../../../shared/utils/validations";

/**
 * Validações específicas do módulo Instituicao
 */

// Validação para criar instituição
export function validateCreateInstituicao(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  errors.push(...validateNome(data.nomeFantasia, "Nome fantasia"));
  
  if (!data.cidadeId) {
    errors.push("Cidade é obrigatória");
  } else if (isNaN(Number(data.cidadeId)) || Number(data.cidadeId) <= 0) {
    errors.push("Cidade deve ser um ID válido");
  }
  
  // Validações opcionais
  if (data.cnpj) {
    errors.push(...validateCNPJ(data.cnpj));
  }
  
  if (data.telefone) {
    errors.push(...validateTelefone(data.telefone, "Telefone"));
  }
  
  if (data.email) {
    errors.push(...validateEmailFormat(data.email));
  }
  
  if (data.cpfDiretor) {
    errors.push(...validateCPF(data.cpfDiretor));
  }
  
  // Validações de tamanho
  if (data.endereco && data.endereco.length > 150) {
    errors.push("Endereço deve ter no máximo 150 caracteres");
  }
  
  if (data.nomeDiretor && data.nomeDiretor.length > 100) {
    errors.push("Nome do diretor deve ter no máximo 100 caracteres");
  }
  
  return errors;
}

// Validação para atualizar instituição
export function validateUpdateInstituicao(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  errors.push(...validateNome(data.nomeFantasia, "Nome fantasia"));
  
  if (!data.cidadeId) {
    errors.push("Cidade é obrigatória");
  } else if (isNaN(Number(data.cidadeId)) || Number(data.cidadeId) <= 0) {
    errors.push("Cidade deve ser um ID válido");
  }
  
  // Validações opcionais
  if (data.cnpj) {
    errors.push(...validateCNPJ(data.cnpj));
  }
  
  if (data.telefone) {
    errors.push(...validateTelefone(data.telefone, "Telefone"));
  }
  
  if (data.email) {
    errors.push(...validateEmailFormat(data.email));
  }
  
  if (data.cpfDiretor) {
    errors.push(...validateCPF(data.cpfDiretor));
  }
  
  // Validações de tamanho
  if (data.endereco && data.endereco.length > 150) {
    errors.push("Endereço deve ter no máximo 150 caracteres");
  }
  
  if (data.nomeDiretor && data.nomeDiretor.length > 100) {
    errors.push("Nome do diretor deve ter no máximo 100 caracteres");
  }
  
  return errors;
}
