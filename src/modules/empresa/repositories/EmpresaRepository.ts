import { PrismaClient } from '@prisma/client';
import { EmpresaRequestDTO } from "../dtos/EmpresaRequestDTO";
import { EmpresaUpdateDTO } from "../dtos/EmpresaUpdateDTO";
import { EmpresaModel } from "../models/EmpresaModel";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";

const prisma = new PrismaClient();

export class EmpresaRepository {

    async criar(request: EmpresaRequestDTO): Promise<EmpresaModel> {

        const empresa = EmpresaModel.dtos(request);

        if (!empresa) {
            throw new Error("Dados inválidos para criar empresa");
        }

        const existente = await prisma.empresa.findFirst({
            where: {
                nome: empresa.nome,
                cidadeId: empresa.cidadeId
            },
        });

        if (existente) {
            throw new AppError("Empresa com este nome já existe nesta cidade.", 409);
        }

        const nova = await prisma.empresa.create({
            data: empresa.dataParaPrisma(),
            include: {
                cidade: true
            }
        });

        return EmpresaModel.prismaParaModel(nova);
    }

    async listar(pagination?: PaginationQuery & { search?: string; nome?: string; cnpj?: string }): Promise<{ empresas: EmpresaModel[], total: number }> {
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

        const [empresas, total] = await Promise.all([
            prisma.empresa.findMany({
                where,
                skip: pagination?.skip,
                take: pagination?.limit,
                include: {
                    cidade: true
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.empresa.count({ where })
        ]);

        return {
            empresas: empresas.map(e => EmpresaModel.prismaParaModel(e)),
            total
        };
    }

    async buscarPorId(id: number): Promise<EmpresaModel | null> {

        if (!id) throw new Error("ID é obrigatório");

        const existente = await prisma.empresa.findUnique({ where: { id }, include: { cidade: true } });

        if (!existente) throw new AppError("Empresa não encontrada", 404);

        return EmpresaModel.prismaParaModel(existente);
    }

    async atualizar(id: number, data: EmpresaUpdateDTO): Promise<EmpresaModel> {

        if (!id || !data) throw new AppError("ID e dados são obrigatórios", 400);

        const existente = await prisma.empresa.findUnique({ where: { id } });

        if (!existente) throw new AppError("Empresa não encontrada", 404);

        const atualizada = await prisma.empresa.update({
            where: { id },
            data: EmpresaModel.updateDtos(data),
        });

        return EmpresaModel.prismaParaModel(atualizada);
    }

    async deletar(id: number): Promise<EmpresaModel> {

        if (!id) throw new Error("ID é obrigatório");

        const existente = await prisma.empresa.findUnique({ where: { id } });

        if (!existente) throw new AppError("Empresa não encontrada", 404);

        const deletada = await prisma.empresa.delete({ where: { id } });

        return EmpresaModel.prismaParaModel(deletada);
    }

    async buscarPorCidade(cidadeId: number): Promise<EmpresaModel[]> {

        if (!cidadeId) throw new Error("cidadeId é obrigatório");

        const list = await prisma.empresa.findMany({
            where: { cidadeId },
            include: { cidade: true }
        });

        return list.map(e => EmpresaModel.prismaParaModel(e));
    }
}