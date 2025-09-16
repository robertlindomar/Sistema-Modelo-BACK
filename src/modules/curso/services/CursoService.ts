import { CursoRequestDTO } from "../dtos/CursoRequestDTO";
import { CursoUpdateDTO } from "../dtos/CursoUpdateDTO";
import { CursoResponseDTO } from "../dtos/CursoResponseDTO";
import { CursoRepository } from "../repositories/CursoRepository";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";
import { calculatePaginationMetadata } from "../../../shared/utils/pagination";

export class CursoService {
    private cursoRepository: CursoRepository;
    constructor() {
        this.cursoRepository = new CursoRepository();
    }

    async criar(request: CursoRequestDTO): Promise<CursoResponseDTO> {
        if (!request.nome) {
            throw new AppError("Nome é obrigatório", 400);
        }
        const curso = await this.cursoRepository.criar(request);
        return curso.toResponse();
    }

    async listar(pagination?: PaginationQuery): Promise<PaginationResponse<CursoResponseDTO>> {
        const { cursos, total } = await this.cursoRepository.listar(pagination);
        const cursosResponse = cursos.map(curso => curso.toResponse());
        
        const paginationMetadata = calculatePaginationMetadata(
            total, 
            pagination?.page || 1, 
            pagination?.limit || 10
        );

        return {
            data: cursosResponse,
            pagination: paginationMetadata
        };
    }

    async buscarPorId(id: number): Promise<CursoResponseDTO | null> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const curso = await this.cursoRepository.buscarPorId(id);
        return curso ? curso.toResponse() : null;
    }

    async atualizar(id: number, data: CursoUpdateDTO): Promise<CursoResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const curso = await this.cursoRepository.atualizar(id, data);
        return curso.toResponse();
    }

    async deletar(id: number): Promise<CursoResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const curso = await this.cursoRepository.deletar(id);
        return curso.toResponse();
    }
}
