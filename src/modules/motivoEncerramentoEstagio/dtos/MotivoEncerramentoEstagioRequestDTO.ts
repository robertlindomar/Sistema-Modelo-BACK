
export interface MotivoEncerramentoEstagioRequestDTO {
    estagioId: number;
    motivoPrincipal: string;
    motivoPrincipalOutros?: string;
    motivosEmpresa?: string;
    motivosEmpresaOutros?: string;
    statusEstagio?: string; // 'Concluido' | 'Cancelado'
    dataCancelamento?: string; // Data de cancelamento (obrigatória se status for 'Cancelado')
}
