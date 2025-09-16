import { 
  validateData
} from "../../../shared/utils/validations";
import { TipoEstagio, StatusEstagio } from "@prisma/client";

/**
 * Validações específicas do módulo Estagio
 */

// Validação para criar estágio
export function validateCreateEstagio(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  if (!data.alunoId) {
    errors.push("Aluno é obrigatório");
  } else if (isNaN(Number(data.alunoId)) || Number(data.alunoId) <= 0) {
    errors.push("Aluno deve ser um ID válido");
  }
  
  if (!data.empresaId) {
    errors.push("Empresa é obrigatória");
  } else if (isNaN(Number(data.empresaId)) || Number(data.empresaId) <= 0) {
    errors.push("Empresa deve ser um ID válido");
  }
  
  if (!data.instituicaoId) {
    errors.push("Instituição é obrigatória");
  } else if (isNaN(Number(data.instituicaoId)) || Number(data.instituicaoId) <= 0) {
    errors.push("Instituição deve ser um ID válido");
  }
  
  if (!data.tipo) {
    errors.push("Tipo de estágio é obrigatório");
  } else if (!Object.values(TipoEstagio).includes(data.tipo)) {
    errors.push("Tipo de estágio deve ser 'Obrigatório' ou 'Não Obrigatório'");
  }
  
  if (typeof data.remunerado !== 'boolean') {
    errors.push("Campo 'remunerado' deve ser verdadeiro ou falso");
  }
  
  if (!data.dataInicio) {
    errors.push("Data de início é obrigatória");
  } else {
    errors.push(...validateData(data.dataInicio, "Data de início"));
  }
  
  if (!data.dataTermino) {
    errors.push("Data de término é obrigatória");
  } else {
    errors.push(...validateData(data.dataTermino, "Data de término"));
  }
  
  if (!data.status) {
    errors.push("Status é obrigatório");
  } else if (!Object.values(StatusEstagio).includes(data.status)) {
    errors.push("Status deve ser 'Ativo', 'Cancelado' ou 'Concluído'");
  }
  
  if (typeof data.possuiResponsavelMenor !== 'boolean') {
    errors.push("Campo 'possuiResponsavelMenor' deve ser verdadeiro ou falso");
  }
  
  // Validações de relacionamento entre datas
  if (data.dataInicio && data.dataTermino && !errors.some(e => e.includes("Data de início") || e.includes("Data de término"))) {
    const dataInicio = new Date(data.dataInicio);
    const dataTermino = new Date(data.dataTermino);
    
    if (dataInicio >= dataTermino) {
      errors.push("Data de início deve ser anterior à data de término");
    }
  }
  
  if (data.dataAssinatura) {
    errors.push(...validateData(data.dataAssinatura, "Data de assinatura"));
    
    // Validar se data de assinatura está entre início e término
    if (data.dataInicio && data.dataTermino && !errors.some(e => e.includes("Data de"))) {
      const dataInicio = new Date(data.dataInicio);
      const dataTermino = new Date(data.dataTermino);
      const dataAssinatura = new Date(data.dataAssinatura);
      
      if (dataAssinatura < dataInicio || dataAssinatura > dataTermino) {
        errors.push("Data de assinatura deve estar entre a data de início e término");
      }
    }
  }
  
  // Validações opcionais
  if (data.cargaHorariaSemanal !== undefined) {
    if (typeof data.cargaHorariaSemanal !== 'number' || data.cargaHorariaSemanal <= 0) {
      errors.push("Carga horária semanal deve ser um número positivo");
    } else if (data.cargaHorariaSemanal > 44) {
      errors.push("Carga horária semanal não pode ser superior a 44 horas");
    }
  }
  
  if (data.seguradoraId !== undefined) {
    if (isNaN(Number(data.seguradoraId)) || Number(data.seguradoraId) <= 0) {
      errors.push("Seguradora deve ser um ID válido");
    }
  }
  
  if (data.motivoEncerramentoId !== undefined) {
    if (isNaN(Number(data.motivoEncerramentoId)) || Number(data.motivoEncerramentoId) <= 0) {
      errors.push("Motivo de encerramento deve ser um ID válido");
    }
  }
  
  // Validações de tamanho
  if (data.origemInstituicao && data.origemInstituicao.length > 100) {
    errors.push("Origem da instituição deve ter no máximo 100 caracteres");
  }
  
  if (data.seguroApolice && data.seguroApolice.length > 50) {
    errors.push("Seguro apólice deve ter no máximo 50 caracteres");
  }
  
  return errors;
}

// Validação para atualizar estágio
export function validateUpdateEstagio(data: any): string[] {
  const errors: string[] = [];
  
  // Validações obrigatórias
  if (!data.alunoId) {
    errors.push("Aluno é obrigatório");
  } else if (isNaN(Number(data.alunoId)) || Number(data.alunoId) <= 0) {
    errors.push("Aluno deve ser um ID válido");
  }
  
  if (!data.empresaId) {
    errors.push("Empresa é obrigatória");
  } else if (isNaN(Number(data.empresaId)) || Number(data.empresaId) <= 0) {
    errors.push("Empresa deve ser um ID válido");
  }
  
  if (!data.instituicaoId) {
    errors.push("Instituição é obrigatória");
  } else if (isNaN(Number(data.instituicaoId)) || Number(data.instituicaoId) <= 0) {
    errors.push("Instituição deve ser um ID válido");
  }
  
  if (!data.tipo) {
    errors.push("Tipo de estágio é obrigatório");
  } else if (!Object.values(TipoEstagio).includes(data.tipo)) {
    errors.push("Tipo de estágio deve ser 'Obrigatório' ou 'Não Obrigatório'");
  }
  
  if (typeof data.remunerado !== 'boolean') {
    errors.push("Campo 'remunerado' deve ser verdadeiro ou falso");
  }
  
  if (!data.dataInicio) {
    errors.push("Data de início é obrigatória");
  } else {
    errors.push(...validateData(data.dataInicio, "Data de início"));
  }
  
  if (!data.dataTermino) {
    errors.push("Data de término é obrigatória");
  } else {
    errors.push(...validateData(data.dataTermino, "Data de término"));
  }
  
  if (!data.status) {
    errors.push("Status é obrigatório");
  } else if (!Object.values(StatusEstagio).includes(data.status)) {
    errors.push("Status deve ser 'Ativo', 'Cancelado' ou 'Concluído'");
  }
  
  if (typeof data.possuiResponsavelMenor !== 'boolean') {
    errors.push("Campo 'possuiResponsavelMenor' deve ser verdadeiro ou falso");
  }
  
  // Validações de relacionamento entre datas
  if (data.dataInicio && data.dataTermino && !errors.some(e => e.includes("Data de início") || e.includes("Data de término"))) {
    const dataInicio = new Date(data.dataInicio);
    const dataTermino = new Date(data.dataTermino);
    
    if (dataInicio >= dataTermino) {
      errors.push("Data de início deve ser anterior à data de término");
    }
  }
  
  if (data.dataAssinatura) {
    errors.push(...validateData(data.dataAssinatura, "Data de assinatura"));
    
    // Validar se data de assinatura está entre início e término
    if (data.dataInicio && data.dataTermino && !errors.some(e => e.includes("Data de"))) {
      const dataInicio = new Date(data.dataInicio);
      const dataTermino = new Date(data.dataTermino);
      const dataAssinatura = new Date(data.dataAssinatura);
      
      if (dataAssinatura < dataInicio || dataAssinatura > dataTermino) {
        errors.push("Data de assinatura deve estar entre a data de início e término");
      }
    }
  }
  
  // Validações opcionais
  if (data.cargaHorariaSemanal !== undefined) {
    if (typeof data.cargaHorariaSemanal !== 'number' || data.cargaHorariaSemanal <= 0) {
      errors.push("Carga horária semanal deve ser um número positivo");
    } else if (data.cargaHorariaSemanal > 44) {
      errors.push("Carga horária semanal não pode ser superior a 44 horas");
    }
  }
  
  if (data.seguradoraId !== undefined) {
    if (isNaN(Number(data.seguradoraId)) || Number(data.seguradoraId) <= 0) {
      errors.push("Seguradora deve ser um ID válido");
    }
  }
  
  if (data.motivoEncerramentoId !== undefined) {
    if (isNaN(Number(data.motivoEncerramentoId)) || Number(data.motivoEncerramentoId) <= 0) {
      errors.push("Motivo de encerramento deve ser um ID válido");
    }
  }
  
  // Validações de tamanho
  if (data.origemInstituicao && data.origemInstituicao.length > 100) {
    errors.push("Origem da instituição deve ter no máximo 100 caracteres");
  }
  
  if (data.seguroApolice && data.seguroApolice.length > 50) {
    errors.push("Seguro apólice deve ter no máximo 50 caracteres");
  }
  
  return errors;
}

// Validação para status
export function validateStatusQuery(query: any): string[] {
  const errors: string[] = [];
  
  if (!query.status) {
    errors.push("Status é obrigatório");
    return errors;
  }
  
  const statusValidos = ['Ativo', 'Cancelado', 'Concluído'];
  if (!statusValidos.includes(query.status)) {
    errors.push("Status inválido. Valores permitidos: Ativo, Cancelado, Concluído");
  }
  
  return errors;
}
