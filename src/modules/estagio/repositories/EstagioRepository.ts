import { PrismaClient } from '@prisma/client';
import { EstagioRequestDTO } from "../dtos/EstagioRequestDTO";
import { EstagioUpdateDTO } from "../dtos/EstagioUpdateDTO";
import { EstagioModel } from "../models/EstagioModel";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";

const prisma = new PrismaClient();

export class EstagioRepository {


    async criar(request: EstagioRequestDTO): Promise<EstagioModel> {
        const estagio = EstagioModel.dtos(request);
        if (!estagio) {
            throw new Error("Dados inválidos para criar estágio");
        }

        const existente = await prisma.estagio.findFirst({
            where: {
                alunoId: estagio.alunoId,
            },
        });
        if (existente) {
            throw new AppError("Este aluno já possui um estágio cadastrado.", 409);
        }

        const novo = await prisma.estagio.create({
            data: estagio.dataParaPrisma(),
            include: {
                instituicao: true,
                aluno: true,
                empresa: true,
                seguradora: true,
                motivoEncerramento: true
            }
        });
        return EstagioModel.prismaParaModel(novo);
    }

    async listar(pagination?: PaginationQuery & { search?: string }): Promise<{ estagios: EstagioModel[], total: number }> {
        const where: any = {};
        const search = (pagination as any)?.search as string | undefined;

        if (search && search.trim()) {
            where.OR = [
                { aluno: { nome: { contains: search } } },
                { empresa: { nome: { contains: search } } },
                { instituicao: { nome: { contains: search } } }
            ];
        }

        const [estagios, total] = await Promise.all([
            prisma.estagio.findMany({
                where,
                skip: pagination?.skip,
                take: pagination?.limit,
                include: {
                    instituicao: true,
                    aluno: true,
                    empresa: true,
                    seguradora: true,
                    motivoEncerramento: true
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.estagio.count({ where })
        ]);

        return {
            estagios: estagios.map(e => EstagioModel.prismaParaModel(e)),
            total
        };
    }

    async listarPorStatus(status: string): Promise<EstagioModel[]> {
        console.log("🔍 Repository - Status recebido:", status);
        console.log("🔍 Repository - Status como enum:", status as any);
        
        const list = await prisma.estagio.findMany({
            where: {
                status: status as any // Cast necessário para o enum do Prisma
            },
            include: {
                instituicao: true,
                aluno: true,
                empresa: true,
                seguradora: true,
                motivoEncerramento: true
            }
        });
        
        console.log("🔍 Repository - Resultados encontrados:", list.length);
        return list.map(e => EstagioModel.prismaParaModel(e));
    }

    async buscarPorId(id: number): Promise<EstagioModel | null> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.estagio.findUnique({
            where: { id }, include: {
                instituicao: true,
                aluno: true,
                empresa: true,
                seguradora: true,
                motivoEncerramento: true
            }
        });
        if (!existente) throw new AppError("Estágio não encontrado", 404);
        return EstagioModel.prismaParaModel(existente);
    }

    async atualizar(id: number, data: EstagioUpdateDTO): Promise<EstagioModel> {
        if (!id || !data) throw new AppError("ID e dados são obrigatórios", 400);
        const existente = await prisma.estagio.findUnique({ where: { id } });
        if (!existente) throw new AppError("Estágio não encontrado", 404);
        const atualizado = await prisma.estagio.update({
            where: { id },
            data: EstagioModel.updateDtos(data),
        });
        return EstagioModel.prismaParaModel(atualizado);
    }

    async deletar(id: number): Promise<EstagioModel> {
        if (!id) throw new Error("ID é obrigatório");
        const existente = await prisma.estagio.findUnique({ where: { id } });
        if (!existente) throw new AppError("Estágio não encontrado", 404);
        const deletado = await prisma.estagio.delete({ where: { id } });
        return EstagioModel.prismaParaModel(deletado);
    }


}