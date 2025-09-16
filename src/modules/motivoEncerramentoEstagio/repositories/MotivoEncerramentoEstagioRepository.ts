import { PrismaClient } from '@prisma/client';
import { MotivoEncerramentoEstagioModel } from '../models/MotivoEncerramentoEstagioModel';
import { MotivoEncerramentoEstagioRequestDTO } from '../dtos/MotivoEncerramentoEstagioRequestDTO';
import { AppError } from '../../../shared/errors/AppError';

const prisma = new PrismaClient();

export class MotivoEncerramentoEstagioRepository {
    async criar(data: MotivoEncerramentoEstagioRequestDTO): Promise<MotivoEncerramentoEstagioModel> {
        const motivo = await prisma.motivoEncerramentoEstagio.create({
            data: {
                estagioId: data.estagioId,
                motivoPrincipal: data.motivoPrincipal,
                motivoPrincipalOutros: data.motivoPrincipalOutros,
                motivosEmpresa: data.motivosEmpresa,
                motivosEmpresaOutros: data.motivosEmpresaOutros
            }
        });
        return MotivoEncerramentoEstagioModel.fromPrisma(motivo);
    }

    async listar(): Promise<MotivoEncerramentoEstagioModel[]> {
        const motivos = await prisma.motivoEncerramentoEstagio.findMany({
            include: {
                estagio: {
                    include: {
                        aluno: true,
                        empresa: true,
                        instituicao: true
                    }
                }
            }
        });
        return motivos.map(MotivoEncerramentoEstagioModel.fromPrisma);
    }

    async buscarPorId(id: number): Promise<MotivoEncerramentoEstagioModel | null> {
        const motivo = await prisma.motivoEncerramentoEstagio.findUnique({ 
            where: { id },
            include: {
                estagio: {
                    include: {
                        aluno: true,
                        empresa: true,
                        instituicao: true
                    }
                }
            }
        });
        return motivo ? MotivoEncerramentoEstagioModel.fromPrisma(motivo) : null;
    }

    async buscarPorEstagioId(estagioId: number): Promise<MotivoEncerramentoEstagioModel | null> {
        const motivo = await prisma.motivoEncerramentoEstagio.findUnique({ 
            where: { estagioId },
            include: {
                estagio: {
                    include: {
                        aluno: true,
                        empresa: true,
                        instituicao: true
                    }
                }
            }
        });
        return motivo ? MotivoEncerramentoEstagioModel.fromPrisma(motivo) : null;
    }

    async atualizar(id: number, data: MotivoEncerramentoEstagioRequestDTO): Promise<MotivoEncerramentoEstagioModel> {
        const motivo = await prisma.motivoEncerramentoEstagio.update({
            where: { id },
            data: {
                motivoPrincipal: data.motivoPrincipal,
                motivoPrincipalOutros: data.motivoPrincipalOutros,
                motivosEmpresa: data.motivosEmpresa,
                motivosEmpresaOutros: data.motivosEmpresaOutros
            }
        });
        return MotivoEncerramentoEstagioModel.fromPrisma(motivo);
    }

    async deletar(id: number): Promise<void> {
        await prisma.motivoEncerramentoEstagio.delete({ where: { id } });
    }
}
