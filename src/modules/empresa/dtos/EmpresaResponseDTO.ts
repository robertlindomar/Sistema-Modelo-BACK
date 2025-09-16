export interface EmpresaResponseDTO {
    id?: number;
    nome: string;
    nomeFantasia: string;
    cnpj?: string;
    cpfAutonomo?: string;
    numClassAutonomo?: string;
    endereco?: string;
    cidadeId: number;
    telefone1?: string;
    telefone2?: string;
    email?: string;
    representante?: string;
    cargoRepresentante?: string;
}