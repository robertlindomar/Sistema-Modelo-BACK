import { EstagioHorarioRepository } from '../repositories/EstagioHorarioRepository';
import { EstagioHorarioRequestDTO } from '../dtos/EstagioHorarioRequestDTO';
import { EstagioHorarioResponseDTO } from '../dtos/EstagioHorarioResponseDTO';
import { EstagioHorarioLoteRequestDTO } from '../dtos/EstagioHorarioLoteRequestDTO';
import { AppError } from '../../../shared/errors/AppError';
import { normalizarData } from '../../../shared/utils/normalizarData';
import { normalizarHorario } from '../../../shared/utils/normalizarHorario';
import { DiaSemana } from '@prisma/client';

export class EstagioHorarioService {
    private repository: EstagioHorarioRepository;

    constructor() {
        this.repository = new EstagioHorarioRepository();
    }

    async criar(request: EstagioHorarioRequestDTO): Promise<EstagioHorarioResponseDTO> {
        if (!request.estagioId || !request.diaSemana || !request.horarioInicio || !request.horarioFim) {
            throw new AppError("Todos os campos são obrigatórios", 400);
        }

        if (request.horarioInicio >= request.horarioFim) {
            throw new AppError("Horário de início deve ser menor que horário de fim", 400);
        }

        

        request.horarioInicio = normalizarHorario(request.horarioInicio) ?? request.horarioInicio ?? "" ;
        request.horarioFim = normalizarHorario(request.horarioFim) ?? request.horarioFim ?? "";

        const horario = await this.repository.criar(request);
        return horario.toResponse();
    }

    async listar(): Promise<EstagioHorarioResponseDTO[]> {
        const horarios = await this.repository.listar();
        return horarios.map(horario => horario.toResponse());
    }

    async buscarPorId(id: number): Promise<EstagioHorarioResponseDTO | null> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const horario = await this.repository.buscarPorId(id);
        return horario ? horario.toResponse() : null;
    }

    async buscarPorEstagio(estagioId: number): Promise<EstagioHorarioResponseDTO[]> {
        if (!estagioId || typeof estagioId !== 'number' || estagioId <= 0) {
            throw new AppError("ID do estágio válido é obrigatório", 400);
        }
        const horarios = await this.repository.buscarPorEstagio(estagioId);
        return horarios.map(horario => horario.toResponse());
    }

    async atualizar(id: number, data: EstagioHorarioRequestDTO): Promise<EstagioHorarioResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }

        data.horarioInicio = normalizarHorario(data.horarioInicio) ?? data.horarioInicio ?? "";
        data.horarioFim = normalizarHorario(data.horarioFim) ?? data.horarioFim ?? "";

        const horario = await this.repository.atualizar(id, data);
        return horario.toResponse();
    }

    async deletar(id: number): Promise<EstagioHorarioResponseDTO> {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new AppError("ID válido é obrigatório", 400);
        }
        const horario = await this.repository.deletar(id);
        return horario.toResponse();
    }

    async criarLote(request: EstagioHorarioLoteRequestDTO): Promise<EstagioHorarioResponseDTO[]> {
        const horariosCriados = [];

        for (const dia of request.diasSemana) {
            for (const horario of request.horarios) {
                // Normalizar horários para formato DateTime
                const horarioInicioNormalizado = normalizarHorario(horario.horarioInicio);
                const horarioFimNormalizado = normalizarHorario(horario.horarioFim);

                if (!horarioInicioNormalizado || !horarioFimNormalizado) {
                    throw new AppError("Formato de horário inválido", 400);
                }

                const horarioRequest = {
                    estagioId: request.estagioId,
                    diaSemana: dia as DiaSemana,
                    horarioInicio: horarioInicioNormalizado,
                    horarioFim: horarioFimNormalizado
                };

                const horarioCriado = await this.repository.criarLote(horarioRequest);
                horariosCriados.push(horarioCriado.toResponse());
            }
        }

        return horariosCriados;
    }
}
