export type HistoryResponse = {
  id: number
  origem: string
  destino: string
  meio_locomocao: string
  idUsuario: number
  created_at: string
}

export type CreateHistory = {
  id_usuario: number
  origem: string
  destino: string
  meio_locomocao: string
}


