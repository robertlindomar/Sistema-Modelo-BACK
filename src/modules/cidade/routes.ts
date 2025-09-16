import { Router, Request, Response, NextFunction } from "express";
import { CidadeController } from "./controllers/CidadeController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";
import { createValidationMiddleware, validateIdParam } from "../../shared/middlewares/validationMiddleware";
import { 
    validateCreateCidade, 
    validateUpdateCidade,
    validateNomeParam,
    validateUFParam
} from "./validations/cidadeValidations";

export function cidadeRoutes() {
    const router = Router();
    const cidadeController = new CidadeController();

    router.get("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => cidadeController.listar(req, res, next));
    
    router.get("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => cidadeController.buscarPorId(req, res, next)
    );
    
    router.post("/", 
        autenticarJWT, 
        createValidationMiddleware([validateCreateCidade]), 
        (req: Request, res: Response, next: NextFunction) => cidadeController.criar(req, res, next)
    );
    
    router.put("/:id", 
        autenticarJWT, 
        validateIdParam,
        createValidationMiddleware([validateUpdateCidade]), 
        (req: Request, res: Response, next: NextFunction) => cidadeController.atualizar(req, res, next)
    );
    
    router.delete("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => cidadeController.deletar(req, res, next)
    );
    
    router.get("/buscar-por-nome/:nome", 
        autenticarJWT, 
        createValidationMiddleware([validateNomeParam]), 
        (req: Request, res: Response, next: NextFunction) => cidadeController.buscarPorNome(req, res, next)
    );
    
    router.get("/buscar-por-uf/:uf", 
        autenticarJWT, 
        createValidationMiddleware([validateUFParam]), 
        (req: Request, res: Response, next: NextFunction) => cidadeController.buscarPorUf(req, res, next)
    );

    return router;
}
