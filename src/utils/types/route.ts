export type RouteResponse = {
  origem: string
  destino: string
  distancia: number
  duracao: string
  horarioSaida: string
  horarioChegada: string
  qtdOcorrenciasTotais: number
  polyline: string
  etapas: {
    instrucao: string
  }[]
}

export type RouteRequest = {
  origem: string
  destino: string
  tipoTransporte: string
}
