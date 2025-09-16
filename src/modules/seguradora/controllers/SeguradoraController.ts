import { SeguradoraService } from "../services/SeguradoraService";
import { Request, Response, NextFunction } from "express";
import { processPaginationParams } from "../../../shared/utils/pagination";

export class SeguradoraController {
    private service: SeguradoraService;

    constructor() {
        this.service = new SeguradoraService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const seguradora = await this.service.criar(req.body);
            return res.status(201).json(seguradora);
        } catch (error) {
            next(error);
        }
    }

    async listar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const pagination = processPaginationParams(req.query);
            const resultado = await this.service.listar(pagination);
            return res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            const seguradora = await this.service.buscarPorId(id);
            if (!seguradora) return res.status(404).json({ error: "Seguradora não encontrada" });
            return res.status(200).json(seguradora);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            const seguradoraAtualizada = await this.service.atualizar(id, req.body);
            return res.status(200).json(seguradoraAtualizada);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            await this.service.deletar(id);
            return res.status(200).json({ mensagem: "Seguradora deletada com sucesso" });
        } catch (error) {
            next(error);
        }
    }
}
