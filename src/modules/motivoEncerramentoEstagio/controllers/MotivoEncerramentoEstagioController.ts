import { Request, Response, NextFunction } from 'express';
import { MotivoEncerramentoEstagioService } from '../services/MotivoEncerramentoEstagioService';

export class MotivoEncerramentoEstagioController {
    private service = new MotivoEncerramentoEstagioService();

    criar(req: Request, res: Response, next: NextFunction) {
        this.service.criar(req.body)
            .then(motivo => res.status(201).json(motivo))
            .catch(next);
    }

    listar(req: Request, res: Response, next: NextFunction) {
        this.service.listar()
            .then(motivos => res.status(200).json(motivos))
            .catch(next);
    }

    buscarPorId(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        this.service.buscarPorId(id)
            .then(motivo => res.status(200).json(motivo))
            .catch(next);
    }

    buscarPorEstagioId(req: Request, res: Response, next: NextFunction) {
        const estagioId = Number(req.params.estagioId);
        this.service.buscarPorEstagioId(estagioId)
            .then(motivo => res.status(200).json(motivo))
            .catch(next);
    }

    atualizar(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        this.service.atualizar(id, req.body)
            .then(motivo => res.status(200).json(motivo))
            .catch(next);
    }

    deletar(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        this.service.deletar(id)
            .then(() => res.status(204).send())
            .catch(next);
    }
}
