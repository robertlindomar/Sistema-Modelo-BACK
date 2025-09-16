import { Request, Response, NextFunction } from 'express';
import { RelatorioEstagioService } from '../services/RelatorioEstagioService';
import { PaginationParams } from '../../../shared/interfaces/PaginationResponse';

export class RelatorioEstagioController {
    private service: RelatorioEstagioService;

    constructor() {
        this.service = new RelatorioEstagioService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const relatorio = await this.service.criar(req.body);
            return res.status(201).json(relatorio);
        } catch (error) {
            next(error);
        }
    }

    async listar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const paginationParams: PaginationParams = {
                page: parseInt(req.query.page as string) || 1,
                limit: parseInt(req.query.limit as string) || 10,
                search: req.query.search as string,
                tipo: req.query.tipo as 'Inicial' | 'Parcial' | 'Final',
                status: req.query.status as 'pendente' | 'entregue' | 'atrasado'
            };

            const result = await this.service.listar(paginationParams);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            const relatorio = await this.service.buscarPorId(id);
            if (!relatorio) return res.status(404).json({ error: "Relatório não encontrado" });
            return res.status(200).json(relatorio);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorEstagio(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const estagioId = Number(req.params.estagioId);
            if (isNaN(estagioId)) return res.status(400).json({ error: "ID de estágio inválido" });
            const relatorios = await this.service.buscarPorEstagio(estagioId);
            if (!relatorios || relatorios.length === 0) {
                return res.status(200).json({ mensagem: "Nenhum relatório encontrado para este estágio" });
            }
            return res.status(200).json(relatorios);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            const relatorioAtualizado = await this.service.atualizar(id, req.body);
            return res.status(200).json(relatorioAtualizado);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            await this.service.deletar(id);
            return res.status(200).json({ mensagem: "Relatório deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }
}
