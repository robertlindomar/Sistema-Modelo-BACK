import { EstagioHorarioRequestDTO } from "../dtos/EstagioHorarioRequestDTO";
import { DiaSemana } from "@prisma/client";

export class EstagioHorarioModel {
    id?: number;
    estagioId: number;
    diaSemana: DiaSemana;
    horarioInicio: string;
    horarioFim: string;

    constructor(
        id?: number,
        estagioId?: number,
        diaSemana?: DiaSemana,
        horarioInicio?: string,
        horarioFim?: string,
    ) {
        this.id = id;
        this.estagioId = estagioId ?? 0;
        this.diaSemana = diaSemana ?? DiaSemana.Segunda;
        this.horarioInicio = horarioInicio ?? new Date().toISOString();
        this.horarioFim = horarioFim ?? new Date().toISOString();
    }

    static dtos(dto: EstagioHorarioRequestDTO): EstagioHorarioModel {
        return new EstagioHorarioModel(
            undefined,
            dto.estagioId,
            dto.diaSemana,
            dto.horarioInicio,
            dto.horarioFim
        );
    }

    static prismaParaModel(data: any): EstagioHorarioModel {
        return new EstagioHorarioModel(
            data.id,
            data.estagioId,
            data.diaSemana,
            data.horarioInicio,
            data.horarioFim
        );
    }

    dataParaPrisma() {
        return {
            estagioId: this.estagioId,
            diaSemana: this.diaSemana,
            horarioInicio: this.horarioInicio,
            horarioFim: this.horarioFim,
        };
    }

    toResponse() {
        return {
            id: this.id!,
            estagioId: this.estagioId,
            diaSemana: this.diaSemana,
            horarioInicio: this.horarioInicio,
            horarioFim: this.horarioFim
        };
    }
}