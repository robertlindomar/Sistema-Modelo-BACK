export interface InstituicaoResponseDTO {
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
    cidade?: {
        id: number;
        nome: string;
        uf: string;
    };
}
