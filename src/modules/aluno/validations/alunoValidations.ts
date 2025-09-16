import { 
  validateNome, 
  validateCPF,
  validateTelefone,
  validateEmailFormat,
  validateData
} from "../../../shared/utils/validations";

/**
 * Validações específicas do módulo Aluno
 */

// Validação para criar aluno
export function validateCreateAluno(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  
  if (!data.cidadeId) {
    errors.push("Cidade é obrigatória");
  } else if (isNaN(Number(data.cidadeId)) || Number(data.cidadeId) <= 0) {
    errors.push("Cidade deve ser um ID válido");
  }
  
  if (!data.cursoId) {
    errors.push("Curso é obrigatório");
  } else if (isNaN(Number(data.cursoId)) || Number(data.cursoId) <= 0) {
    errors.push("Curso deve ser um ID válido");
  }
  
  // Validações opcionais
  if (data.cpf) {
    errors.push(...validateCPF(data.cpf));
  }
  
  if (data.telefone) {
    errors.push(...validateTelefone(data.telefone, "Telefone"));
  }
  
  if (data.telefonePai) {
    errors.push(...validateTelefone(data.telefonePai, "Telefone do pai"));
  }
  
  if (data.email) {
    errors.push(...validateEmailFormat(data.email));
  }
  
  if (data.dataNascimento) {
    errors.push(...validateData(data.dataNascimento, "Data de nascimento"));
  }
  
  // Validações de tamanho
  if (data.rg && data.rg.length > 20) {
    errors.push("RG deve ter no máximo 20 caracteres");
  }
  
  if (data.endereco && data.endereco.length > 150) {
    errors.push("Endereço deve ter no máximo 150 caracteres");
  }
  
  if (data.serie && data.serie.length > 20) {
    errors.push("Série deve ter no máximo 20 caracteres");
  }
  
  return errors;
}

// Validação para atualizar aluno
export function validateUpdateAluno(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  
  if (!data.cidadeId) {
    errors.push("Cidade é obrigatória");
  } else if (isNaN(Number(data.cidadeId)) || Number(data.cidadeId) <= 0) {
    errors.push("Cidade deve ser um ID válido");
  }
  
  if (!data.cursoId) {
    errors.push("Curso é obrigatório");
  } else if (isNaN(Number(data.cursoId)) || Number(data.cursoId) <= 0) {
    errors.push("Curso deve ser um ID válido");
  }
  
  // Validações opcionais
  if (data.cpf) {
    errors.push(...validateCPF(data.cpf));
  }
  
  if (data.telefone) {
    errors.push(...validateTelefone(data.telefone, "Telefone"));
  }
  
  if (data.telefonePai) {
    errors.push(...validateTelefone(data.telefonePai, "Telefone do pai"));
  }
  
  if (data.email) {
    errors.push(...validateEmailFormat(data.email));
  }
  
  if (data.dataNascimento) {
    errors.push(...validateData(data.dataNascimento, "Data de nascimento"));
  }
  
  // Validações de tamanho
  if (data.rg && data.rg.length > 20) {
    errors.push("RG deve ter no máximo 20 caracteres");
  }
  
  if (data.endereco && data.endereco.length > 150) {
    errors.push("Endereço deve ter no máximo 150 caracteres");
  }
  
  if (data.serie && data.serie.length > 20) {
    errors.push("Série deve ter no máximo 20 caracteres");
  }
  
  return errors;
}
