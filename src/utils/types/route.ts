export type RouteResponse = {
  origem: string
  destino: string
  distancia: number
  ocorrencias: Ocorrencia[],
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

export type SharedRouteResponse = {
  url: string
}



export type Ocorrencia = {
  numBo: string,
  crime: string,
  tipoLocal: string,
  rua: string,
  bairro: string,
  delegacia: string,
  cidade: string,
  dataOcorrencia: string,
  dataAberturaBo: string,
  localizacao: {
      x: number,
      y: number,
      type: string,
      coordinates: number[]
  }
}