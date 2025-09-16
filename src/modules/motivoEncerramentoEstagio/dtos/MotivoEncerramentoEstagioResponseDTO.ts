export interface MotivoEncerramentoEstagioResponseDTO {
    id: number;
    estagioId: number;
    motivoPrincipal: string;
    motivoPrincipalOutros?: string;
    motivosEmpresa?: string;
    motivosEmpresaOutros?: string;
    dataRegistro: string;
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
}
