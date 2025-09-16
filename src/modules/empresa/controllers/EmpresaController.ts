import { EmpresaService } from "../services/EmpresaService";
import { Request, Response, NextFunction } from "express";
import { processPaginationParams } from "../../../shared/utils/pagination";
import { EmpresaUpdateDTO } from "../dtos/EmpresaUpdateDTO";

export class EmpresaController {
    private service: EmpresaService;
    constructor() {
        this.service = new EmpresaService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const empresa = await this.service.criar(req.body);
            return res.status(201).json(empresa);
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
            const empresa = await this.service.buscarPorId(id);
            return res.status(200).json(empresa);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            const data: EmpresaUpdateDTO = req.body;
            const empresaAtualizada = await this.service.atualizar(id, data);
            return res.status(200).json(empresaAtualizada);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            await this.service.deletar(id);
            return res.status(200).json({ mensagem: "Empresa deletada com sucesso" });
        } catch (error) {
            next(error);
        }
    }
}