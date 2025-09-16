import { PrismaClient } from '@prisma/client';
import { CidadeRequestDTO } from "../dtos/CidadeRequestDTO";
import { CidadeUpdateDTO } from "../dtos/CidadeUpdateDTO";
import { CidadeModel } from "../models/CidadeModel";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";

const prisma = new PrismaClient();

export class CidadeRepository {

    async criar(request: CidadeRequestDTO): Promise<CidadeModel> {
        const cidade = CidadeModel.dtos(request);
        if (!cidade) {
            throw new Error("Dados inválidos para criar cidade");
        }

        const cidadeExistente = await prisma.cidade.findFirst({
            where: {
                nome: cidade.nome,
                uf: cidade.uf
            },
        });

        if (cidadeExistente) {
            throw new AppError("Cidade com este nome e UF já existe.", 409);
        }

        const novaCidade = await prisma.cidade.create({
            data: cidade.dataParaPrisma(),
        });

        return CidadeModel.prismaParaModel(novaCidade);
    }

    async listar(pagination?: PaginationQuery): Promise<{ cidades: CidadeModel[], total: number }> {
        const [cidades, total] = await Promise.all([
            prisma.cidade.findMany({
                skip: pagination?.skip,
                take: pagination?.limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.cidade.count()
        ]);

        return {
            cidades: cidades.map(cidade => CidadeModel.prismaParaModel(cidade)),
            total
        };
    }

    async buscarPorId(id: number): Promise<CidadeModel | null> {
        if (!id) {
            throw new Error("ID é obrigatório");
        }
        const cidadeExistente = await prisma.cidade.findUnique({
            where: { id },
        });
        if (!cidadeExistente) {
            throw new AppError("Cidade não encontrada", 404);
        }

        return CidadeModel.prismaParaModel(cidadeExistente);
    }

    async buscarPorNome(nome: string): Promise<CidadeModel | null> {
        if (!nome) {
            throw new Error("Nome é obrigatório");
        }
        const cidadeExistente = await prisma.cidade.findFirst({
            where: { nome },
        });
        if (!cidadeExistente) {
            throw new AppError("Cidade não encontrada", 404);
        }

        return CidadeModel.prismaParaModel(cidadeExistente);
    }

    async buscarPorUf(uf: string): Promise<CidadeModel[] | null> {
        if (!uf) {
            throw new AppError("UF é obrigatório", 400);
        }

        const cidadesExistentes = await prisma.cidade.findMany({
            where: { uf: uf.toUpperCase() },
        });
        

        if (cidadesExistentes.length === 0) {
            throw new AppError("Nenhuma cidade encontrada para este estado", 404);
        }

        if (!cidadesExistentes) {
            throw new AppError("Cidades não encontrada", 404);
        }

        return cidadesExistentes.map(cidade => CidadeModel.prismaParaModel(cidade));
    }

    async atualizar(id: number, data: CidadeUpdateDTO): Promise<CidadeModel> {
        if (!id || !data) {
            throw new AppError("ID e dados são obrigatórios", 400);
        }

        const cidadeExistente = await prisma.cidade.findUnique({
            where: { id },
        });

        if (!cidadeExistente) {
            throw new AppError("Cidade não encontrada", 404);
        }

        const cidadeAtualizada = await prisma.cidade.update({
            where: { id },
            data: CidadeModel.updateDtos(data),
        });

        return CidadeModel.prismaParaModel(cidadeAtualizada);
    }

    async deletar(id: number): Promise<CidadeModel> {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const cidadeExistente = await prisma.cidade.findUnique({
            where: { id },
        });

        if (!cidadeExistente) {
            throw new AppError("Cidade não encontrada", 404);
        }

        const cidadeDeletada = await prisma.cidade.delete({
            where: { id },
        });

        return CidadeModel.prismaParaModel(cidadeDeletada);
    }

}