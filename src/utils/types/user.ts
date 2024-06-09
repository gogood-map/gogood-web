export type CreateUser = {
  nome: string
  email: string
  senha?: string
  genero?: string
  dt_Nascimento?: string
}

export type CreateGoogleUser = {
  nome: string
  email: string
  google_id: string
}

export type UpdateUser = {
  nome: string
  email: string
  genero: string
  dt_Nascimento: string
}

export type UserResponse = {
  userId: number
  nome: string
  email: string
  token?: string
  genero?: string
  dt_nascimento: string
}
