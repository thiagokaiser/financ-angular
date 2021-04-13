export interface Categoria{
    id: number;
    descricao: string;
    cor: string;    
}

export interface ListCategoria{
    content: Categoria[];    
    last: boolean;
    totalElements: number;    
    totalPages: number;
    number: number;
    size: number;    
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}