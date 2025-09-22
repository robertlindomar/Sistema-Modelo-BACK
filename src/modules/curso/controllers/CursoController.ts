import { CursoService } from "../services/CursoService";
import { Request, Response, NextFunction } from "express";
import { processPaginationParams } from "../../../shared/utils/pagination";
import { CursoUpdateDTO } from "../dtos/CursoUpdateDTO";

export class CursoController {
    private service: CursoService;
    constructor() {
        this.service = new CursoService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const curso = await this.service.criar(req.body);
            return res.status(201).json(curso);
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
            const curso = await this.service.buscarPorId(id);
            if (!curso) return res.status(404).json({ error: "Curso não encontrado" });
            return res.status(200).json(curso);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            const data: CursoUpdateDTO = req.body;
            const cursoAtualizado = await this.service.atualizar(id, data);
            return res.status(200).json(cursoAtualizado);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            await this.service.deletar(id);
            return res.status(200).json({ mensagem: "Curso deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }
}
