import { DiaSemana } from "@prisma/client";

export interface EstagioHorarioLoteRequestDTO {
    estagioId: number;
    diasSemana: DiaSemana[];
    horarios: {
        horarioInicio: string;
        horarioFim: string;
    }[];
}
