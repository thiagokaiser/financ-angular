export interface Despesa{
    id: number,
    categoriaId: number,
    contaId: number,    
    descricao: string,
    valor: number,
    dtVencimento: Date, 
    pago: Boolean,
    numParcelas: number, 
    parcelaAtual: number,
    idParcela: number
}

export interface ListDespesa{
    content: Despesa[];    
    last: boolean;
    totalElements: number;    
    totalPages: number;
    number: number;
    size: number;    
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}