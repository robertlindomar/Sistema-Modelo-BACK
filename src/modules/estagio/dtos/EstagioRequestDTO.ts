import { TipoEstagio, StatusEstagio } from "@prisma/client";

export interface EstagioRequestDTO {
    alunoId: number;
    empresaId: number;
    instituicaoId: number;
    cursoId?: number;
    tipo: TipoEstagio;
    remunerado: boolean;
    origemInstituicao?: string;
    dataInicio: string;
    dataTermino: string;
    cargaHorariaSemanal?: number;
    bolsaAuxilio?: string;
    seguroApolice?: string;
    seguradoraId?: number;
    status: StatusEstagio;
    dataAssinatura?: string;
    dataCancelamento?: string;
    motivoEncerramentoId?: number;
    possuiResponsavelMenor: boolean;
}
