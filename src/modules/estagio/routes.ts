import { Router, Request, Response, NextFunction } from "express";
import { EstagioController } from "./controllers/EstagioController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";
import { createValidationMiddleware, validateIdParam } from "../../shared/middlewares/validationMiddleware";
import { 
    validateCreateEstagio, 
    validateUpdateEstagio,
    validateStatusQuery 
} from "./validations/estagioValidations";

export function estagioRoutes() {
    const router = Router();
    const estagioController = new EstagioController();

    router.get("/", 
        autenticarJWT, 
        (req: Request, res: Response, next: NextFunction) => {
            // Se houver query parameter status, usa o método específico
            if (req.query.status) {
                return estagioController.listarPorStatus(req, res, next);
            }
            // Caso contrário, usa o método padrão de listar todos
            return estagioController.listar(req, res, next);
        }
    );
    
    router.get("/status", 
        autenticarJWT, 
        createValidationMiddleware([validateStatusQuery]), 
        (req: Request, res: Response, next: NextFunction) => estagioController.listarPorStatus(req, res, next)
    );
    
    router.get("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => estagioController.buscarPorId(req, res, next)
    );
    
    router.post("/", 
        autenticarJWT, 
        createValidationMiddleware([validateCreateEstagio]), 
        (req: Request, res: Response, next: NextFunction) => estagioController.criar(req, res, next)
    );
    
    router.put("/:id", 
        autenticarJWT, 
        validateIdParam,
        createValidationMiddleware([validateUpdateEstagio]), 
        (req: Request, res: Response, next: NextFunction) => estagioController.atualizar(req, res, next)
    );
    
    router.delete("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => estagioController.deletar(req, res, next)
    );

    return router;
}