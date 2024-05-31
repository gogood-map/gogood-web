export type CreateUser = {
  nome: string;
  email: string;
  senha?: string;
  dataNascimento?: string;
  token?: string;
}

export type UserResponse = {
  id: number;
  token?: string;
  nome: string;
  email: string;
  dataNascimento: string;
  foto?: string;
}
