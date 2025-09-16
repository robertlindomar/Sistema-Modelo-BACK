import { DiaSemana } from '@prisma/client';

export function validateCreateEstagioHorario(data: any): string[] {
    const errors: string[] = [];

    if (!data.estagioId) {
        errors.push("ID do estágio é obrigatório");
    } else if (isNaN(Number(data.estagioId)) || Number(data.estagioId) <= 0) {
        errors.push("ID do estágio deve ser um número válido");
    }

    if (!data.diaSemana) {
        errors.push("Dia da semana é obrigatório");
    } else if (!Object.values(DiaSemana).includes(data.diaSemana as DiaSemana)) {
        errors.push("Dia da semana deve ser um valor válido");
    }

    if (!data.horarioInicio) {
        errors.push("Horário de início é obrigatório");
    }

    if (!data.horarioFim) {
        errors.push("Horário de fim é obrigatório");
    }

    if (data.horarioInicio && data.horarioFim && data.horarioInicio >= data.horarioFim) {
        errors.push("Horário de início deve ser menor que horário de fim");
    }

    return errors;
}

export function validateCreateEstagioHorarioLote(data: any): string[] {
    const errors: string[] = [];

    if (!data.estagioId) {
        errors.push("ID do estágio é obrigatório");
    } else if (isNaN(Number(data.estagioId)) || Number(data.estagioId) <= 0) {
        errors.push("ID do estágio deve ser um número válido");
    }

    if (!data.diasSemana) {
        errors.push("Dias da semana são obrigatórios");
    } else if (!Array.isArray(data.diasSemana) || data.diasSemana.length === 0) {
        errors.push("Selecione pelo menos um dia da semana");
        } else {
            // Validar cada dia da semana
            for (const dia of data.diasSemana) {
                if (!Object.values(DiaSemana).includes(dia as DiaSemana)) {
                    errors.push(`Dia da semana inválido: ${dia}`);
                }
            }
        }

    if (!data.horarios) {
        errors.push("Horários são obrigatórios");
    } else if (!Array.isArray(data.horarios) || data.horarios.length === 0) {
        errors.push("Adicione pelo menos um horário");
    } else {
        // Validar cada horário
        for (let i = 0; i < data.horarios.length; i++) {
            const horario = data.horarios[i];
            if (!horario.horarioInicio) {
                errors.push(`Horário de início é obrigatório para o horário ${i + 1}`);
            }
            if (!horario.horarioFim) {
                errors.push(`Horário de fim é obrigatório para o horário ${i + 1}`);
            }
            if (horario.horarioInicio && horario.horarioFim && horario.horarioInicio >= horario.horarioFim) {
                errors.push(`Horário de início deve ser menor que horário de fim para o horário ${i + 1}`);
            }
        }
    }

    return errors;
}

export function validateUpdateEstagioHorario(data: any): string[] {
    const errors: string[] = [];

    if (!data.estagioId) {
        errors.push("ID do estágio é obrigatório");
    } else if (isNaN(Number(data.estagioId)) || Number(data.estagioId) <= 0) {
        errors.push("ID do estágio deve ser um número válido");
    }

    if (!data.diaSemana) {
        errors.push("Dia da semana é obrigatório");
    } else if (!Object.values(DiaSemana).includes(data.diaSemana as DiaSemana)) {
        errors.push("Dia da semana deve ser um valor válido");
    }

    if (!data.horarioInicio) {
        errors.push("Horário de início é obrigatório");
    }

    if (!data.horarioFim) {
        errors.push("Horário de fim é obrigatório");
    }

    // Validação mais flexível para horários
    if (data.horarioInicio && data.horarioFim) {
        // Se são strings no formato HH:MM, comparar diretamente
        if (typeof data.horarioInicio === 'string' && typeof data.horarioFim === 'string') {
            if (data.horarioInicio.includes(':') && data.horarioFim.includes(':')) {
                if (data.horarioInicio >= data.horarioFim) {
                    errors.push("Horário de início deve ser menor que horário de fim");
                }
            }
        }
    }

    return errors;
}
