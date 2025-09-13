import { Categoria } from "../categoria/categoria";
import { Conta } from "../conta/conta";

export interface Despesa{
    id: number,
    categoria: Categoria,
    categoriaId: number,
    conta: Conta,
    contaId: number,    
    descricao: string,
    valor: number,
    dtVencimento: Date,     
    pago: Boolean,
    dtPagamento: Date,
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