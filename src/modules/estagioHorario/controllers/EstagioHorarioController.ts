import { Request, Response, NextFunction } from 'express';
import { EstagioHorarioService } from '../services/EstagioHorarioService';
import { validateCreateEstagioHorario, validateCreateEstagioHorarioLote, validateUpdateEstagioHorario } from '../validations/estagioHorarioValidations';

export class EstagioHorarioController {
    private service: EstagioHorarioService;

    constructor() {
        this.service = new EstagioHorarioService();
    }

    async criar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const validationErrors = validateCreateEstagioHorario(req.body);
            if (validationErrors.length > 0) {
                return res.status(400).json({ error: validationErrors.join(', ') });
            }
            
            const horario = await this.service.criar(req.body);
            return res.status(201).json(horario);
        } catch (error) {
            next(error);
        }
    }

    async listar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const horarios = await this.service.listar();
            if (!horarios || horarios.length === 0) {
                return res.status(200).json({ mensagem: "Nenhum horário cadastrado" });
            }
            return res.status(200).json(horarios);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            const horario = await this.service.buscarPorId(id);
            if (!horario) return res.status(404).json({ error: "Horário não encontrado" });
            return res.status(200).json(horario);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorEstagio(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const estagioId = Number(req.params.estagioId);
            if (isNaN(estagioId)) return res.status(400).json({ error: "ID do estágio inválido" });
            const horarios = await this.service.buscarPorEstagio(estagioId);
            return res.status(200).json(horarios);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const validationErrors = validateUpdateEstagioHorario(req.body);
            if (validationErrors.length > 0) {
                return res.status(400).json({ error: validationErrors.join(', ') });
            }
            
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            const horarioAtualizado = await this.service.atualizar(id, req.body);
            return res.status(200).json(horarioAtualizado);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
            await this.service.deletar(id);
            return res.status(200).json({ mensagem: "Horário deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

    async criarLote(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log('Dados recebidos no criarLote:', JSON.stringify(req.body, null, 2));
            
            const validationErrors = validateCreateEstagioHorarioLote(req.body);
            if (validationErrors.length > 0) {
                console.log('Erros de validação:', validationErrors);
                return res.status(400).json({ error: validationErrors.join(', ') });
            }
            
            const horarios = await this.service.criarLote(req.body);
            return res.status(201).json(horarios);
        } catch (error) {
            console.error('Erro no criarLote:', error);
            next(error);
        }
    }
}
