import { CidadeResponseDTO } from "../../cidade/dtos/CidadeResponseDTO";
import { EmpresaComCidadeResponseDTO } from "../dtos/EmpresaComCidadeResponseDTO";
import { EmpresaRequestDTO } from "../dtos/EmpresaRequestDTO";
import { EmpresaUpdateDTO } from "../dtos/EmpresaUpdateDTO";

export class EmpresaModel {
    id?: number;
    nome: string;
    nomeFantasia: string;
    cnpj?: string;
    cpfAutonomo?: string;
    numClassAutonomo?: string;
    endereco?: string;
    cidadeId: number;
    telefone1?: string;
    telefone2?: string;
    email?: string;
    representante?: string;
    cargoRepresentante?: string;
    cidade?: CidadeResponseDTO;

    constructor(
        id?: number,
        nome?: string,
        nomeFantasia?: string,
        cnpj?: string,
        cpfAutonomo?: string,
        numClassAutonomo?: string,
        endereco?: string,
        cidadeId?: number,
        telefone1?: string,
        telefone2?: string,
        email?: string,
        representante?: string,
        cargoRepresentante?: string,
        cidade?: CidadeResponseDTO
    ) {
        this.id = id;
        this.nome = nome ?? '';
        this.nomeFantasia = nomeFantasia ?? '';
        this.cnpj = cnpj;
        this.cpfAutonomo = cpfAutonomo;
        this.numClassAutonomo = numClassAutonomo;
        this.endereco = endereco;
        this.cidadeId = cidadeId ?? 0;
        this.telefone1 = telefone1;
        this.telefone2 = telefone2;
        this.email = email;
        this.representante = representante;
        this.cargoRepresentante = cargoRepresentante;
        this.cidade = cidade;
    }

    static dtos(dto: EmpresaRequestDTO): EmpresaModel {
        return new EmpresaModel(
            undefined,
            dto.nome,
            dto.nomeFantasia,
            dto.cnpj,
            dto.cpfAutonomo,
            dto.numClassAutonomo,
            dto.endereco,
            dto.cidadeId,
            dto.telefone1,
            dto.telefone2,
            dto.email,
            dto.representante,
            dto.cargoRepresentante
        );
    }

    static updateDtos(dto: EmpresaUpdateDTO): any {
        const updateData: any = {};
        
        if (dto.nome !== undefined) updateData.nome = dto.nome;
        if (dto.nomeFantasia !== undefined) updateData.nomeFantasia = dto.nomeFantasia;
        if (dto.cnpj !== undefined) updateData.cnpj = dto.cnpj;
        if (dto.cpfAutonomo !== undefined) updateData.cpfAutonomo = dto.cpfAutonomo;
        if (dto.numClassAutonomo !== undefined) updateData.numClassAutonomo = dto.numClassAutonomo;
        if (dto.endereco !== undefined) updateData.endereco = dto.endereco;
        if (dto.cidadeId !== undefined) updateData.cidadeId = dto.cidadeId;
        if (dto.telefone1 !== undefined) updateData.telefone1 = dto.telefone1;
        if (dto.telefone2 !== undefined) updateData.telefone2 = dto.telefone2;
        if (dto.email !== undefined) updateData.email = dto.email;
        if (dto.representante !== undefined) updateData.representante = dto.representante;
        if (dto.cargoRepresentante !== undefined) updateData.cargoRepresentante = dto.cargoRepresentante;
        
        return updateData;
    }

    static prismaParaModel(data: any): EmpresaModel {
        return new EmpresaModel(
            data.id,
            data.nome,
            data.nomeFantasia,
            data.cnpj,
            data.cpfAutonomo,
            data.numClassAutonomo,
            data.endereco,
            data.cidadeId,
            data.telefone1,
            data.telefone2,
            data.email,
            data.representante,
            data.cargoRepresentante,
            data.cidade ? {
                id: data.cidade.id,
                nome: data.cidade.nome,
                uf: data.cidade.uf
            } : undefined,
        );
    }

    dataParaPrisma() {
        return {
            nome: this.nome,
            nomeFantasia: this.nomeFantasia,
            cnpj: this.cnpj,
            cpfAutonomo: this.cpfAutonomo,
            numClassAutonomo: this.numClassAutonomo,
            endereco: this.endereco,
            cidadeId: this.cidadeId,
            telefone1: this.telefone1,
            telefone2: this.telefone2,
            email: this.email,
            representante: this.representante,
            cargoRepresentante: this.cargoRepresentante
        };
    }

    toResponse(): EmpresaComCidadeResponseDTO {
        return {
            id: this.id!,
            nome: this.nome,
            nomeFantasia: this.nomeFantasia,
            cnpj: this.cnpj,
            cpfAutonomo: this.cpfAutonomo,
            numClassAutonomo: this.numClassAutonomo,
            endereco: this.endereco,
            cidadeId: this.cidadeId,
            telefone1: this.telefone1,
            telefone2: this.telefone2,
            email: this.email,
            representante: this.representante,
            cargoRepresentante: this.cargoRepresentante,
            cidade: this.cidade!
        };
    }
}