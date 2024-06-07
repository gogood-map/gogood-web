export type AddressResponse = {
  id?: number
  cep: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  tipoEndereco?: string
}

export type CreateAddress = {
  cep: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  tipoEndereco?: string
}

export type UpdateAddress = {
  cep?: string
  rua?: string
  numero?: string
  bairro?: string
  cidade?: string
  tipoEndereco?: string
}
