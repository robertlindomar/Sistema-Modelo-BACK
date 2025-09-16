import { Router } from 'express';
import { GerarTermoController } from './controllers/GerarTermoController';

const router = Router();

// Rotas públicas para facilitar testes (sem autenticação)

/**
 * @route POST /gerar-termo/:estagioId/template
 * @desc Gera termo de estágio usando template Word existente
 * @access Public (para testes)
 */
router.post('/:estagioId/template', GerarTermoController.gerarTermoTemplate);

/**
 * @route GET /gerar-termo/:estagioId/dados
 * @desc Busca dados completos do estágio para preview
 * @access Public (para testes)
 */
router.get('/:estagioId/dados', GerarTermoController.buscarDadosEstagio);

/**
 * @route GET /gerar-termo/:estagioId/download
 * @desc Gera e faz download do termo de estágio usando template
 * @access Public (para testes)
 */
router.get('/:estagioId/download', GerarTermoController.downloadTermo);

export default router;
