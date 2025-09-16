import { CidadeResponseDTO } from "../../cidade/dtos/CidadeResponseDTO";
import { CursoResponseDTO } from "../../curso/dtos/CursoResponseDTO";

export interface AlunoComCidadeCursoResponseDTO {
    id: number;
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
    cidade: CidadeResponseDTO;
    curso: CursoResponseDTO;
} 