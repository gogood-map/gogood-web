import { designTokens } from 'design-tokens'
import { MapComponent } from '../../components/MapComponent/MapComponent'
import { HistoryTable } from './components/HistoryTable/HistoryTable'
import { useState } from 'react'
import { RoutesResponse } from '../Map/components/RoutesSelection/RoutesSelection'
import { HistoryTableItemProps } from './components/HistoryTableItem/HistoryTableItem'

export function History() {
  const [route, setRoute] = useState<RoutesResponse>()

  const historyItems = [
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'bike',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'automovel',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'bike',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'bike',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'automovel',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'a-pe',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'automovel',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'bike',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'trasporte-publico',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'bike',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'automovel',
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      locomotion: 'trasporte-publico',
    },
  ] as HistoryTableItemProps[]

  const handleSelectRoute = (route: RoutesResponse) => {
    setRoute(route)
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
        <MapComponent routes={route ? [route] : undefined} />
      </div>
    </div>
  )
}
