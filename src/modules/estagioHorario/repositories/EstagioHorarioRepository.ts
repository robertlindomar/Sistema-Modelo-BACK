import { PrismaClient } from '@prisma/client';
import { EstagioHorarioRequestDTO } from "../dtos/EstagioHorarioRequestDTO";
import { EstagioHorarioModel } from "../models/EstagioHorarioModel";
import { AppError } from "../../../shared/errors/AppError";

const prisma = new PrismaClient();

export class EstagioHorarioRepository {
    async criar(request: EstagioHorarioRequestDTO): Promise<EstagioHorarioModel> {
        const horario = EstagioHorarioModel.dtos(request);
        if (!horario) {
            throw new Error("Dados inválidos para criar horário de estágio");
        }

        const existente = await prisma.estagioHorario.findFirst({
            where: {
                estagioId: horario.estagioId,
                diaSemana: horario.diaSemana,
            },
        });
        if (existente) {
            throw new AppError("Já existe um horário cadastrado para este dia neste estágio.", 409);
        }

        const novo = await prisma.estagioHorario.create({
            data: horario.dataParaPrisma()
        });
        return EstagioHorarioModel.prismaParaModel(novo);
    }

    async listar(): Promise<EstagioHorarioModel[]> {
        const list = await prisma.estagioHorario.findMany();
        return list.map(h => EstagioHorarioModel.prismaParaModel(h));
    }

    async buscarPorId(id: number): Promise<EstagioHorarioModel | null> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.estagioHorario.findUnique({ where: { id } });
        if (!existente) throw new AppError("Horário não encontrado", 404);
        return EstagioHorarioModel.prismaParaModel(existente);
    }

    async atualizar(id: number, data: EstagioHorarioRequestDTO): Promise<EstagioHorarioModel> {
        if (!id || !data) throw new AppError("ID e dados são obrigatórios", 400);
        const existente = await prisma.estagioHorario.findUnique({ where: { id } });
        if (!existente) throw new AppError("Horário não encontrado", 404);
        const atualizado = await prisma.estagioHorario.update({
            where: { id },
            data: EstagioHorarioModel.dtos(data).dataParaPrisma(),
        });
        return EstagioHorarioModel.prismaParaModel(atualizado);
    }

    async deletar(id: number): Promise<EstagioHorarioModel> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.estagioHorario.findUnique({ where: { id } });
        if (!existente) throw new AppError("Horário não encontrado", 404);
        const deletado = await prisma.estagioHorario.delete({ where: { id } });
        return EstagioHorarioModel.prismaParaModel(deletado);
    }

    async buscarPorEstagio(estagioId: number): Promise<EstagioHorarioModel[]> {
        if (!estagioId) throw new Error("ID do estágio é obrigatório");
        const horarios = await prisma.estagioHorario.findMany({
            where: { estagioId },
            orderBy: [
                { diaSemana: 'asc' },
                { horarioInicio: 'asc' }
            ]
        });
        return horarios.map(h => EstagioHorarioModel.prismaParaModel(h));
    }

    async criarLote(request: EstagioHorarioRequestDTO): Promise<EstagioHorarioModel> {
        const horario = EstagioHorarioModel.dtos(request);
        if (!horario) {
            throw new Error("Dados inválidos para criar horário de estágio");
        }

        // Para cadastro em lote, não validamos duplicatas
        // pois queremos permitir múltiplos horários no mesmo dia
        const novo = await prisma.estagioHorario.create({
            data: horario.dataParaPrisma()
        });
        return EstagioHorarioModel.prismaParaModel(novo);
    }
}
