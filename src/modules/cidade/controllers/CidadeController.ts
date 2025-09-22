import { CidadeService } from "../services/CidadeService";
import { Request, Response, NextFunction } from "express";
import { processPaginationParams } from "../../../shared/utils/pagination";
import { CidadeUpdateDTO } from "../dtos/CidadeUpdateDTO";

export class CidadeController {
    private service: CidadeService;
    constructor() {
        this.service = new CidadeService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const cidade = await this.service.criar(req.body);
            return res.status(201).json(cidade);
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
            const cidade = await this.service.buscarPorId(id);
            return res.status(200).json(cidade);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorNome(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { nome } = req.params;
            const cidade = await this.service.buscarPorNome(String(nome));
            return res.status(200).json(cidade);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorUf(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { uf } = req.params;
            const cidades = await this.service.buscarPorUf(String(uf));
            return res.status(200).json(cidades);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            const data: CidadeUpdateDTO = req.body;
            const cidadeAtualizada = await this.service.atualizar(id, data);
            return res.status(200).json(cidadeAtualizada);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            await this.service.deletar(id);
            return res.status(200).json({ mensagem: "Cidade deletada com sucesso" });
        } catch (error) {
            next(error);
        }
    }
}