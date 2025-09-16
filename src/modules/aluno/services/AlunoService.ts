import { AlunoRequestDTO } from "../dtos/AlunoRequestDTO";
import { AlunoUpdateDTO } from "../dtos/AlunoUpdateDTO";
import { AlunoResponseDTO } from "../dtos/AlunoResponseDTO";
import { AlunoRepository } from "../repositories/AlunoRepository";
import { AppError } from "../../../shared/errors/AppError";
import { AlunoComCidadeCursoResponseDTO } from "../dtos/AlunoComCidadeCursoResponseDTO";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";
import { calculatePaginationMetadata } from "../../../shared/utils/pagination";

export class AlunoService {
    private alunoRepository: AlunoRepository;
    constructor() {
        this.alunoRepository = new AlunoRepository();
    }

    async criar(request: AlunoRequestDTO): Promise<AlunoComCidadeCursoResponseDTO> {
        const aluno = await this.alunoRepository.criar(request);
        return aluno.toResponse();
    }

    async listar(pagination?: PaginationQuery): Promise<PaginationResponse<AlunoComCidadeCursoResponseDTO>> {
        const { alunos, total } = await this.alunoRepository.listar(pagination);
        const alunosResponse = alunos.map(aluno => aluno.toResponse());
        
        const paginationMetadata = calculatePaginationMetadata(
            total, 
            pagination?.page || 1, 
            pagination?.limit || 10
        );

        return {
            data: alunosResponse,
            pagination: paginationMetadata
        };
    }

    async buscarPorId(id: number): Promise<AlunoComCidadeCursoResponseDTO | null> {
        const aluno = await this.alunoRepository.buscarPorId(id);
        return aluno ? aluno.toResponse() : null;
    }

    async atualizar(id: number, data: AlunoUpdateDTO): Promise<AlunoComCidadeCursoResponseDTO> {
        const aluno = await this.alunoRepository.atualizar(id, data);
        return aluno.toResponse();
    }

    async deletar(id: number): Promise<AlunoComCidadeCursoResponseDTO> {
        const aluno = await this.alunoRepository.deletar(id);
        return aluno.toResponse();
    }


}
