export interface User{
    id?: string
    nome?: string
    sobrenome?: string
    email?: string
    senha?: string
    accessToken: string
    dtNascimento?: Date
    cidade?: string
    estado?: string
    descricao?: string
    imagemPerfil?: string
    perfis?: string[]
}

export interface ChangePasswordViewModel{
    email: string
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}