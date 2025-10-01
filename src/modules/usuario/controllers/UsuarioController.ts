import { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { UsuarioRequestDTO } from "../dtos/UsuarioRequestDTO";
import { UsuarioUpdateDTO } from "../dtos/UsuarioUpdateDTO";
import { TrocarSenhaDTO } from "../dtos/TrocarSenhaDTO";
import { processPaginationParams } from "../../../shared/utils/pagination";

export class UsuarioController {
    private service: UsuarioService;
    constructor() {
        this.service = new UsuarioService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const data: UsuarioRequestDTO = req.body;
            const usuario = await this.service.criar(data);
            return res.status(201).json(usuario);
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
            const { id } = req.params;
            const usuario = await this.service.buscarPorId(Number(id));
            return res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorEmail(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { email } = req.params;
            const usuario = await this.service.buscarPorEmail(email);
            return res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const data: UsuarioUpdateDTO = req.body;
            const usuario = await this.service.atualizar(Number(id), data);
            return res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async excluir(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            await this.service.deletar(Number(id));
            return res.status(204).json({ message: "Usuário deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

    async trocarSenha(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const dados: TrocarSenhaDTO = req.body;
            await this.service.trocarSenha(Number(id), dados);
            return res.status(200).json({ mensagem: "Senha atualizada com sucesso" });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const resultado = await this.service.login(req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { email } = req.body as { email: string };
            await this.service.solicitarRecuperacaoSenha(email);
            return res.status(200).json({ mensagem: "Se o email existir, enviaremos instruções" });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { token, novaSenha } = req.body as { token: string; novaSenha: string };
            await this.service.redefinirSenha(token, novaSenha);
            return res.status(200).json({ mensagem: "Senha redefinida com sucesso" });
        } catch (error) {
            next(error);
        }
    }
}
