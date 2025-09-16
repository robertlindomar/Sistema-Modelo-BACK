import { Router, Request, Response, NextFunction } from "express";
import { SeguradoraController } from "./controllers/SeguradoraController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";
import { createValidationMiddleware, validateIdParam } from "../../shared/middlewares/validationMiddleware";
import { 
    validateCreateSeguradora, 
    validateUpdateSeguradora 
} from "./validations/seguradoraValidations";

export function seguradoraRoutes() {
    const router = Router();
    const seguradoraController = new SeguradoraController();

    router.get("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => seguradoraController.listar(req, res, next));
    
    router.get("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => seguradoraController.buscarPorId(req, res, next)
    );
    
    router.post("/", 
        autenticarJWT, 
        createValidationMiddleware([validateCreateSeguradora]), 
        (req: Request, res: Response, next: NextFunction) => seguradoraController.criar(req, res, next)
    );
    
    router.put("/:id", 
        autenticarJWT, 
        validateIdParam,
        createValidationMiddleware([validateUpdateSeguradora]), 
        (req: Request, res: Response, next: NextFunction) => seguradoraController.atualizar(req, res, next)
    );
    
    router.delete("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => seguradoraController.deletar(req, res, next)
    );

    return router;
}
