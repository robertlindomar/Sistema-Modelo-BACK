import { MotivoEncerramentoEstagioRequestDTO } from "../dtos/MotivoEncerramentoEstagioRequestDTO";
import { MotivoEncerramentoEstagioResponseDTO } from "../dtos/MotivoEncerramentoEstagioResponseDTO";

export class MotivoEncerramentoEstagioModel {
    id?: number;
    estagioId: number;
    motivoPrincipal: string;
    motivoPrincipalOutros?: string;
    motivosEmpresa?: string;
    motivosEmpresaOutros?: string;
    dataRegistro?: string;
    
    // Dados do estágio
    estagio?: {
        id: number;
        status: string;
        dataCancelamento?: string;
        aluno?: {
            id: number;
            nome: string;
        };
        empresa?: {
            id: number;
            nome: string;
        };
        instituicao?: {
            id: number;
            nome: string;
        };
    };

    constructor(
        estagioId: number,
        motivoPrincipal: string,
        motivoPrincipalOutros?: string,
        motivosEmpresa?: string,
        motivosEmpresaOutros?: string,
        id?: number,
        dataRegistro?: string
    ) {
        this.id = id;
        this.estagioId = estagioId;
        this.motivoPrincipal = motivoPrincipal;
        this.motivoPrincipalOutros = motivoPrincipalOutros;
        this.motivosEmpresa = motivosEmpresa;
        this.motivosEmpresaOutros = motivosEmpresaOutros;
        this.dataRegistro = dataRegistro;
    }

    static fromRequest(dto: MotivoEncerramentoEstagioRequestDTO): MotivoEncerramentoEstagioModel {
        return new MotivoEncerramentoEstagioModel(
            dto.estagioId,
            dto.motivoPrincipal,
            dto.motivoPrincipalOutros,
            dto.motivosEmpresa,
            dto.motivosEmpresaOutros
        );
    }

    static fromPrisma(data: any): MotivoEncerramentoEstagioModel {
        const modelo = new MotivoEncerramentoEstagioModel(
            data.estagioId,
            data.motivoPrincipal,
            data.motivoPrincipalOutros,
            data.motivosEmpresa,
            data.motivosEmpresaOutros,
            data.id,
            data.dataRegistro ? data.dataRegistro.toISOString() : undefined
        );
        
        // Incluir dados do estágio se disponíveis
        if (data.estagio) {
            console.log("🔍 Backend - Status do estágio:", data.estagio.status);
            console.log("🔍 Backend - Tipo do status:", typeof data.estagio.status);
            console.log("🔍 Backend - Status como string:", String(data.estagio.status));
            
            // Normalizar o status para garantir que seja string
            let statusNormalizado = "Concluido";
            if (data.estagio.status) {
                const statusStr = String(data.estagio.status);
                if (statusStr === "Concluido" || statusStr === "Concluído") {
                    statusNormalizado = "Concluido";
                } else if (statusStr === "Cancelado") {
                    statusNormalizado = "Cancelado";
                } else if (statusStr === "Ativo") {
                    statusNormalizado = "Ativo";
                }
            }
            
            console.log("🔍 Backend - Status normalizado:", statusNormalizado);
            
            modelo.estagio = {
                id: data.estagio.id,
                status: statusNormalizado,
                dataCancelamento: data.estagio.dataCancelamento ? data.estagio.dataCancelamento.toISOString() : undefined,
                aluno: data.estagio.aluno ? {
                    id: data.estagio.aluno.id,
                    nome: data.estagio.aluno.nome
                } : undefined,
                empresa: data.estagio.empresa ? {
                    id: data.estagio.empresa.id,
                    nome: data.estagio.empresa.nome
                } : undefined,
                instituicao: data.estagio.instituicao ? {
                    id: data.estagio.instituicao.id,
                    nome: data.estagio.instituicao.nome
                } : undefined
            };
        }
        
        return modelo;
    }

    toResponse(): MotivoEncerramentoEstagioResponseDTO {
        return {
            id: this.id!,
            estagioId: this.estagioId,
            motivoPrincipal: this.motivoPrincipal,
            motivoPrincipalOutros: this.motivoPrincipalOutros,
            motivosEmpresa: this.motivosEmpresa,
            motivosEmpresaOutros: this.motivosEmpresaOutros,
            dataRegistro: this.dataRegistro || new Date().toISOString(),
            estagio: this.estagio
        };
    }
}
