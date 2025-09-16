import { InstituicaoRequestDTO } from "../dtos/InstituicaoRequestDTO";
import { InstituicaoUpdateDTO } from "../dtos/InstituicaoUpdateDTO";
import { CidadeResponseDTO } from "../../cidade/dtos/CidadeResponseDTO";
import { InstituicaoComCidadeResponseDTO } from "../dtos/InstituicaoComCidadeResponseDTO";

export class InstituicaoModel {
    id?: number;
    nome: string;
    nomeFantasia: string;
    cnpj?: string;
    endereco?: string;
    cidadeId: number;
    telefone?: string;
    email?: string;
    nomeDiretor?: string;
    cpfDiretor?: string;
    cidade?: CidadeResponseDTO;

    constructor(
        id?: number,
        nome?: string,
        nomeFantasia?: string,
        cnpj?: string,
        endereco?: string,
        cidadeId?: number,
        telefone?: string,
        email?: string,
        nomeDiretor?: string,
        cpfDiretor?: string,
        cidade?: CidadeResponseDTO
    ) {
        this.id = id;
        this.nome = nome ?? '';
        this.nomeFantasia = nomeFantasia ?? '';
        this.cnpj = cnpj;
        this.endereco = endereco;
        this.cidadeId = cidadeId ?? 0;
        this.telefone = telefone;
        this.email = email;
        this.nomeDiretor = nomeDiretor;
        this.cpfDiretor = cpfDiretor;
        this.cidade = cidade;
    }

    static dtos(dto: InstituicaoRequestDTO): InstituicaoModel {
        return new InstituicaoModel(
            undefined,
            dto.nome,
            dto.nomeFantasia,
            dto.cnpj,
            dto.endereco,
            dto.cidadeId,
            dto.telefone,
            dto.email,
            dto.nomeDiretor,
            dto.cpfDiretor
        );
    }

    static updateDtos(dto: InstituicaoUpdateDTO): any {
        const updateData: any = {};
        
        if (dto.nome !== undefined) updateData.nome = dto.nome;
        if (dto.nomeFantasia !== undefined) updateData.nomeFantasia = dto.nomeFantasia;
        if (dto.cnpj !== undefined) updateData.cnpj = dto.cnpj;
        if (dto.endereco !== undefined) updateData.endereco = dto.endereco;
        if (dto.cidadeId !== undefined) updateData.cidadeId = dto.cidadeId;
        if (dto.telefone !== undefined) updateData.telefone = dto.telefone;
        if (dto.email !== undefined) updateData.email = dto.email;
        if (dto.nomeDiretor !== undefined) updateData.nomeDiretor = dto.nomeDiretor;
        if (dto.cpfDiretor !== undefined) updateData.cpfDiretor = dto.cpfDiretor;
        
        return updateData;
    }

    static prismaParaModel(data: any): InstituicaoModel {
        return new InstituicaoModel(
            data.id,
            data.nome,
            data.nomeFantasia,
            data.cnpj,
            data.endereco,
            data.cidadeId,
            data.telefone,
            data.email,
            data.nomeDiretor,
            data.cpfDiretor,
            data.cidade ? {
                id: data.cidade.id,
                nome: data.cidade.nome,
                uf: data.cidade.uf
            } : undefined
        );
    }

    dataParaPrisma() {
        return {
            nome: this.nome,
            nomeFantasia: this.nomeFantasia,
            cnpj: this.cnpj,
            endereco: this.endereco,
            cidadeId: this.cidadeId,
            telefone: this.telefone,
            email: this.email,
            nomeDiretor: this.nomeDiretor,
            cpfDiretor: this.cpfDiretor,
        };
    }

    toResponse(): InstituicaoComCidadeResponseDTO {
        return {
            id: this.id!,
            nome: this.nome,
            nomeFantasia: this.nomeFantasia,
            cnpj: this.cnpj,
            endereco: this.endereco,
            cidadeId: this.cidadeId,
            telefone: this.telefone,
            email: this.email,
            nomeDiretor: this.nomeDiretor,
            cpfDiretor: this.cpfDiretor,
            cidade: this.cidade!
        };
    }
}
