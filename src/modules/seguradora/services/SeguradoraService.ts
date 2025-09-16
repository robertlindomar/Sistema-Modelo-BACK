import { SeguradoraRequestDTO } from "../dtos/SeguradoraRequestDTO";
import { SeguradoraResponseDTO } from "../dtos/SeguradoraResponseDTO";
import { SeguradoraRepository } from "../repositories/SeguradoraRepository";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";
import { calculatePaginationMetadata } from "../../../shared/utils/pagination";

export class SeguradoraService {
    private seguradoraRepository: SeguradoraRepository;

    constructor() {
        this.seguradoraRepository = new SeguradoraRepository();
    }

    async criar(request: SeguradoraRequestDTO): Promise<SeguradoraResponseDTO> {
        if (!request.nome) {
            throw new AppError("Nome é obrigatório", 400);
        }
        const seguradora = await this.seguradoraRepository.criar(request);
        return seguradora.toResponse();
    }

    async listar(pagination?: PaginationQuery): Promise<PaginationResponse<SeguradoraResponseDTO>> {
        const { seguradoras, total } = await this.seguradoraRepository.listar(pagination);
        const seguradorasResponse = seguradoras.map(seguradora => seguradora.toResponse());
        
        const paginationMetadata = calculatePaginationMetadata(
            total, 
            pagination?.page || 1, 
            pagination?.limit || 10
        );

        return {
            data: seguradorasResponse,
            pagination: paginationMetadata
        };
    }

    async buscarPorId(id: number): Promise<SeguradoraResponseDTO | null> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const seguradora = await this.seguradoraRepository.buscarPorId(id);
        return seguradora ? seguradora.toResponse() : null;
    }

    async atualizar(id: number, data: SeguradoraRequestDTO): Promise<SeguradoraResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        if (!data || !data.nome) {
            throw new AppError("Nome é obrigatório", 400);
        }
        const seguradora = await this.seguradoraRepository.atualizar(id, data);
        return seguradora.toResponse();
    }

    async deletar(id: number): Promise<SeguradoraResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const seguradora = await this.seguradoraRepository.deletar(id);
        return seguradora.toResponse();
    }
}
