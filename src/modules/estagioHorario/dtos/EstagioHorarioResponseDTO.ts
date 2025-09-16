import { DiaSemana } from "@prisma/client";

export interface EstagioHorarioResponseDTO {
    id: number;
    estagioId: number;
    diaSemana: DiaSemana;
    horarioInicio: string;
    horarioFim: string;
}
