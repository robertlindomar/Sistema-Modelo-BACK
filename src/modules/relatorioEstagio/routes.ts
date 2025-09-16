import { Router, Request, Response, NextFunction } from "express";
import { RelatorioEstagioController } from "./controllers/RelatorioEstagioController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";
import { createValidationMiddleware, validateIdParam } from "../../shared/middlewares/validationMiddleware";
import {
    validateCreateRelatorio,
    validateUpdateRelatorio,
    validatePaginationQuery,
    validateEstagioIdParam
} from "./validations/relatorioEstagioValidations";

export function relatorioEstagioRoutes() {
    const router = Router();
    const relatorioEstagioController = new RelatorioEstagioController();

    // Listar relatórios com paginação e filtros
    router.get("/",
        autenticarJWT,
        createValidationMiddleware([validatePaginationQuery]),
        (req: Request, res: Response, next: NextFunction) => {
            relatorioEstagioController.listar(req, res, next);
        }
    );

    // Buscar relatório por ID
    router.get("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => 
            relatorioEstagioController.buscarPorId(req, res, next)
    );

    // Buscar relatórios por estágio
    router.get("/estagio/:estagioId", 
        autenticarJWT, 
        createValidationMiddleware([validateEstagioIdParam]), 
        (req: Request, res: Response, next: NextFunction) => 
            relatorioEstagioController.buscarPorEstagio(req, res, next)
    );

    // Criar novo relatório
    router.post("/", 
        autenticarJWT, 
        createValidationMiddleware([validateCreateRelatorio]), 
        (req: Request, res: Response, next: NextFunction) => {
            relatorioEstagioController.criar(req, res, next);
        }
    );

    // Atualizar relatório
    router.put("/:id", 
        autenticarJWT, 
        validateIdParam,
        createValidationMiddleware([validateUpdateRelatorio]), 
        (req: Request, res: Response, next: NextFunction) => {
            relatorioEstagioController.atualizar(req, res, next);
        }
    );

    // Deletar relatório
    router.delete("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => 
            relatorioEstagioController.deletar(req, res, next)
    );

    return router;
}
