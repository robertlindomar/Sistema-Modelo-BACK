
import { AppError } from "../../../shared/errors/AppError";
import { normalizarData } from "../../../shared/utils/normalizarData";
import { EstagioCompletoResponseDTO } from "../dtos/EstagioCompletoResponseDTO";
import { EstagioRequestDTO } from "../dtos/EstagioRequestDTO";
import { EstagioUpdateDTO } from "../dtos/EstagioUpdateDTO";
import { EstagioResponseDTO } from "../dtos/EstagioResponseDTO";
import { EstagioRepository } from "../repositories/EstagioRepository";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";
import { calculatePaginationMetadata } from "../../../shared/utils/pagination";

export class EstagioService {
    private repository = new EstagioRepository();

    async criar(data: EstagioRequestDTO): Promise<EstagioResponseDTO> {
        // Normalizando as datas antes de criar o estágio
        data.dataInicio = normalizarData(data.dataInicio) ?? data.dataInicio ?? "";
        data.dataTermino = normalizarData(data.dataTermino) ?? data.dataTermino ?? "";
        data.dataAssinatura = normalizarData(data.dataAssinatura) ?? data.dataAssinatura ?? "";

        const estagio = await this.repository.criar(data);
        return estagio.toResponse();
    }

    async listar(pagination?: PaginationQuery & { search?: string }): Promise<PaginationResponse<EstagioCompletoResponseDTO>> {
        const { estagios, total } = await this.repository.listar(pagination);
        const estagiosResponse = estagios.map(e => e.toResponse());
        
        const paginationMetadata = calculatePaginationMetadata(
            total, 
            pagination?.page || 1, 
            pagination?.limit || 10
        );

        return {
            data: estagiosResponse,
            pagination: paginationMetadata
        };
    }

    async listarPorStatus(status: string): Promise<EstagioCompletoResponseDTO[]> {
        // Normalizar o status para o formato do enum do Prisma
        let statusNormalizado = status;
        if (status === "Concluído") {
            statusNormalizado = "Concluido";
        }
        
        const list = await this.repository.listarPorStatus(statusNormalizado);
        return list.map(e => e.toResponse());
    }

    async buscarPorId(id: number): Promise<EstagioCompletoResponseDTO> {
        const estagio = await this.repository.buscarPorId(id);
        if (!estagio) throw new AppError("Estágio não encontrado", 404);
        return estagio.toResponse();
    }

    async atualizar(id: number, data: EstagioUpdateDTO): Promise<EstagioResponseDTO> {
        // Normalizando as datas antes de atualizar o estágio
        data.dataInicio = normalizarData(data.dataInicio) ?? data.dataInicio ?? "";
        data.dataTermino = normalizarData(data.dataTermino) ?? data.dataTermino ?? "";
        data.dataAssinatura = normalizarData(data.dataAssinatura) ?? data.dataAssinatura ?? "";

        const updated = await this.repository.atualizar(id, data);
        return updated.toResponse();
    }

    async deletar(id: number): Promise<EstagioResponseDTO> {
        const deleted = await this.repository.deletar(id);
        return deleted.toResponse();
    }


}