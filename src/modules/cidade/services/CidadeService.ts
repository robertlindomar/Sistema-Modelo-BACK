import { CidadeRepository } from "../repositories/CidadeRepository";
import { CidadeRequestDTO } from "../dtos/CidadeRequestDTO";
import { CidadeUpdateDTO } from "../dtos/CidadeUpdateDTO";
import { CidadeResponseDTO } from "../dtos/CidadeResponseDTO";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";
import { calculatePaginationMetadata } from "../../../shared/utils/pagination";

export class CidadeService {

    private cidadeRepository: CidadeRepository;
    constructor() {
        this.cidadeRepository = new CidadeRepository();
    }

    async criar(request: CidadeRequestDTO): Promise<CidadeResponseDTO> {
        request.uf = request.uf.toUpperCase();
        const cidade = await this.cidadeRepository.criar(request);
        return cidade.toResponse();
    }

    async listar(pagination?: PaginationQuery & { search?: string; nome?: string; uf?: string }): Promise<PaginationResponse<CidadeResponseDTO>> {
        const { cidades, total } = await this.cidadeRepository.listar(pagination);
        const cidadesResponse = cidades.map(cidade => cidade.toResponse());
        
        const paginationMetadata = calculatePaginationMetadata(
            total, 
            pagination?.page || 1, 
            pagination?.limit || 10
        );

        return {
            data: cidadesResponse,
            pagination: paginationMetadata
        };
    }

    async buscarPorId(id: number): Promise<CidadeResponseDTO | null> {
        const cidade = await this.cidadeRepository.buscarPorId(id);
        return cidade ? cidade.toResponse() : null;
    }

    async buscarPorNome(nome: string): Promise<CidadeResponseDTO | null> {
        const cidade = await this.cidadeRepository.buscarPorNome(nome);
        return cidade ? cidade.toResponse() : null;
    }

    async buscarPorUf(uf: string): Promise<CidadeResponseDTO[] | null> {
        const cidades = await this.cidadeRepository.buscarPorUf(uf);
        return cidades ? cidades.map(cidade => cidade.toResponse()) : null;
    }
    

    async atualizar(id: number, data: CidadeUpdateDTO): Promise<CidadeResponseDTO> {
        if (data.uf) {
            data.uf = data.uf.toUpperCase();
        }
        const cidade = await this.cidadeRepository.atualizar(id, data);
        return cidade.toResponse();
    }

    async deletar(id: number): Promise<CidadeResponseDTO> {
        const cidade = await this.cidadeRepository.deletar(id);
        return cidade.toResponse();
    }

}