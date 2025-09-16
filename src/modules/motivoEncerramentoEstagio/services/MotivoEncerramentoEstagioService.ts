import { MotivoEncerramentoEstagioRepository } from '../repositories/MotivoEncerramentoEstagioRepository';
import { MotivoEncerramentoEstagioRequestDTO } from '../dtos/MotivoEncerramentoEstagioRequestDTO';
import { MotivoEncerramentoEstagioResponseDTO } from '../dtos/MotivoEncerramentoEstagioResponseDTO';
import { AppError } from '../../../shared/errors/AppError';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MotivoEncerramentoEstagioService {
    private repository = new MotivoEncerramentoEstagioRepository();

    async criar(data: MotivoEncerramentoEstagioRequestDTO): Promise<MotivoEncerramentoEstagioResponseDTO> {
        if (!data.estagioId || !data.motivoPrincipal) {
            throw new AppError('Estágio e motivo principal são obrigatórios.', 400);
        }
        
        // Verificar se o estágio existe e está ativo
        const estagio = await prisma.estagio.findUnique({
            where: { id: data.estagioId }
        });
        
        if (!estagio) {
            throw new AppError('Estágio não encontrado.', 404);
        }
        
        if (estagio.status !== 'Ativo') {
            throw new AppError('Apenas estágios ativos podem receber motivos de encerramento.', 400);
        }
        
        // Validar se o status fornecido é válido
        if (data.statusEstagio && !['Concluido', 'Cancelado'].includes(data.statusEstagio)) {
            throw new AppError('Status inválido. Valores permitidos: Concluido, Cancelado', 400);
        }
        
        const motivo = await this.repository.criar(data);
        
        // Determina o status baseado no motivo de encerramento
        const novoStatus = data.statusEstagio === 'Cancelado' ? 'Cancelado' : 'Concluido';
        
        // Prepara os dados para atualização do estágio
        const dadosAtualizacao: any = {
            motivoEncerramentoId: motivo.id,
            status: novoStatus
        };
        
        // Se for cancelado, adiciona a data de cancelamento
        if (novoStatus === 'Cancelado') {
            if (!data.dataCancelamento) {
                throw new AppError('Data de cancelamento é obrigatória quando o status é Cancelado.', 400);
            }
            dadosAtualizacao.dataCancelamento = new Date(data.dataCancelamento);
        }
        
        // Atualiza o estágio automaticamente
        await prisma.estagio.update({
            where: { id: motivo.estagioId },
            data: dadosAtualizacao
        });
        
        return motivo.toResponse();
    }

    async listar(): Promise<MotivoEncerramentoEstagioResponseDTO[]> {
        const motivos = await this.repository.listar();
        return motivos.map(m => m.toResponse());
    }

    async buscarPorId(id: number): Promise<MotivoEncerramentoEstagioResponseDTO> {
        const motivo = await this.repository.buscarPorId(id);
        if (!motivo) throw new AppError('Motivo não encontrado', 404);
        return motivo.toResponse();
    }

    async buscarPorEstagioId(estagioId: number): Promise<MotivoEncerramentoEstagioResponseDTO> {
        const motivo = await this.repository.buscarPorEstagioId(estagioId);
        if (!motivo) throw new AppError('Motivo não encontrado para este estágio', 404);
        return motivo.toResponse();
    }

    async atualizar(id: number, data: MotivoEncerramentoEstagioRequestDTO): Promise<MotivoEncerramentoEstagioResponseDTO> {
        // Buscar o motivo atual para obter o estagioId
        const motivoAtual = await this.repository.buscarPorId(id);
        if (!motivoAtual) {
            throw new AppError('Motivo não encontrado', 404);
        }
        
        // Validar se o status fornecido é válido
        if (data.statusEstagio && !['Concluido', 'Cancelado'].includes(data.statusEstagio)) {
            throw new AppError('Status inválido. Valores permitidos: Concluido, Cancelado', 400);
        }
        
        const motivo = await this.repository.atualizar(id, data);
        
        // Atualizar o status do estágio se fornecido
        if (data.statusEstagio) {
            const dadosAtualizacao: any = {
                status: data.statusEstagio
            };
            
            // Se for cancelado, adiciona a data de cancelamento
            if (data.statusEstagio === 'Cancelado') {
                if (!data.dataCancelamento) {
                    throw new AppError('Data de cancelamento é obrigatória quando o status é Cancelado.', 400);
                }
                dadosAtualizacao.dataCancelamento = new Date(data.dataCancelamento);
            } else {
                // Se for concluído, remove a data de cancelamento
                dadosAtualizacao.dataCancelamento = null;
            }
            
            // Atualiza o estágio
            await prisma.estagio.update({
                where: { id: motivoAtual.estagioId },
                data: dadosAtualizacao
            });
        }
        
        return motivo.toResponse();
    }

    async deletar(id: number): Promise<void> {
        await this.repository.deletar(id);
    }
}
