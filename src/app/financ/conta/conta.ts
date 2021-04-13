export interface Conta{
    id: number;
    descricao: string;    
}

export interface ListConta{
    content: Conta[];    
    last: boolean;
    totalElements: number;    
    totalPages: number;
    number: number;
    size: number;    
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}