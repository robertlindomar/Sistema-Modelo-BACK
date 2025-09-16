// src/routes.ts
import { Router } from "express";
import { cidadeRoutes } from "./modules/cidade/routes";
import { instituicaoRoutes } from "./modules/Instituicao/routes";
import { usuarioRoutes } from "./modules/usuario/routes";
import { cursoRoutes } from "./modules/curso/routes";
import { alunoRoutes } from "./modules/aluno/routes";
import { empresaRoutes } from "./modules/empresa/routes";
import { seguradoraRoutes } from "./modules/seguradora/routes";
import { estagioRoutes } from "./modules/estagio/routes";
import { motivoEncerramentoEstagioRoutes } from "./modules/motivoEncerramentoEstagio/routes";
import { estagioHorarioRoutes } from "./modules/estagioHorario/routes";
import { relatorioEstagioRoutes } from "./modules/relatorioEstagio/routes";
import gerarTermoRoutes from "./modules/gerarTermo/routes";


export function routes() {
    const router = Router();

    // Rota login 
    router.use("/auth", usuarioRoutes());

    // Rotas do módulo usuário
    router.use("/usuario", usuarioRoutes());

    // Rotas do módulo cidade
    router.use("/cidade", cidadeRoutes());

    // rotas do módulo Istituicao
    router.use("/instituicao", instituicaoRoutes())

    // Rotas do módulo curso
    router.use("/curso", cursoRoutes());

    // Rotas do módulo aluno
    router.use("/aluno", alunoRoutes());

    // Rotas do módulo empresa
    router.use("/empresa", empresaRoutes());

    // Rotas do módulo seguradora
    router.use("/seguradora", seguradoraRoutes());

    // Rotas do Modulo estagio
    router.use("/estagio", estagioRoutes());

    // Rotas do modulo motivoEncerramentoEstagio
    router.use("/motivo-encerramento-estagio", motivoEncerramentoEstagioRoutes());

    // Rotas do módulo estagioHorario
    router.use("/estagio-horario", estagioHorarioRoutes());

    // Rotas do módulo relatorioEstagio
    router.use("/relatorio-estagio", relatorioEstagioRoutes());


    // Rotas do módulo gerar termo (com autenticação)
    router.use("/gerar-termo", gerarTermoRoutes);

    return router;
}
