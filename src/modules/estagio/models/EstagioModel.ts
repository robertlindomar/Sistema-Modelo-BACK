import { AlunoResponseDTO } from "../../aluno/dtos/AlunoResponseDTO";
import { CursoResponseDTO } from "../../curso/dtos/CursoResponseDTO";
import { EmpresaResponseDTO } from "../../empresa/dtos/EmpresaResponseDTO";
import { InstituicaoResponseDTO } from "../../Instituicao/dtos/InstituicaoResponseDTO";
import { SeguradoraResponseDTO } from "../../seguradora/dtos/SeguradoraResponseDTO";
import { TipoEstagio, StatusEstagio } from "@prisma/client";
import { EstagioRequestDTO } from "../dtos/EstagioRequestDTO";
import { EstagioUpdateDTO } from "../dtos/EstagioUpdateDTO";
import { EstagioCompletoResponseDTO } from "../dtos/EstagioCompletoResponseDTO";
import { MotivoEncerramentoEstagioResponseDTO } from "../../motivoEncerramentoEstagio/dtos/MotivoEncerramentoEstagioResponseDTO";

export class EstagioModel {
    id?: number;
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

    // Relacionamentos
    aluno?: AlunoResponseDTO;
    empresa?: EmpresaResponseDTO;
    instituicao?: InstituicaoResponseDTO;
    seguradora?: SeguradoraResponseDTO;
    motivoEncerramento?: MotivoEncerramentoEstagioResponseDTO;

    constructor(
        id: number | undefined,
        alunoId: number,
        empresaId: number,
        instituicaoId: number,
        cursoId: number | undefined,
        tipo: TipoEstagio,
        remunerado: boolean,
        origemInstituicao: string | undefined,
        dataInicio: string,
        dataTermino: string,
        cargaHorariaSemanal: number | undefined,
        bolsaAuxilio: string | undefined,
        seguroApolice: string | undefined,
        seguradoraId: number | undefined,
        status: StatusEstagio,
        dataAssinatura: string | undefined,
        dataCancelamento: string | undefined,
        motivoEncerramentoId: number | undefined,
        possuiResponsavelMenor: boolean,
        aluno?: AlunoResponseDTO,
        empresa?: EmpresaResponseDTO,
        instituicao?: InstituicaoResponseDTO,
        seguradora?: SeguradoraResponseDTO,
        motivoEncerramento?: MotivoEncerramentoEstagioResponseDTO
    ) {
        this.id = id;
        this.alunoId = alunoId;
        this.empresaId = empresaId;
        this.instituicaoId = instituicaoId;
        this.cursoId = cursoId;
        this.tipo = tipo;
        this.remunerado = remunerado;
        this.origemInstituicao = origemInstituicao;
        this.dataInicio = dataInicio;
        this.dataTermino = dataTermino;
        this.cargaHorariaSemanal = cargaHorariaSemanal;
        this.bolsaAuxilio = bolsaAuxilio;
        this.seguroApolice = seguroApolice;
        this.seguradoraId = seguradoraId;
        this.status = status;
        this.dataAssinatura = dataAssinatura;
        this.dataCancelamento = dataCancelamento;
        this.motivoEncerramentoId = motivoEncerramentoId;
        this.possuiResponsavelMenor = possuiResponsavelMenor;
        this.aluno = aluno;
        this.empresa = empresa;
        this.instituicao = instituicao;
        this.seguradora = seguradora;
        this.motivoEncerramento = motivoEncerramento;
    }


    static dtos(dto: EstagioRequestDTO): EstagioModel {
        return new EstagioModel(
            undefined,
            dto.alunoId,
            dto.empresaId,
            dto.instituicaoId,
            dto.cursoId,
            dto.tipo,
            dto.remunerado,
            dto.origemInstituicao,
            dto.dataInicio,
            dto.dataTermino,
            dto.cargaHorariaSemanal,
            dto.bolsaAuxilio,
            dto.seguroApolice,
            dto.seguradoraId,
            dto.status,
            dto.dataAssinatura,
            dto.dataCancelamento,
            dto.motivoEncerramentoId,
            dto.possuiResponsavelMenor
        );
    }

    static updateDtos(dto: EstagioUpdateDTO): any {
        const updateData: any = {};
        
        if (dto.alunoId !== undefined) updateData.alunoId = dto.alunoId;
        if (dto.empresaId !== undefined) updateData.empresaId = dto.empresaId;
        if (dto.instituicaoId !== undefined) updateData.instituicaoId = dto.instituicaoId;
        if (dto.tipo !== undefined) updateData.tipo = dto.tipo;
        if (dto.remunerado !== undefined) updateData.remunerado = dto.remunerado;
        if (dto.origemInstituicao !== undefined) updateData.origemInstituicao = dto.origemInstituicao;
        if (dto.dataInicio !== undefined) updateData.dataInicio = dto.dataInicio;
        if (dto.dataTermino !== undefined) updateData.dataTermino = dto.dataTermino;
        if (dto.cargaHorariaSemanal !== undefined) updateData.cargaHorariaSemanal = dto.cargaHorariaSemanal;
        if (dto.bolsaAuxilio !== undefined) updateData.bolsaAuxilio = dto.bolsaAuxilio;
        if (dto.seguroApolice !== undefined) updateData.seguroApolice = dto.seguroApolice;
        if (dto.seguradoraId !== undefined) updateData.seguradoraId = dto.seguradoraId;
        if (dto.status !== undefined) updateData.status = dto.status;
        if (dto.dataAssinatura !== undefined) updateData.dataAssinatura = dto.dataAssinatura;
        if (dto.dataCancelamento !== undefined) updateData.dataCancelamento = dto.dataCancelamento;
        if (dto.motivoEncerramentoId !== undefined) updateData.motivoEncerramentoId = dto.motivoEncerramentoId;
        if (dto.possuiResponsavelMenor !== undefined) updateData.possuiResponsavelMenor = dto.possuiResponsavelMenor;
        if (dto.cursoId !== undefined) updateData.cursoId = dto.cursoId;
        
        return updateData;
    }

    static prismaParaModel(data: any): EstagioModel {
        return new EstagioModel(
            data.id,
            data.alunoId,
            data.empresaId,
            data.instituicaoId,
            data.cursoId,
            data.tipo,
            data.remunerado,
            data.origemInstituicao,
            data.dataInicio,
            data.dataTermino,
            data.cargaHorariaSemanal,
            data.bolsaAuxilio,
            data.seguroApolice,
            data.seguradoraId,
            data.status,
            data.dataAssinatura,
            data.dataCancelamento,
            data.motivoEncerramentoId,
            data.possuiResponsavelMenor,
            data.aluno ? {
                id: data.aluno.id,
                nome: data.aluno.nome,
                rg: data.aluno.rg,
                cpf: data.aluno.cpf,
                endereco: data.aluno.endereco,
                cidadeId: data.aluno.cidadeId,
                cursoId: data.aluno.cursoId,
                serie: data.aluno.serie,
                telefone: data.aluno.telefone,
                telefonePai: data.aluno.telefonePai,
                email: data.aluno.email,
                dataNascimento: data.aluno.dataNascimento
            } : undefined,
            data.empresa ? {
                id: data.empresa.id,
                nome: data.empresa.nome,
                nomeFantasia: data.empresa.nomeFantasia,
                cnpj: data.empresa.cnpj,
                cpfAutonomo: data.empresa.cpfAutonomo,
                numClassAutonomo: data.empresa.numClassAutonomo,
                endereco: data.empresa.endereco,
                cidadeId: data.empresa.cidadeId,
                telefone1: data.empresa.telefone1,
                telefone2: data.empresa.telefone2,
                email: data.empresa.email,
                representante: data.empresa.representante,
                cargoRepresentante: data.empresa.cargoRepresentante
            } : undefined,
            data.instituicao ? {
                id: data.instituicao.id,
                nome: data.instituicao.nome,
                nomeFantasia: data.instituicao.nomeFantasia,
                cnpj: data.instituicao.cnpj,
                endereco: data.instituicao.endereco,
                cidadeId: data.instituicao.cidadeId,
                telefone: data.instituicao.telefone,
                email: data.instituicao.email,
                nomeDiretor: data.instituicao.nomeDiretor,
                cpfDiretor: data.instituicao.cpfDiretor
            } : undefined,
            data.seguradora ? {
                id: data.seguradora.id,
                nome: data.seguradora.nome
            } : undefined,
            data.motivoEncerramento ? {
                id: data.motivoEncerramento.id,
                estagioId: data.motivoEncerramento.estagioId,
                motivoPrincipal: data.motivoEncerramento.motivoPrincipal,
                motivoPrincipalOutros: data.motivoEncerramento.motivoPrincipalOutros,
                motivosEmpresa: data.motivoEncerramento.motivosEmpresa,
                motivosEmpresaOutros: data.motivoEncerramento.motivosEmpresaOutros,
                dataRegistro: data.motivoEncerramento.dataRegistro
            } : undefined
        );
    }

    dataParaPrisma() {
        return {
            alunoId: this.alunoId,
            empresaId: this.empresaId,
            instituicaoId: this.instituicaoId,
            cursoId: this.cursoId,
            tipo: this.tipo,
            remunerado: this.remunerado,
            origemInstituicao: this.origemInstituicao,
            dataInicio: this.dataInicio,
            dataTermino: this.dataTermino,
            cargaHorariaSemanal: this.cargaHorariaSemanal,
            bolsaAuxilio: this.bolsaAuxilio,
            seguroApolice: this.seguroApolice,
            seguradoraId: this.seguradoraId,
            status: this.status,
            dataAssinatura: this.dataAssinatura,
            dataCancelamento: this.dataCancelamento,
            motivoEncerramentoId: this.motivoEncerramentoId,
            possuiResponsavelMenor: this.possuiResponsavelMenor
        };
    }

    toResponse(): EstagioCompletoResponseDTO {
        return {
            id: this.id!,
            alunoId: this.alunoId,
            empresaId: this.empresaId,
            instituicaoId: this.instituicaoId,
            cursoId: this.cursoId,
            tipo: this.tipo,
            remunerado: this.remunerado,
            origemInstituicao: this.origemInstituicao,
            dataInicio: this.dataInicio,
            dataTermino: this.dataTermino,
            cargaHorariaSemanal: this.cargaHorariaSemanal,
            bolsaAuxilio: this.bolsaAuxilio,
            seguroApolice: this.seguroApolice,
            seguradoraId: this.seguradoraId,
            status: this.status,
            dataAssinatura: this.dataAssinatura,
            dataCancelamento: this.dataCancelamento,
            motivoEncerramentoId: this.motivoEncerramentoId,
            possuiResponsavelMenor: this.possuiResponsavelMenor,
            aluno: this.aluno,
            empresa: this.empresa,
            instituicao: this.instituicao,
            seguradora: this.seguradora,
            motivoEncerramento: this.motivoEncerramento
        };

    }

}
