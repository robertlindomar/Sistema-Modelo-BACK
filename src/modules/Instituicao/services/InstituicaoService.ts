import { InstituicaoRequestDTO } from "../dtos/InstituicaoRequestDTO";
import { InstituicaoUpdateDTO } from "../dtos/InstituicaoUpdateDTO";
import { InstituicaoResponseDTO } from "../dtos/InstituicaoResponseDTO";
import { InstituicaoRepository } from "../repositories/InstituicaoRepository";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";
import { calculatePaginationMetadata } from "../../../shared/utils/pagination";
import { AppError } from "../../../shared/errors/AppError";
import { InstituicaoComCidadeResponseDTO } from "../dtos/InstituicaoComCidadeResponseDTO";

export class InstituicaoService {
    private repository = new InstituicaoRepository();

    async criar(data: InstituicaoRequestDTO): Promise<InstituicaoResponseDTO> {
        if (!data.nome || !data.nomeFantasia || !data.cidadeId) {
            throw new AppError("Nome, Nome Fantasia e Cidade são obrigatórios.", 400);
        }
        const instituicao = await this.repository.criar(data);
        return instituicao.toResponse();
    }

    async listar(pagination?: PaginationQuery): Promise<PaginationResponse<InstituicaoComCidadeResponseDTO>> {
        const { instituicoes, total } = await this.repository.listar(pagination);
        const instituicoesResponse = instituicoes.map(i => i.toResponse());
        
        const paginationMetadata = calculatePaginationMetadata(
            total, 
            pagination?.page || 1, 
            pagination?.limit || 10
        );

        return {
            data: instituicoesResponse,
            pagination: paginationMetadata
        };
    }

    async buscarPorId(id: number): Promise<InstituicaoComCidadeResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const inst = await this.repository.buscarPorId(id);
        if (!inst) throw new AppError("Instituição não encontrada", 404);
        return inst.toResponse();
    }

    async atualizar(id: number, data: InstituicaoUpdateDTO): Promise<InstituicaoResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const updated = await this.repository.atualizar(id, data);
        return updated.toResponse();
    }

    async deletar(id: number): Promise<InstituicaoResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const deleted = await this.repository.deletar(id);
        return deleted.toResponse();
    }

    async buscarPorCidade(cidadeId: number): Promise<InstituicaoComCidadeResponseDTO[]> {
        if (!cidadeId || typeof cidadeId !== 'number' || cidadeId <= 0) {
            throw new AppError("cidadeId válido é obrigatório", 400);
        }
        const list = await this.repository.buscarPorCidade(cidadeId);
        return list.map(i => i.toResponse());
    }
}
