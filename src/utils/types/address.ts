export type AddressResponse = {
  enderecos: {
    id: number
    cep: string
    rua: string
    numero: string
    cidade: string
    bairro: string
    createdAt: string
  },
  tipoEndereco: string
}

export type CreateAddress = {
  cep: string
  rua: string
  cidade: string
  numero: string
  bairro: string
  idUsuario: number
  tipoEndereco?: string
  usuarioId: number
}

export type UpdateAddress = {
  cep: string
  rua: string
  cidade: string
  numero: string
  bairro: string
  idUsuario: number
  tipoEndereco?: string
  usuarioId: number
}
