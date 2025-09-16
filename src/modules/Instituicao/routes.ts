import { Router, Request, Response, NextFunction } from "express";
import { InstituicaoController } from "./controllers/InstituicaoController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";
import { createValidationMiddleware, validateIdParam } from "../../shared/middlewares/validationMiddleware";
import { 
    validateCreateInstituicao, 
    validateUpdateInstituicao 
} from "./validations/instituicaoValidations";

export function instituicaoRoutes() {
    const router = Router();
    const instituicaoController = new InstituicaoController();

    router.get("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => instituicaoController.listar(req, res, next));
    
    router.get("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => instituicaoController.buscarPorId(req, res, next)
    );
    
    router.post("/", 
        autenticarJWT, 
        createValidationMiddleware([validateCreateInstituicao]), 
        (req: Request, res: Response, next: NextFunction) => instituicaoController.criar(req, res, next)
    );
    
    router.put("/:id", 
        autenticarJWT, 
        validateIdParam,
        createValidationMiddleware([validateUpdateInstituicao]), 
        (req: Request, res: Response, next: NextFunction) => instituicaoController.atualizar(req, res, next)
    );
    
    router.delete("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => instituicaoController.deletar(req, res, next)
    );
    
    router.get("/buscar-por-cidade/:cidadeId", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => instituicaoController.buscarPorCidade(req, res, next)
    );

    return router;
}
