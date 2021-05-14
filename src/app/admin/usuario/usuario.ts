export interface Usuario{
    id?: number
    nome?: string
    sobrenome?: string
    email?: string    
    dtNascimento?: Date
    cidade?: string
    estado?: string
    descricao?: string
    imagemPerfil?: string
    perfis?: string[]
}

export interface ListUsuario{
    content: Usuario[];    
    last: boolean;
    totalElements: number;    
    totalPages: number;
    number: number;
    size: number;    
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}