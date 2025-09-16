import { CursoRequestDTO } from "../dtos/CursoRequestDTO";
import { CursoUpdateDTO } from "../dtos/CursoUpdateDTO";
import { CursoResponseDTO } from "../dtos/CursoResponseDTO";

export class CursoModel {
    id: number;
    nome: string;
    habilitacao?: string;
    nivel?: string;

    constructor(id: number, nome: string, habilitacao?: string, nivel?: string) {
        this.id = id;
        this.nome = nome;
        this.habilitacao = habilitacao;
        this.nivel = nivel;
    }

    static vazio(): CursoModel {
        return new CursoModel(0, '', '', '');
    }

    static dtos(dto: CursoRequestDTO): CursoModel {
        return new CursoModel(0, dto.nome, dto.habilitacao, dto.nivel);
    }

    static updateDtos(dto: CursoUpdateDTO): any {
        const updateData: any = {};
        
        if (dto.nome !== undefined) updateData.nome = dto.nome;
        if (dto.habilitacao !== undefined) updateData.habilitacao = dto.habilitacao;
        if (dto.nivel !== undefined) updateData.nivel = dto.nivel;
        
        return updateData;
    }

    static prismaParaModel(data: any): CursoModel {
        return new CursoModel(data.id, data.nome, data.habilitacao, data.nivel);
    }

    dataParaPrisma() {
        return {
            nome: this.nome,
            habilitacao: this.habilitacao,
            nivel: this.nivel,
        };
    }

    toResponse(): CursoResponseDTO {
        return {
            id: this.id,
            nome: this.nome,
            habilitacao: this.habilitacao,
            nivel: this.nivel,
        };
    }
}
