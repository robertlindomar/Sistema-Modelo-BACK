// src/middlewares/autenticarJWT.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "minha-chave-secreta";

export function autenticarJWT(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ erro: "Token não fornecido" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ erro: "Token inválido ou expirado" });
    }
}
