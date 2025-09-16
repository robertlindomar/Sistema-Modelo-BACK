import { TipoRelatorio } from "@prisma/client";

export interface RelatorioEstagioRequestDTO {
    estagioId: number;
    tipo: TipoRelatorio;
    prazoEntrega: Date;
    dataEntregue?: Date;
    observacao?: string;
}
