import { Router, Request, Response, NextFunction } from "express";
import { AlunoController } from "./controllers/AlunoController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";
import { createValidationMiddleware, validateIdParam } from "../../shared/middlewares/validationMiddleware";
import { 
    validateCreateAluno, 
    validateUpdateAluno 
} from "./validations/alunoValidations";

export function alunoRoutes() {
    const router = Router();
    const alunoController = new AlunoController();

    router.get("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => alunoController.listar(req, res, next));
    
    router.get("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => alunoController.buscarPorId(req, res, next)
    );
    
    router.post("/", 
        autenticarJWT, 
        createValidationMiddleware([validateCreateAluno]), 
        (req: Request, res: Response, next: NextFunction) => alunoController.criar(req, res, next)
    );
    
    router.put("/:id", 
        autenticarJWT, 
        validateIdParam,
        createValidationMiddleware([validateUpdateAluno]), 
        (req: Request, res: Response, next: NextFunction) => alunoController.atualizar(req, res, next)
    );
    
    router.delete("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => alunoController.deletar(req, res, next)
    );

    return router;
}
