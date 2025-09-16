import { RelatorioEstagioRequestDTO } from "../dtos/RelatorioEstagioRequestDTO";
import { TipoRelatorio } from "@prisma/client";

export class RelatorioEstagioModel {
    id?: number;
    estagioId: number;
    tipo: TipoRelatorio;
    prazoEntrega: Date;
    dataEntregue?: Date;
    observacao?: string;

    constructor(
        id?: number,
        estagioId?: number,
        tipo?: TipoRelatorio,
        prazoEntrega?: Date,
        dataEntregue?: Date,
        observacao?: string
    ) {
        this.id = id;
        this.estagioId = estagioId ?? 0;
        this.tipo = tipo ?? TipoRelatorio.Inicial;
        this.prazoEntrega = prazoEntrega ?? new Date();
        this.dataEntregue = dataEntregue;
        this.observacao = observacao;
    }

    static dtos(dto: RelatorioEstagioRequestDTO): RelatorioEstagioModel {
        return new RelatorioEstagioModel(
            undefined,
            dto.estagioId,
            dto.tipo,
            dto.prazoEntrega,
            dto.dataEntregue,
            dto.observacao
        );
    }

    static prismaParaModel(data: any): RelatorioEstagioModel {
        return new RelatorioEstagioModel(
            data.id,
            data.estagioId,
            data.tipo,
            data.prazoEntrega,
            data.dataEntregue,
            data.observacao
        );
    }

    dataParaPrisma() {
        return {
            estagioId: this.estagioId,
            tipo: this.tipo,
            prazoEntrega: this.prazoEntrega,
            dataEntregue: this.dataEntregue,
            observacao: this.observacao,
        };
    }

    toResponse() {
        return {
            id: this.id!,
            estagioId: this.estagioId,
            tipo: this.tipo,
            prazoEntrega: this.prazoEntrega,
            dataEntregue: this.dataEntregue,
            observacao: this.observacao,
            estagio: (this as any).estagio || null
        };
    }
}
