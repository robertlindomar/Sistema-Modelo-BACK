import { EstagioService } from "../services/EstagioService";
import { Request, Response, NextFunction } from "express";
import { processPaginationParams } from "../../../shared/utils/pagination";
import { EstagioUpdateDTO } from "../dtos/EstagioUpdateDTO";

export class EstagioController {
    private service: EstagioService;
    constructor() {
        this.service = new EstagioService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const estagio = await this.service.criar(req.body);
            return res.status(201).json(estagio);
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

    async listarPorStatus(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { status } = req.query;
            const estagios = await this.service.listarPorStatus(status as string);
            return res.status(200).json(estagios);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            const estagio = await this.service.buscarPorId(id);
            return res.status(200).json(estagio);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            const data: EstagioUpdateDTO = req.body;
            const estagioAtualizado = await this.service.atualizar(id, data);
            return res.status(200).json(estagioAtualizado);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            await this.service.deletar(id);
            return res.status(204).json({ message: "Estágio deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }


}