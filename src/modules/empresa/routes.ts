import { Router, Request, Response, NextFunction } from "express";
import { EmpresaController } from "./controllers/EmpresaController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";
import { createValidationMiddleware, validateIdParam } from "../../shared/middlewares/validationMiddleware";
import { 
    validateCreateEmpresa, 
    validateUpdateEmpresa 
} from "./validations/empresaValidations";

export function empresaRoutes() {
    const router = Router();
    const empresaController = new EmpresaController();

    router.get("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => empresaController.listar(req, res, next));
    
    router.get("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => empresaController.buscarPorId(req, res, next)
    );
    
    router.post("/", 
        autenticarJWT, 
        createValidationMiddleware([validateCreateEmpresa]), 
        (req: Request, res: Response, next: NextFunction) => empresaController.criar(req, res, next)
    );
    
    router.put("/:id", 
        autenticarJWT, 
        validateIdParam,
        createValidationMiddleware([validateUpdateEmpresa]), 
        (req: Request, res: Response, next: NextFunction) => empresaController.atualizar(req, res, next)
    );
    
    router.delete("/:id", 
        autenticarJWT, 
        validateIdParam, 
        (req: Request, res: Response, next: NextFunction) => empresaController.deletar(req, res, next)
    );

    return router;
}