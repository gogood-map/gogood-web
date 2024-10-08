import { Ocorrencia } from "./route"

export type DetailResponse = {
    ocorrencias: Ocorrencia[]
    top5Ocorrencias: QtdCrime[]
    mesOcorrencias: MesOcorrencias, 
    qtdOcorrencias:number
}
export type MesOcorrencias = {
    agosto:number,
    janeiro:number,
    abril:number,
    julho:number,
    junho:number,
    maio:number,
    março:number,
    fevereiro:number
}
export type QtdCrime = {
    crime: string,
    qtdOcorrido: number
}