export type HistoryResponse = {
  id: number
  date: string
  origin: string
  destination: string
  locomotion: 'bike' | 'automovel' | 'a-pe' | 'transporte-publico'
}

export type CreateHistory = {
  origin: string
  destination: string
  locomotion: 'bike' | 'automovel' | 'a-pe' | 'transporte-publico'
}


