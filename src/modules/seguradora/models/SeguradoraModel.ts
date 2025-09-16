import { SeguradoraRequestDTO } from "../dtos/SeguradoraRequestDTO";
import { SeguradoraUpdateDTO } from "../dtos/SeguradoraUpdateDTO";
import { SeguradoraResponseDTO } from "../dtos/SeguradoraResponseDTO";

export class SeguradoraModel {
    id: number;
    nome: string;

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
    }

    static vazio(): SeguradoraModel {
        return new SeguradoraModel(0, '');
    }

    static dtos(dto: SeguradoraRequestDTO): SeguradoraModel {
        return new SeguradoraModel(0, dto.nome);
    }

    static updateDtos(dto: SeguradoraUpdateDTO): any {
        const updateData: any = {};
        
        if (dto.nome !== undefined) updateData.nome = dto.nome;
        
        return updateData;
    }

    static prismaParaModel(data: any): SeguradoraModel {
        return new SeguradoraModel(data.id, data.nome);
    }

    dataParaPrisma() {
        return {
            nome: this.nome
        };
    }

    toResponse(): SeguradoraResponseDTO {
        return {
            id: this.id,
            nome: this.nome
        };
    }
}
