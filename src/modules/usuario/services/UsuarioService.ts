import { UsuarioRequestDTO } from "../dtos/UsuarioRequestDTO";
import { UsuarioUpdateDTO } from "../dtos/UsuarioUpdateDTO";
import { UsuarioResponseDTO } from "../dtos/UsuarioResponseDTO";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { criptografarSenha, verificarSenha } from "../../../shared/utils/hash";
import { TrocarSenhaDTO } from "../dtos/TrocarSenhaDTO";
import { LoginDTO } from "../dtos/LoginDTO";
import { gerarToken } from "../../../shared/utils/gerarToken";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../../../shared/utils/email";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";
import { calculatePaginationMetadata } from "../../../shared/utils/pagination";

export class UsuarioService {
    private repository = new UsuarioRepository();

    async criar(data: UsuarioRequestDTO): Promise<UsuarioResponseDTO> {
        data.senha = await criptografarSenha(data.senha);
        const usuario = await this.repository.criar(data);
        return usuario.toResponse();
    }

    async listar(pagination?: PaginationQuery): Promise<PaginationResponse<UsuarioResponseDTO>> {
        const { usuarios, total } = await this.repository.listar(pagination);
        const usuariosResponse = usuarios.map(u => u.toResponse());
        
        const paginationMetadata = calculatePaginationMetadata(
            total, 
            pagination?.page || 1, 
            pagination?.limit || 10
        );

        return {
            data: usuariosResponse,
            pagination: paginationMetadata
        };
    }

    async buscarPorId(id: number): Promise<UsuarioResponseDTO> {
        const usuario = await this.repository.buscarPorId(id);
        if (!usuario) throw new AppError("Usuário não encontrado", 404);
        return usuario.toResponse();
    }

    async buscarPorEmail(email: string): Promise<UsuarioResponseDTO> {
        const usuario = await this.repository.buscarPorEmail(email);
        if (!usuario) throw new AppError("Usuário não encontrado", 404);
        return usuario.toResponse();
    }

    async atualizar(id: number, data: UsuarioUpdateDTO): Promise<UsuarioResponseDTO> {
        const usuarioExistente = await this.repository.buscarPorId(id);
        if (!usuarioExistente) throw new AppError("Usuário não encontrado", 404);
        
        // Se a senha foi fornecida, criptografar
        if (data.senha) {
            data.senha = await criptografarSenha(data.senha);
        }
        
        const updated = await this.repository.atualizar(id, data);
        return updated.toResponse();
    }

    async deletar(id: number): Promise<UsuarioResponseDTO> {
        const usuario = await this.repository.deletar(id);
        return usuario.toResponse();
    }

    async trocarSenha(id: number, dados: TrocarSenhaDTO): Promise<void> {
        const usuarioCompleto = await this.repository.buscarUsuarioCompletoPorId(id);
        if (!usuarioCompleto) throw new AppError("Usuário não encontrado", 404);

        const senhaCorreta = await verificarSenha(dados.senhaAtual, usuarioCompleto.senha);
        if (!senhaCorreta) throw new AppError("Senha atual incorreta", 400);

        const novaSenhaCriptografada = await criptografarSenha(dados.novaSenha);
        await this.repository.atualizarSenha(id, novaSenhaCriptografada);
    }

    async login(data: LoginDTO): Promise<{ token: string; user: UsuarioResponseDTO }> {
        const usuario = await this.repository.buscarPorEmail(data.email);
        if (!usuario) throw new AppError("Usuário não encontrado", 404);

        const usuarioCompleto = await this.repository.buscarUsuarioCompletoPorId(usuario.id);
        const senhaCorreta = await verificarSenha(data.senha, usuarioCompleto.senha);
        if (!senhaCorreta) throw new AppError("Senha incorreta", 400);

        const token = gerarToken(usuarioCompleto);
        return { token, user: usuarioCompleto.toResponse() };
    }

    async solicitarRecuperacaoSenha(email: string): Promise<void> {
        // Não revelar se email existe ou não
        try {
            const usuario = await this.repository.buscarPorEmail(email);
            const token = crypto.randomBytes(32).toString("hex");
            const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
            await this.repository.setResetToken(usuario.email, token, expires);

            const baseUrl = process.env.URL_APP || "http://localhost:5173";
            const resetLink = `${baseUrl}/reset-password?token=${token}`;
            await sendPasswordResetEmail(usuario.email, resetLink);
        } catch (e) {
            // swallow to avoid user enumeration
        }
    }

    async redefinirSenha(token: string, novaSenha: string): Promise<void> {
        const usuario = await this.repository.buscarPorResetToken(token);
        if (!usuario) throw new AppError("Token inválido ou expirado", 400);
        const senhaCripto = await criptografarSenha(novaSenha);
        await this.repository.atualizarSenha(usuario.id, senhaCripto);
        await this.repository.limparResetToken(usuario.id);
    }
}
