import { PrismaClient } from '@prisma/client';
import { CursoRequestDTO } from "../dtos/CursoRequestDTO";
import { CursoUpdateDTO } from "../dtos/CursoUpdateDTO";
import { CursoModel } from "../models/CursoModel";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";

const prisma = new PrismaClient();

export class CursoRepository {
    async criar(request: CursoRequestDTO): Promise<CursoModel> {
        const curso = CursoModel.dtos(request);
        if (!curso) {
            throw new Error("Dados inválidos para criar curso");
        }

        const cursoExistente = await prisma.curso.findFirst({
            where: {
                nome: curso.nome
            },
        });

        if (cursoExistente) {
            throw new AppError("Curso com este nome já existe.", 409);
        }

        const novoCurso = await prisma.curso.create({
            data: curso.dataParaPrisma(),
        });

        return CursoModel.prismaParaModel(novoCurso);
    }

    async listar(pagination?: PaginationQuery & { search?: string; nome?: string; habilitacao?: string; nivel?: string }): Promise<{ cursos: CursoModel[], total: number }> {
        const where: any = {};
        const search = (pagination as any)?.search as string | undefined;
        const nome = (pagination as any)?.nome as string | undefined;
        const habilitacao = (pagination as any)?.habilitacao as string | undefined;
        const nivel = (pagination as any)?.nivel as string | undefined;

        if (search && search.trim()) {
            where.OR = [
                { nome: { contains: search } },
                { habilitacao: { contains: search } },
                { nivel: { contains: search } }
            ];
        }
        if (nome && nome.trim()) {
            where.nome = { contains: nome };
        }
        if (habilitacao && habilitacao.trim()) {
            where.habilitacao = { contains: habilitacao };
        }
        if (nivel && nivel.trim()) {
            where.nivel = { contains: nivel };
        }

        const [cursos, total] = await Promise.all([
            prisma.curso.findMany({
                where,
                skip: pagination?.skip,
                take: pagination?.limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.curso.count({ where })
        ]);

        return {
            cursos: cursos.map(curso => CursoModel.prismaParaModel(curso)),
            total
        };
    }

    async buscarPorId(id: number): Promise<CursoModel | null> {
        if (!id) {
            throw new Error("ID é obrigatório");
        }
        const cursoExistente = await prisma.curso.findUnique({
            where: { id },
        });
        if (!cursoExistente) {
            throw new AppError("Curso não encontrado", 404);
        }

        return CursoModel.prismaParaModel(cursoExistente);
    }

    async atualizar(id: number, data: CursoUpdateDTO): Promise<CursoModel> {
        if (!id || !data) {
            throw new AppError("ID e dados são obrigatórios", 400);
        }

        const cursoExistente = await prisma.curso.findUnique({
            where: { id },
        });

        if (!cursoExistente) {
            throw new AppError("Curso não encontrado", 404);
        }

        const cursoAtualizado = await prisma.curso.update({
            where: { id },
            data: CursoModel.updateDtos(data),
        });

        return CursoModel.prismaParaModel(cursoAtualizado);
    }

    async deletar(id: number): Promise<CursoModel> {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const cursoExistente = await prisma.curso.findUnique({
            where: { id },
        });

        if (!cursoExistente) {
            throw new AppError("Curso não encontrado", 404);
        }

        const cursoDeletado = await prisma.curso.delete({
            where: { id },
        });

        return CursoModel.prismaParaModel(cursoDeletado);
    }
}
