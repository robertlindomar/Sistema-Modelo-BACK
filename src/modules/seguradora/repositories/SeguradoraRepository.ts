import { PrismaClient } from '@prisma/client';
import { SeguradoraRequestDTO } from "../dtos/SeguradoraRequestDTO";
import { SeguradoraModel } from "../models/SeguradoraModel";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";

const prisma = new PrismaClient();

export class SeguradoraRepository {
    async criar(request: SeguradoraRequestDTO): Promise<SeguradoraModel> {
        const seguradora = SeguradoraModel.dtos(request);
        if (!seguradora) {
            throw new Error("Dados inválidos para criar seguradora");
        }
        const existente = await prisma.seguradora.findFirst({
            where: {
                nome: seguradora.nome
            },
        });
        if (existente) {
            throw new AppError("Seguradora com este nome já existe.", 409);
        }
        const nova = await prisma.seguradora.create({
            data: seguradora.dataParaPrisma()
        });
        return SeguradoraModel.prismaParaModel(nova);
    }

    async listar(pagination?: PaginationQuery & { search?: string; nome?: string }): Promise<{ seguradoras: SeguradoraModel[], total: number }> {
        const where: any = {};
        const search = (pagination as any)?.search as string | undefined;
        const nome = (pagination as any)?.nome as string | undefined;

        if (search && search.trim()) {
            where.nome = { contains: search };
        }
        if (nome && nome.trim()) {
            where.nome = { contains: nome };
        }

        const [seguradoras, total] = await Promise.all([
            prisma.seguradora.findMany({
                where,
                skip: pagination?.skip,
                take: pagination?.limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.seguradora.count({ where })
        ]);

        return {
            seguradoras: seguradoras.map(e => SeguradoraModel.prismaParaModel(e)),
            total
        };
    }

    async buscarPorId(id: number): Promise<SeguradoraModel | null> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.seguradora.findUnique({ where: { id } });
        if (!existente) throw new AppError("Seguradora não encontrada", 404);
        return SeguradoraModel.prismaParaModel(existente);
    }

    async atualizar(id: number, data: SeguradoraRequestDTO): Promise<SeguradoraModel> {
        if (!id || !data) throw new AppError("ID e dados são obrigatórios", 400);
        const existente = await prisma.seguradora.findUnique({ where: { id } });
        if (!existente) throw new AppError("Seguradora não encontrada", 404);
        const atualizada = await prisma.seguradora.update({
            where: { id },
            data: SeguradoraModel.updateDtos(data),
        });
        return SeguradoraModel.prismaParaModel(atualizada);
    }

    async deletar(id: number): Promise<SeguradoraModel> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.seguradora.findUnique({ where: { id } });
        if (!existente) throw new AppError("Seguradora não encontrada", 404);
        const deletada = await prisma.seguradora.delete({ where: { id } });
        return SeguradoraModel.prismaParaModel(deletada);
    }
}
