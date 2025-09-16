import { TipoEstagio, StatusEstagio } from "@prisma/client";
import { AlunoResponseDTO } from "../../aluno/dtos/AlunoResponseDTO";
import { EmpresaResponseDTO } from "../../empresa/dtos/EmpresaResponseDTO";
import { CursoResponseDTO } from "../../curso/dtos/CursoResponseDTO";
import { InstituicaoResponseDTO } from "../../Instituicao/dtos/InstituicaoResponseDTO";
import { SeguradoraResponseDTO } from "../../seguradora/dtos/SeguradoraResponseDTO";
import { MotivoEncerramentoEstagioResponseDTO } from "../../motivoEncerramentoEstagio/dtos/MotivoEncerramentoEstagioResponseDTO";

export interface EstagioCompletoResponseDTO {
    id: number;
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
    motivoEncerramento?: MotivoEncerramentoEstagioResponseDTO;
    possuiResponsavelMenor: boolean;
    aluno?: AlunoResponseDTO;
    empresa?: EmpresaResponseDTO;
    instituicao?: InstituicaoResponseDTO;
    seguradora?: SeguradoraResponseDTO;
}
