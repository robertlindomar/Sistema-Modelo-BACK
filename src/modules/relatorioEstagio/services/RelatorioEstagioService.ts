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
        // Normalizar datas para comparar apenas DIA/MÊS/ANO em horário local
        const toDateOnly = (input: Date | string): Date => {
            if (typeof input === 'string') {
                // Tenta formato YYYY-MM-DD sem timezone
                const m = input.match(/^(\d{4})-(\d{2})-(\d{2})/);
                if (m) {
                    const year = Number(m[1]);
                    const monthIndex = Number(m[2]) - 1;
                    const day = Number(m[3]);
                    return new Date(year, monthIndex, day);
                }
            }
            const d = new Date(input);
            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
        };

        const hoje = toDateOnly(new Date());
        const prazoEntrega = toDateOnly(request.prazoEntrega as any);

        // Ajustar datas para meio-dia local antes de persistir, evitando regressão de dia ao serializar UTC
        const toLocalNoonISOString = (input: Date | string): string => {
            const d = toDateOnly(input as any);
            d.setHours(12, 0, 0, 0); // meio-dia local
            return d.toISOString();
        };
        
        // Permitir prazo igual a hoje; somente erro se for anterior
        if (prazoEntrega.getTime() < hoje.getTime()) {
            throw new AppError("Prazo de entrega deve ser posterior ou igual à data atual", 400);
        }

        // Validar data de entrega se fornecida (permitindo igualdade com prazo)
        if (request.dataEntregue) {
            const dataEntregue = toDateOnly(request.dataEntregue as any);
            if (dataEntregue.getTime() > hoje.getTime()) {
                throw new AppError("Data de entrega não pode ser futura", 400);
            }
            if (dataEntregue.getTime() > prazoEntrega.getTime()) {
                throw new AppError("Data de entrega não pode ser posterior ao prazo de entrega", 400);
            }
            // normalizar para meio-dia ao salvar
            (request as any).dataEntregue = toLocalNoonISOString(request.dataEntregue as any);
        }

        // normalizar prazo para meio-dia ao salvar
        (request as any).prazoEntrega = toLocalNoonISOString(request.prazoEntrega as any);

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

        // Normalizar datas para comparar apenas DIA/MÊS/ANO
        const toDateOnly = (input: Date | string): Date => {
            if (typeof input === 'string') {
                const m = input.match(/^(\d{4})-(\d{2})-(\d{2})/);
                if (m) {
                    const year = Number(m[1]);
                    const monthIndex = Number(m[2]) - 1;
                    const day = Number(m[3]);
                    return new Date(year, monthIndex, day);
                }
            }
            const d = new Date(input);
            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
        };

        const hoje = toDateOnly(new Date());
        const prazoEntrega = toDateOnly(data.prazoEntrega as any);
        const toLocalNoonISOString = (input: Date | string): string => {
            const d = toDateOnly(input as any);
            d.setHours(12, 0, 0, 0);
            return d.toISOString();
        };
        if (prazoEntrega.getTime() < hoje.getTime()) {
            throw new AppError("Prazo de entrega deve ser posterior ou igual à data atual", 400);
        }

        // Validar data de entrega se fornecida (permitindo igualdade com prazo)
        if (data.dataEntregue) {
            const dataEntregue = toDateOnly(data.dataEntregue as any);
            if (dataEntregue.getTime() > hoje.getTime()) {
                throw new AppError("Data de entrega não pode ser futura", 400);
            }
            // Permitir data de entrega igual ao prazo
            if (dataEntregue.getTime() > prazoEntrega.getTime()) {
                throw new AppError("Data de entrega não pode ser posterior ao prazo de entrega", 400);
            }
            (data as any).dataEntregue = toLocalNoonISOString(data.dataEntregue as any);
        }
        (data as any).prazoEntrega = toLocalNoonISOString(data.prazoEntrega as any);

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
