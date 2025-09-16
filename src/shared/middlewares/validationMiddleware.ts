import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

/**
 * Middleware de validação genérico
 * Executa funções de validação e retorna erros em português
 */
export function createValidationMiddleware(validators: Array<(data: any) => string[]>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];
    
    // Executa todas as funções de validação
    validators.forEach(validator => {
      const validatorErrors = validator(req.body || req.params || req.query);
      errors.push(...validatorErrors);
    });
    
    // Se houver erros, retorna 400 com array de erros
    if (errors.length > 0) {
      throw new AppError(errors.join("; "), 400);
    }
    
    next();
  };
}

/**
 * Middleware para validação de ID nos parâmetros
 */
export function validateIdParam(req: Request, res: Response, next: NextFunction): void {
  const { validateUserId } = require("../utils/validations");
  const errors = validateUserId(req.params);
  
  if (errors.length > 0) {
    throw new AppError(errors.join("; "), 400);
  }
  
  next();
}

/**
 * Middleware para validação de paginação
 */
export function validatePagination(req: Request, res: Response, next: NextFunction): void {
  const { validatePaginationQuery } = require("../utils/validations");
  const errors = validatePaginationQuery(req.query);
  
  if (errors.length > 0) {
    throw new AppError(errors.join("; "), 400);
  }
  
  next();
}
