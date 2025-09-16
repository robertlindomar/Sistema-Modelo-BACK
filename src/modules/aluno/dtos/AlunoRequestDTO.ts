export interface AlunoRequestDTO {
    nome: string;
    rg?: string;
    cpf?: string;
    endereco?: string;
    cidadeId: number;
    cursoId: number;
    serie?: string;
    telefone?: string;
    telefonePai?: string;
    email?: string;
    dataNascimento?: Date;
}
