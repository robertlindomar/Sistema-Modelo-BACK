import { PrismaClient } from '@prisma/client';
import { AlunoRequestDTO } from "../dtos/AlunoRequestDTO";
import { AlunoUpdateDTO } from "../dtos/AlunoUpdateDTO";
import { AlunoModel } from "../models/AlunoModel";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";

const prisma = new PrismaClient();

export class AlunoRepository {
    async criar(request: AlunoRequestDTO): Promise<AlunoModel> {
        const aluno = AlunoModel.dtos(request);
        if (!aluno) {
            throw new Error("Dados inválidos para criar aluno");
        }

        const existente = await prisma.aluno.findFirst({
            where: {
                nome: aluno.nome,
                cidadeId: aluno.cidadeId
            },

        });
        if (existente) {
            throw new AppError("Aluno com este nome já existe nesta cidade.", 409);
        }

        const novo = await prisma.aluno.create({
            data: aluno.dataParaPrisma(),
            include: {
                cidade: true,
                curso: true
            }
        });
        return AlunoModel.prismaParaModel(novo);
    }

    async listar(pagination?: PaginationQuery & { search?: string; nome?: string; cpf?: string; curso?: string; cidade?: string }): Promise<{ alunos: AlunoModel[], total: number }> {
        const where: any = {};

        const search = (pagination as any)?.search as string | undefined;
        const nome = (pagination as any)?.nome as string | undefined;
        const cpf = (pagination as any)?.cpf as string | undefined;
        const cursoNome = (pagination as any)?.curso as string | undefined;
        const cidadeNome = (pagination as any)?.cidade as string | undefined;

        if (search && search.trim()) {
            where.OR = [
                { nome: { contains: search } },
                { cpf: { contains: search } }
            ];
        }
        if (nome && nome.trim()) {
            where.nome = { contains: nome };
        }
        if (cpf && cpf.trim()) {
            where.cpf = { contains: cpf };
        }
        if (cursoNome && cursoNome.trim()) {
            where.curso = { nome: { contains: cursoNome } };
        }
        if (cidadeNome && cidadeNome.trim()) {
            where.cidade = { nome: { contains: cidadeNome } };
        }

        const [alunos, total] = await Promise.all([
            prisma.aluno.findMany({
                where,
                skip: pagination?.skip,
                take: pagination?.limit,
                include: {
                    cidade: true,
                    curso: true
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.aluno.count({ where })
        ]);

        return {
            alunos: alunos.map(a => AlunoModel.prismaParaModel(a)),
            total
        };
    }

    async buscarPorId(id: number): Promise<AlunoModel | null> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.aluno.findUnique({ where: { id }, include: { cidade: true, curso: true } });
        if (!existente) throw new AppError("Aluno não encontrado", 404);
        return AlunoModel.prismaParaModel(existente);
    }

    async atualizar(id: number, data: AlunoUpdateDTO): Promise<AlunoModel> {
        if (!id || !data) throw new AppError("ID e dados são obrigatórios", 400);
        const existente = await prisma.aluno.findUnique({ where: { id } });
        if (!existente) throw new AppError("Aluno não encontrado", 404);
        const atualizado = await prisma.aluno.update({
            where: { id },
            data: AlunoModel.updateDtos(data),
        });
        return AlunoModel.prismaParaModel(atualizado);
    }

    async deletar(id: number): Promise<AlunoModel> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.aluno.findUnique({ where: { id } });
        if (!existente) throw new AppError("Aluno não encontrado", 404);
        const deletado = await prisma.aluno.delete({ where: { id } });
        return AlunoModel.prismaParaModel(deletado);
    }

    async buscarPorCidade(cidadeId: number): Promise<AlunoModel[]> {
        if (!cidadeId) throw new Error("cidadeId é obrigatório");
        const list = await prisma.aluno.findMany({
            where: { cidadeId },
            include: { cidade: true, curso: true }
        });
        return list.map(a => AlunoModel.prismaParaModel(a));
    }
}
