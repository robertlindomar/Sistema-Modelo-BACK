import { Router, Request, Response, NextFunction } from "express";
import { CursoController } from "./controllers/CursoController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";
import { createValidationMiddleware, validateIdParam } from "../../shared/middlewares/validationMiddleware";
import { 
    validateCreateCurso, 
    validateUpdateCurso 
} from "./validations/cursoValidations";

export function cursoRoutes() {
    const router = Router();
    const cursoController = new CursoController();

    router.get("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => cursoController.listar(req, res, next));
    
    router.get("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => cursoController.buscarPorId(req, res, next)
    );
    
    router.post("/", 
        autenticarJWT, 
        createValidationMiddleware([validateCreateCurso]), 
        (req: Request, res: Response, next: NextFunction) => cursoController.criar(req, res, next)
    );
    
    router.put("/:id", 
        autenticarJWT, 
        validateIdParam,
        createValidationMiddleware([validateUpdateCurso]), 
        (req: Request, res: Response, next: NextFunction) => cursoController.atualizar(req, res, next)
    );
    
    router.delete("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => cursoController.deletar(req, res, next)
    );

    return router;
}
