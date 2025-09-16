import { Router, Request, Response, NextFunction } from "express";
import { EstagioHorarioController } from "./controllers/EstagioHorarioController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";

export function estagioHorarioRoutes() {
    const router = Router();
    const estagioHorarioController = new EstagioHorarioController();

    router.get("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => 
        estagioHorarioController.listar(req, res, next));
    router.get("/:id", autenticarJWT, (req: Request, res: Response, next: NextFunction) => 
        estagioHorarioController.buscarPorId(req, res, next));
    router.get("/estagio/:estagioId", autenticarJWT, (req: Request, res: Response, next: NextFunction) => 
        estagioHorarioController.buscarPorEstagio(req, res, next));
    router.post("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => 
        estagioHorarioController.criar(req, res, next));
    router.post("/lote", autenticarJWT, (req: Request, res: Response, next: NextFunction) => 
        estagioHorarioController.criarLote(req, res, next));
    router.put("/:id", autenticarJWT, (req: Request, res: Response, next: NextFunction) => 
        estagioHorarioController.atualizar(req, res, next));
    router.delete("/:id", autenticarJWT, (req: Request, res: Response, next: NextFunction) => 
        estagioHorarioController.deletar(req, res, next));

    return router;
}
