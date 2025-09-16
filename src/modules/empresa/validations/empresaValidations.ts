import { 
  validateNome, 
  validateCNPJ,
  validateCPF,
  validateTelefone,
  validateEmailFormat
} from "../../../shared/utils/validations";

/**
 * Validações específicas do módulo Empresa
 */

// Validação para criar empresa
export function validateCreateEmpresa(data: any): string[] {
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
  
  if (data.cpfAutonomo) {
    errors.push(...validateCPF(data.cpfAutonomo));
  }
  
  if (data.telefone1) {
    errors.push(...validateTelefone(data.telefone1, "Telefone 1"));
  }
  
  if (data.telefone2) {
    errors.push(...validateTelefone(data.telefone2, "Telefone 2"));
  }
  
  if (data.email) {
    errors.push(...validateEmailFormat(data.email));
  }
  
  // Validações de tamanho
  if (data.numClassAutonomo && data.numClassAutonomo.length > 25) {
    errors.push("Número de classificação do autônomo deve ter no máximo 25 caracteres");
  }
  
  if (data.endereco && data.endereco.length > 150) {
    errors.push("Endereço deve ter no máximo 150 caracteres");
  }
  
  if (data.representante && data.representante.length > 100) {
    errors.push("Representante deve ter no máximo 100 caracteres");
  }
  
  if (data.cargoRepresentante && data.cargoRepresentante.length > 50) {
    errors.push("Cargo do representante deve ter no máximo 50 caracteres");
  }
  
  return errors;
}

// Validação para atualizar empresa
export function validateUpdateEmpresa(data: any): string[] {
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
  
  if (data.cpfAutonomo) {
    errors.push(...validateCPF(data.cpfAutonomo));
  }
  
  if (data.telefone1) {
    errors.push(...validateTelefone(data.telefone1, "Telefone 1"));
  }
  
  if (data.telefone2) {
    errors.push(...validateTelefone(data.telefone2, "Telefone 2"));
  }
  
  if (data.email) {
    errors.push(...validateEmailFormat(data.email));
  }
  
  // Validações de tamanho
  if (data.numClassAutonomo && data.numClassAutonomo.length > 25) {
    errors.push("Número de classificação do autônomo deve ter no máximo 25 caracteres");
  }
  
  if (data.endereco && data.endereco.length > 150) {
    errors.push("Endereço deve ter no máximo 150 caracteres");
  }
  
  if (data.representante && data.representante.length > 100) {
    errors.push("Representante deve ter no máximo 100 caracteres");
  }
  
  if (data.cargoRepresentante && data.cargoRepresentante.length > 50) {
    errors.push("Cargo do representante deve ter no máximo 50 caracteres");
  }
  
  return errors;
}
