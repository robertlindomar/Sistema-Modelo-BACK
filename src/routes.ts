// src/routes.ts
import { Router } from "express";
import { usuarioRoutes } from "./modules/usuario/routes";

export function routes() {
    const router = Router();

    // Rota login 
    router.use("/auth", usuarioRoutes());

    // Rotas do módulo usuário
    router.use("/usuario", usuarioRoutes());

    return router;
}
