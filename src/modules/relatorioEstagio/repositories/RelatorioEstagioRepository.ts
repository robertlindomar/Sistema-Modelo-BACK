import { PrismaClient } from '@prisma/client';
import { RelatorioEstagioRequestDTO } from "../dtos/RelatorioEstagioRequestDTO";
import { RelatorioEstagioModel } from "../models/RelatorioEstagioModel";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationParams } from "../../../shared/interfaces/PaginationResponse";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";

const prisma = new PrismaClient();

export class RelatorioEstagioRepository {
    async criar(request: RelatorioEstagioRequestDTO): Promise<RelatorioEstagioModel> {
        const relatorio = RelatorioEstagioModel.dtos(request);
        if (!relatorio) {
            throw new Error("Dados inválidos para criar relatório de estágio");
        }

        const existente = await prisma.relatorioEstagio.findFirst({
            where: {
                estagioId: relatorio.estagioId,
                tipo: relatorio.tipo,
            },
        });
        if (existente) {
            throw new AppError("Já existe um relatório deste tipo para este estágio.", 409);
        }

        const novo = await prisma.relatorioEstagio.create({
            data: relatorio.dataParaPrisma()
        });
        return RelatorioEstagioModel.prismaParaModel(novo);
    }

    async listar(params?: PaginationParams): Promise<PaginationResponse<RelatorioEstagioModel>> {
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const skip = (page - 1) * limit;

        // Construir filtros
        const where: any = {};

        if (params?.search) {
            where.OR = [
                { observacao: { contains: params.search } },
                { estagio: { aluno: { nome: { contains: params.search } } } },
                { estagio: { empresa: { nome: { contains: params.search } } } }
            ];
        }

        if (params?.tipo) {
            where.tipo = params.tipo;
        }

        if (params?.status) {
            const hoje = new Date();
            if (params.status === 'pendente') {
                where.dataEntregue = null;
                where.prazoEntrega = { gte: hoje };
            } else if (params.status === 'entregue') {
                where.dataEntregue = { not: null };
            } else if (params.status === 'atrasado') {
                where.dataEntregue = null;
                where.prazoEntrega = { lt: hoje };
            }
        }

        // Buscar total de registros
        const total = await prisma.relatorioEstagio.count({ where });

        // Buscar registros paginados
        const list = await prisma.relatorioEstagio.findMany({
            where,
            skip,
            take: limit,
            orderBy: { id: 'desc' },
            include: {
                estagio: {
                    include: {
                        aluno: true,
                        empresa: true
                    }
                }
            }
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data: list.map(r => {
                const model = RelatorioEstagioModel.prismaParaModel(r);
                (model as any).estagio = r.estagio;
                return model;
            }),
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        };
    }

    async buscarPorId(id: number): Promise<RelatorioEstagioModel | null> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.relatorioEstagio.findUnique({ where: { id } });
        if (!existente) throw new AppError("Relatório não encontrado", 404);
        return RelatorioEstagioModel.prismaParaModel(existente);
    }

    async atualizar(id: number, data: RelatorioEstagioRequestDTO): Promise<RelatorioEstagioModel> {
        if (!id || !data) throw new AppError("ID e dados são obrigatórios", 400);
        const existente = await prisma.relatorioEstagio.findUnique({ where: { id } });
        if (!existente) throw new AppError("Relatório não encontrado", 404);

        // Verificar se já existe outro relatório do mesmo tipo para o mesmo estágio
        if (data.tipo !== existente.tipo) {
            const duplicado = await prisma.relatorioEstagio.findFirst({
                where: {
                    estagioId: data.estagioId,
                    tipo: data.tipo,
                    id: { not: id }
                }
            });
            if (duplicado) {
                throw new AppError("Já existe um relatório deste tipo para este estágio.", 409);
            }
        }

        const atualizado = await prisma.relatorioEstagio.update({
            where: { id },
            data: RelatorioEstagioModel.dtos(data).dataParaPrisma(),
        });
        return RelatorioEstagioModel.prismaParaModel(atualizado);
    }

    async deletar(id: number): Promise<RelatorioEstagioModel> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.relatorioEstagio.findUnique({ where: { id } });
        if (!existente) throw new AppError("Relatório não encontrado", 404);
        const deletado = await prisma.relatorioEstagio.delete({ where: { id } });
        return RelatorioEstagioModel.prismaParaModel(deletado);
    }

    async buscarPorEstagio(estagioId: number): Promise<RelatorioEstagioModel[]> {
        if (!estagioId) throw new Error("ID do estágio é obrigatório");
        const list = await prisma.relatorioEstagio.findMany({
            where: { estagioId }
        });
        return list.map(r => RelatorioEstagioModel.prismaParaModel(r));
    }
}
