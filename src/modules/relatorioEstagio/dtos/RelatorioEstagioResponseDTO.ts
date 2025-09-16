import { TipoRelatorio } from "@prisma/client";

export interface RelatorioEstagioResponseDTO {
    id: number;
    estagioId: number;
    tipo: TipoRelatorio;
    prazoEntrega: Date;
    dataEntregue?: Date;
    observacao?: string;
}
