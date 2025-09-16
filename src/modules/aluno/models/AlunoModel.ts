import { AlunoRequestDTO } from "../dtos/AlunoRequestDTO";
import { AlunoUpdateDTO } from "../dtos/AlunoUpdateDTO";
import { CidadeResponseDTO } from "../../cidade/dtos/CidadeResponseDTO";
import { CursoResponseDTO } from "../../curso/dtos/CursoResponseDTO";
import { AlunoComCidadeCursoResponseDTO } from "../dtos/AlunoComCidadeCursoResponseDTO";

export class AlunoModel {
    id?: number;
    nome: string;
    rg?: string;
    cpf?: string;
    endereco?: string;
    cidadeId: number;
    cursoId: number;
    serie?: string;
    telefone?: string;
    telefonePai?: string;
    email?: string;
    dataNascimento?: Date;
    cidade?: CidadeResponseDTO;
    curso?: CursoResponseDTO;

    constructor(
        id?: number,
        nome?: string,
        rg?: string,
        cpf?: string,
        endereco?: string,
        cidadeId?: number,
        cursoId?: number,
        serie?: string,
        telefone?: string,
        telefonePai?: string,
        email?: string,
        dataNascimento?: Date,
        cidade?: CidadeResponseDTO,
        curso?: CursoResponseDTO
    ) {
        this.id = id;
        this.nome = nome ?? '';
        this.rg = rg;
        this.cpf = cpf;
        this.endereco = endereco;
        this.cidadeId = cidadeId ?? 0;
        this.cursoId = cursoId ?? 0;
        this.serie = serie;
        this.telefone = telefone;
        this.telefonePai = telefonePai;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.cidade = cidade;
        this.curso = curso;
    }

    static dtos(dto: AlunoRequestDTO): AlunoModel {
        return new AlunoModel(
            undefined,
            dto.nome,
            dto.rg,
            dto.cpf,
            dto.endereco,
            dto.cidadeId,
            dto.cursoId,
            dto.serie,
            dto.telefone,
            dto.telefonePai,
            dto.email,
            dto.dataNascimento
        );
    }

    static updateDtos(dto: AlunoUpdateDTO): any {
        const updateData: any = {};
        
        if (dto.nome !== undefined) updateData.nome = dto.nome;
        if (dto.rg !== undefined) updateData.rg = dto.rg;
        if (dto.cpf !== undefined) updateData.cpf = dto.cpf;
        if (dto.endereco !== undefined) updateData.endereco = dto.endereco;
        if (dto.cidadeId !== undefined) updateData.cidadeId = dto.cidadeId;
        if (dto.cursoId !== undefined) updateData.cursoId = dto.cursoId;
        if (dto.serie !== undefined) updateData.serie = dto.serie;
        if (dto.telefone !== undefined) updateData.telefone = dto.telefone;
        if (dto.telefonePai !== undefined) updateData.telefonePai = dto.telefonePai;
        if (dto.email !== undefined) updateData.email = dto.email;
        if (dto.dataNascimento !== undefined) updateData.dataNascimento = dto.dataNascimento;
        
        return updateData;
    }

    static prismaParaModel(data: any): AlunoModel {
        return new AlunoModel(
            data.id,
            data.nome,
            data.rg,
            data.cpf,
            data.endereco,
            data.cidadeId,
            data.cursoId,
            data.serie,
            data.telefone,
            data.telefonePai,
            data.email,
            data.dataNascimento,
            data.cidade ? {
                id: data.cidade.id,
                nome: data.cidade.nome,
                uf: data.cidade.uf
            } : undefined,
            data.curso ? {
                id: data.curso.id,
                nome: data.curso.nome,
                habilitacao: data.curso.habilitacao,
                nivel: data.curso.nivel
            } : undefined
        );
    }

    dataParaPrisma() {
        return {
            nome: this.nome,
            rg: this.rg,
            cpf: this.cpf,
            endereco: this.endereco,
            cidadeId: this.cidadeId,
            cursoId: this.cursoId,
            serie: this.serie,
            telefone: this.telefone,
            telefonePai: this.telefonePai,
            email: this.email,
            dataNascimento: this.dataNascimento,
        };
    }

    toResponse(): AlunoComCidadeCursoResponseDTO {
        return {
            id: this.id!,
            nome: this.nome,
            rg: this.rg,
            cpf: this.cpf,
            endereco: this.endereco,
            cidadeId: this.cidadeId,
            cursoId: this.cursoId,
            serie: this.serie,
            telefone: this.telefone,
            telefonePai: this.telefonePai,
            email: this.email,
            dataNascimento: this.dataNascimento,
            cidade: this.cidade!,
            curso: this.curso!
        };
    }
}
