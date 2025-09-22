import { PrismaClient } from '@prisma/client';
import { InstituicaoRequestDTO } from "../dtos/InstituicaoRequestDTO";
import { InstituicaoUpdateDTO } from "../dtos/InstituicaoUpdateDTO";
import { InstituicaoModel } from "../models/InstituicaoModel";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";

const prisma = new PrismaClient();

export class InstituicaoRepository {
    async criar(request: InstituicaoRequestDTO): Promise<InstituicaoModel> {
        const instituicao = InstituicaoModel.dtos(request);
        if (!instituicao) {
            throw new Error("Dados inválidos para criar instituição");
        }

        const existente = await prisma.instituicao.findFirst({
            where: {
                nome: instituicao.nome,
                cidadeId: instituicao.cidadeId
            },
        });
        if (existente) {
            throw new AppError("Instituição com este nome já existe nesta cidade.", 409);
        }

        const nova = await prisma.instituicao.create({
            data: instituicao.dataParaPrisma(),
            include: {
                cidade: true
            }
        });
        return InstituicaoModel.prismaParaModel(nova);
    }

    async listar(pagination?: PaginationQuery & { search?: string; nome?: string; cnpj?: string }): Promise<{ instituicoes: InstituicaoModel[], total: number }> {
        const where: any = {};
        const search = (pagination as any)?.search as string | undefined;
        const nome = (pagination as any)?.nome as string | undefined;
        const cnpj = (pagination as any)?.cnpj as string | undefined;

        if (search && search.trim()) {
            where.OR = [
                { nome: { contains: search } },
                { nomeFantasia: { contains: search } },
                { cnpj: { contains: search } }
            ];
        }
        if (nome && nome.trim()) {
            where.nome = { contains: nome };
        }
        if (cnpj && cnpj.trim()) {
            where.cnpj = { contains: cnpj };
        }

        const [instituicoes, total] = await Promise.all([
            prisma.instituicao.findMany({
                where,
                skip: pagination?.skip,
                take: pagination?.limit,
                include: {
                    cidade: true
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.instituicao.count({ where })
        ]);

        return {
            instituicoes: instituicoes.map(i => InstituicaoModel.prismaParaModel(i)),
            total
        };
    }

    async buscarPorId(id: number): Promise<InstituicaoModel | null> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.instituicao.findUnique({ where: { id }, include: { cidade: true } });
        if (!existente) throw new AppError("Instituição não encontrada", 404);
        return InstituicaoModel.prismaParaModel(existente);
    }

    async atualizar(id: number, data: InstituicaoUpdateDTO): Promise<InstituicaoModel> {
        if (!id || !data) throw new AppError("ID e dados são obrigatórios", 400);
        const existente = await prisma.instituicao.findUnique({ where: { id } });
        if (!existente) throw new AppError("Instituição não encontrada", 404);
        const atualizada = await prisma.instituicao.update({
            where: { id },
            data: InstituicaoModel.updateDtos(data),
        });
        return InstituicaoModel.prismaParaModel(atualizada);
    }

    async deletar(id: number): Promise<InstituicaoModel> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.instituicao.findUnique({ where: { id } });
        if (!existente) throw new AppError("Instituição não encontrada", 404);
        const deletada = await prisma.instituicao.delete({ where: { id } });
        return InstituicaoModel.prismaParaModel(deletada);
    }

    async buscarPorCidade(cidadeId: number): Promise<InstituicaoModel[]> {
        if (!cidadeId) throw new Error("cidadeId é obrigatório");
        const list = await prisma.instituicao.findMany({
            where: { cidadeId },
            include: { cidade: true }
        });
        return list.map(i => InstituicaoModel.prismaParaModel(i));
    }
}
