import { designTokens } from 'design-tokens'
import { MapComponent } from '../../components/MapComponent/MapComponent'
import { HistoryTable } from './components/HistoryTable/HistoryTable'
import { useState } from 'react'
import { RoutesResponse } from '../Map/components/RoutesSelection/RoutesSelection'
import { HistoryTableItemProps } from './components/HistoryTableItem/HistoryTableItem'
import { RouteRequest } from '../../utils/types/route'
import { getRoute } from '../../utils/requests/route'

export function History() {
  const [route, setRoute] = useState<RoutesResponse[]>()

  const historyResponse = [
    {
      create_at: '2024-12-31',
      origem: 'Estação Consoleção',
      destino: 'Faculdade SPTECH',
      meio_locomocao: 'veiculo',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua A, 123',
      destino: 'Rua B, 456',
      meio_locomocao: 'veiculo',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua A, 123',
      destino: 'Rua B, 456',
      meio_locomocao: 'bike',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua A, 123',
      destino: 'Rua B, 456',
      meio_locomocao: 'bike',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua A, 123',
      destino: 'Rua B, 456',
      meio_locomocao: 'veiculo',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua A, 123',
      destino: 'Rua B, 456',
      meio_locomocao: 'a-pe',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua A, 123',
      destino: 'Rua B, 456',
      meio_locomocao: 'veiculo',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua A, 123',
      destino: 'Rua B, 456',
      meio_locomocao: 'bike',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua A, 123',
      destino: 'Rua B, 456',
      meio_locomocao: 'trasporte-publico',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua Aasdadadasdadsasdasdadasddasd, 123',
      destino: 'Rua asdadsasdadadsasdasdasdasdasB, 456',
      meio_locomocao: 'bike',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua A, 123',
      destino: 'Rua B, 456',
      meio_locomocao: 'veiculo',
    },
    {
      create_at: '2024-12-31',
      origem: 'Rua A, 123',
      destino: 'Rua B, 456',
      meio_locomocao: 'trasporte-publico',
    },
  ]

  const historyItems: HistoryTableItemProps[] = historyResponse.map((item) => ({
    date: item.create_at,
    origin: item.origem,
    destination: item.destino,
    locomotion: item.meio_locomocao as 'bike' | 'veiculo' | 'a-pe' | 'transporte-publico',
  }))


  const handleSelectRoute = (route: RouteRequest) => {
    getRoute(route.origem, route.destino, route.tipoTransporte)
      .then((response) => {
        setRoute(response.data)
      }).catch((error) => {
        console.error(error)
      })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: `calc(100vh - (${designTokens.spacing.large} * 2))`,
      width: `calc(100% - 60px - (${designTokens.spacing.large} * 2))`,
      padding: designTokens.spacing.large,
      gap: designTokens.spacing.large,
      marginLeft: '60px',
      position: 'relative',
    }}>
      <div style={{
        width: '35%',
        height: '100%',
      }}>
        <HistoryTable items={historyItems} onClick={handleSelectRoute} />
      </div>
      <div style={{
        width: '65%',
        height: '100%',
        borderRadius: designTokens.borderRadius.medium,
        boxShadow: ` 0px 4px 4px 2px ${designTokens.color.boxShadow}`,
        overflow: 'hidden',
      }}>
        <MapComponent routes={route ? route : undefined} />
      </div>
    </div>
  )
}
