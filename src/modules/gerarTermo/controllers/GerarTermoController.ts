import { Request, Response } from 'express';
import { buscarDadosEstagioCompleto, gerarTermoComTemplate } from '../gerarTermo';

export class GerarTermoController {
    /**
     * Gera termo de estágio usando template Word
     */
    static async gerarTermoTemplate(req: Request, res: Response): Promise<void> {
        try {
            const { estagioId } = req.params;
            const { outputPath } = req.body;

            if (!estagioId || isNaN(Number(estagioId))) {
                res.status(400).json({
                    success: false,
                    message: 'ID do estágio é obrigatório e deve ser um número válido'
                });
                return;
            }

            const sucesso = await gerarTermoComTemplate(Number(estagioId), outputPath);
            
            if (sucesso) {
                res.json({
                    success: true,
                    message: 'Termo gerado com template com sucesso',
                    estagioId: Number(estagioId)
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao gerar termo com template'
                });
            }
        } catch (error) {
            console.error('Erro no controller gerarTermoTemplate:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    /**
     * Busca dados completos do estágio para preview
     */
    static async buscarDadosEstagio(req: Request, res: Response): Promise<void> {
        try {
            const { estagioId } = req.params;

            if (!estagioId || isNaN(Number(estagioId))) {
                res.status(400).json({
                    success: false,
                    message: 'ID do estágio é obrigatório e deve ser um número válido'
                });
                return;
            }

            const dados = await buscarDadosEstagioCompleto(Number(estagioId));
            
            if (dados) {
                res.json({
                    success: true,
                    message: 'Dados do estágio encontrados',
                    data: dados
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Estágio não encontrado'
                });
            }
        } catch (error) {
            console.error('Erro no controller buscarDadosEstagio:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    /**
     * Gera e retorna como download
     */
    static async downloadTermo(req: Request, res: Response): Promise<void> {
        try {
            const { estagioId } = req.params;

            if (!estagioId || isNaN(Number(estagioId))) {
                res.status(400).json({
                    success: false,
                    message: 'ID do estágio é obrigatório e deve ser um número válido'
                });
                return;
            }

            const nomeArquivo = `termo_estagio_template_${estagioId}.docx`;
            
            const sucesso = await gerarTermoComTemplate(Number(estagioId), nomeArquivo);
            
            if (sucesso) {
                const fs = require('fs');
                const path = require('path');
                
                const filePath = path.resolve(nomeArquivo);
                
                if (fs.existsSync(filePath)) {
                    res.download(filePath, nomeArquivo, (err) => {
                        if (err) {
                            console.error('Erro ao fazer download:', err);
                            res.status(500).json({
                                success: false,
                                message: 'Erro ao fazer download do arquivo'
                            });
                        } else {
                            // Deletar o arquivo após o download
                            fs.unlink(filePath, (unlinkErr: any) => {
                                if (unlinkErr) {
                                    console.error('Erro ao deletar arquivo temporário:', unlinkErr);
                                }
                            });
                        }
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'Arquivo não encontrado'
                    });
                }
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao gerar termo'
                });
            }
        } catch (error) {
            console.error('Erro no controller downloadTermo:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }
}