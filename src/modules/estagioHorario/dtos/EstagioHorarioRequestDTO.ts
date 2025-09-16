import { DiaSemana } from "@prisma/client";

export interface EstagioHorarioRequestDTO {
    estagioId: number;
    diaSemana: DiaSemana;
    horarioInicio: string;
    horarioFim: string;
}
