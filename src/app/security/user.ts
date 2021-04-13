export interface User{
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    accessToken: string
    dtNascimento?: Date
    cidade?: string
    estado?: string
    descricao?: string
}

export interface ChangePasswordViewModel{
    email: string
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}