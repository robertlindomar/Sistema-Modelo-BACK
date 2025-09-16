import { TipoEstagio, StatusEstagio } from "@prisma/client";

export interface EstagioUpdateDTO {
    alunoId?: number;
    empresaId?: number;
    instituicaoId?: number;
    tipo?: TipoEstagio;
    remunerado?: boolean;
    origemInstituicao?: string;
    dataInicio?: string;
    dataTermino?: string;
    cargaHorariaSemanal?: number;
    bolsaAuxilio?: string;
    seguroApolice?: string;
    seguradoraId?: number;
    status?: StatusEstagio;
    dataAssinatura?: string;
    dataCancelamento?: string;
    motivoEncerramentoId?: number;
    possuiResponsavelMenor?: boolean;
    cursoId?: number;
}
