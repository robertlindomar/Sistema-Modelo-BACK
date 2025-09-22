import { EmpresaRequestDTO } from "../dtos/EmpresaRequestDTO";
import { EmpresaUpdateDTO } from "../dtos/EmpresaUpdateDTO";
import { EmpresaResponseDTO } from "../dtos/EmpresaResponseDTO";
import { EmpresaRepository } from "../repositories/EmpresaRepository";
import { AppError } from "../../../shared/errors/AppError";
import { EmpresaComCidadeResponseDTO } from "../dtos/EmpresaComCidadeResponseDTO";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";
import { calculatePaginationMetadata } from "../../../shared/utils/pagination";

export class EmpresaService {
    private empresaRepository: EmpresaRepository;

    constructor() {
        this.empresaRepository = new EmpresaRepository();
    }

    async criar(request: EmpresaRequestDTO): Promise<EmpresaComCidadeResponseDTO> {
        const empresa = await this.empresaRepository.criar(request);
        return empresa.toResponse();
    }

    async listar(pagination?: PaginationQuery & { search?: string; nome?: string; cnpj?: string }): Promise<PaginationResponse<EmpresaComCidadeResponseDTO>> {
        const { empresas, total } = await this.empresaRepository.listar(pagination);
        const empresasResponse = empresas.map(empresa => empresa.toResponse());
        
        const paginationMetadata = calculatePaginationMetadata(
            total, 
            pagination?.page || 1, 
            pagination?.limit || 10
        );

        return {
            data: empresasResponse,
            pagination: paginationMetadata
        };
    }

    async buscarPorId(id: number): Promise<EmpresaComCidadeResponseDTO | null> {
        const empresa = await this.empresaRepository.buscarPorId(id);
        return empresa ? empresa.toResponse() : null;
    }

    async atualizar(id: number, data: EmpresaUpdateDTO): Promise<EmpresaComCidadeResponseDTO> {
        const empresa = await this.empresaRepository.atualizar(id, data);
        return empresa.toResponse();
    }

    async deletar(id: number): Promise<EmpresaComCidadeResponseDTO> {
        const empresa = await this.empresaRepository.deletar(id);
        return empresa.toResponse();
    }
}