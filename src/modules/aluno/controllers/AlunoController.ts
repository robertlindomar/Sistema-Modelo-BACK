import { AlunoService } from "../services/AlunoService";
import { Request, Response, NextFunction } from "express";
import { processPaginationParams } from "../../../shared/utils/pagination";
import { AlunoUpdateDTO } from "../dtos/AlunoUpdateDTO";

export class AlunoController {
    private service: AlunoService;
    constructor() {
        this.service = new AlunoService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const aluno = await this.service.criar(req.body);
            return res.status(201).json(aluno);
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
            const aluno = await this.service.buscarPorId(id);
            return res.status(200).json(aluno);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            const data: AlunoUpdateDTO = req.body;
            const alunoAtualizado = await this.service.atualizar(id, data);
            return res.status(200).json(alunoAtualizado);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            await this.service.deletar(id);
            return res.status(200).json({ mensagem: "Aluno deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

    
}
