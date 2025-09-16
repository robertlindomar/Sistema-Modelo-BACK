import { RelatorioEstagioRepository } from '../repositories/RelatorioEstagioRepository';
import { RelatorioEstagioRequestDTO } from '../dtos/RelatorioEstagioRequestDTO';
import { RelatorioEstagioResponseDTO } from '../dtos/RelatorioEstagioResponseDTO';
import { AppError } from '../../../shared/errors/AppError';
import { PaginationParams } from '../../../shared/interfaces/PaginationResponse';
import { PaginationResponse } from '../../../shared/interfaces/PaginationResponse';

export class RelatorioEstagioService {
    private repository: RelatorioEstagioRepository;

    constructor() {
        this.repository = new RelatorioEstagioRepository();
    }

    async criar(request: RelatorioEstagioRequestDTO): Promise<RelatorioEstagioResponseDTO> {
        if (!request.estagioId || !request.tipo || !request.prazoEntrega) {
            throw new AppError("Estágio, tipo e prazo de entrega são obrigatórios", 400);
        }

        // Validar prazo de entrega (permite data atual)
        const hoje = new Date();
        if (request.prazoEntrega < hoje) {
            throw new AppError("Prazo de entrega deve ser posterior ou igual à data atual", 400);
        }

        // Validar data de entrega se fornecida
        if (request.dataEntregue) {
            if (request.dataEntregue > new Date()) {
                throw new AppError("Data de entrega não pode ser futura", 400);
            }
            // Permitir data de entrega igual ao prazo
            if (request.dataEntregue > request.prazoEntrega) {
                throw new AppError("Data de entrega não pode ser posterior ao prazo de entrega", 400);
            }
        }

        const relatorio = await this.repository.criar(request);
        return relatorio.toResponse();
    }

    async listar(params?: PaginationParams): Promise<PaginationResponse<RelatorioEstagioResponseDTO>> {
        const result = await this.repository.listar(params);
        return {
            data: result.data.map(relatorio => relatorio.toResponse()),
            pagination: result.pagination
        };
    }

    async buscarPorId(id: number): Promise<RelatorioEstagioResponseDTO | null> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const relatorio = await this.repository.buscarPorId(id);
        return relatorio ? relatorio.toResponse() : null;
    }

    async atualizar(id: number, data: RelatorioEstagioRequestDTO): Promise<RelatorioEstagioResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }

        if (!data.estagioId || !data.tipo || !data.prazoEntrega) {
            throw new AppError("Estágio, tipo e prazo de entrega são obrigatórios", 400);
        }

        // Validar prazo de entrega (permite data atual)
        const hoje = new Date();
        if (data.prazoEntrega < hoje) {
            throw new AppError("Prazo de entrega deve ser posterior ou igual à data atual", 400);
        }

        // Validar data de entrega se fornecida
        if (data.dataEntregue) {
            if (data.dataEntregue > new Date()) {
                throw new AppError("Data de entrega não pode ser futura", 400);
            }
            // Permitir data de entrega igual ao prazo
            if (data.dataEntregue > data.prazoEntrega) {
                throw new AppError("Data de entrega não pode ser posterior ao prazo de entrega", 400);
            }
        }

        const relatorio = await this.repository.atualizar(id, data);
        return relatorio.toResponse();
    }

    async deletar(id: number): Promise<RelatorioEstagioResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const relatorio = await this.repository.deletar(id);
        return relatorio.toResponse();
    }

    async buscarPorEstagio(estagioId: number): Promise<RelatorioEstagioResponseDTO[]> {
        if (!estagioId || typeof estagioId !== 'number' || estagioId <= 0) {
            throw new AppError("ID de estágio válido é obrigatório", 400);
        }
        const relatorios = await this.repository.buscarPorEstagio(estagioId);
        return relatorios.map(relatorio => relatorio.toResponse());
    }
}
