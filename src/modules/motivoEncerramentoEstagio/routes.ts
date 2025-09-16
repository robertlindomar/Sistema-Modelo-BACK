import { Router, Request, Response, NextFunction } from "express";
import { MotivoEncerramentoEstagioController } from "./controllers/MotivoEncerramentoEstagioController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";

export function motivoEncerramentoEstagioRoutes() {
    const router = Router();
    const controller = new MotivoEncerramentoEstagioController();

    router.get("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => controller.listar(req, res, next));
    router.get("/:id", autenticarJWT, (req: Request, res: Response, next: NextFunction) => controller.buscarPorId(req, res, next));
    router.get("/estagio/:estagioId", autenticarJWT, (req: Request, res: Response, next: NextFunction) => controller.buscarPorEstagioId(req, res, next));
    router.post("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => controller.criar(req, res, next));
    router.put("/:id", autenticarJWT, (req: Request, res: Response, next: NextFunction) => controller.atualizar(req, res, next));
    router.delete("/:id", autenticarJWT, (req: Request, res: Response, next: NextFunction) => controller.deletar(req, res, next));

    return router;
}
