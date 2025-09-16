import { CidadeRequestDTO } from "../dtos/CidadeRequestDTO";
import { CidadeUpdateDTO } from "../dtos/CidadeUpdateDTO";
import { CidadeResponseDTO } from "../dtos/CidadeResponseDTO";

export class CidadeModel {
    id: number;
    nome: string;
    uf: string;

    constructor(id: number, nome: string, uf: string) {
        this.id = id;
        this.nome = nome;
        this.uf = uf;
    }

    static vazio(): CidadeModel {
        return new CidadeModel(0, '', '');
    }

    static dtos(dto: CidadeRequestDTO): CidadeModel {
        return new CidadeModel(0, dto.nome, dto.uf);
    }

    static updateDtos(dto: CidadeUpdateDTO): any {
        const updateData: any = {};
        
        if (dto.nome !== undefined) updateData.nome = dto.nome;
        if (dto.uf !== undefined) updateData.uf = dto.uf;
        
        return updateData;
    }

    static prismaParaModel(data: any): CidadeModel {
        return new CidadeModel(data.id, data.nome, data.uf);
    }

    dataParaPrisma() {
        return {
            nome: this.nome,
            uf: this.uf,
        };
    }

    toResponse(): CidadeResponseDTO {
        return {
            id: this.id,
            nome: this.nome,
            uf: this.uf,
        };
    }
}
