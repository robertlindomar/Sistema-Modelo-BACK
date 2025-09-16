import { CidadeResponseDTO } from "../../cidade/dtos/CidadeResponseDTO";

export interface InstituicaoComCidadeResponseDTO {
    id: number;
    nome: string;
    nomeFantasia: string;
    cnpj?: string;
    endereco?: string;
    cidadeId: number;
    telefone?: string;
    email?: string;
    nomeDiretor?: string;
    cpfDiretor?: string;
    cidade: CidadeResponseDTO;
} 