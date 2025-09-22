import { InstituicaoService } from "../services/InstituicaoService";
import { Request, Response, NextFunction } from "express";
import { processPaginationParams } from "../../../shared/utils/pagination";

export class InstituicaoController {
    private service: InstituicaoService;
    constructor() {
        this.service = new InstituicaoService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const instituicao = await this.service.criar(req.body);

            return res.status(201).json(instituicao);
        } catch (error) {
            next(error);
        }
    }

    async listar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const pagination = processPaginationParams(req.query);
            const resultado = await this.service.listar({ ...req.query, ...pagination });
            return res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            const instituicao = await this.service.buscarPorId(id);
            if (!instituicao) return res.status(404).json({ error: "Instituição não encontrada" });
            return res.status(200).json(instituicao);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            const instituicaoAtualizada = await this.service.atualizar(id, req.body);
            return res.status(200).json(instituicaoAtualizada);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            await this.service.deletar(id);
            return res.status(204).json({ message: "Instituição deletada com sucesso" });
        } catch (error) {
            next(error);
        }
    }

    async buscarPorCidade(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const cidadeId = Number(req.params.cidadeId || req.query.cidadeId);
            if (isNaN(cidadeId)) return res.status(400).json({ error: "cidadeId inválido" });
            const instituicoes = await this.service.buscarPorCidade(cidadeId);
            if (!instituicoes || instituicoes.length === 0) {
                return res.status(200).json({ mensagem: "Nenhuma instituição encontrada para esta cidade" });
            }
            return res.status(200).json(instituicoes);
        } catch (error) {
            next(error);
        }
    }
}
