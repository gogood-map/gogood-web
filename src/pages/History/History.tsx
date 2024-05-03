import { designTokens } from 'design-tokens'
import { MapComponent } from '../../components/MapComponent/MapComponent'
import { HistoryTable } from './components/HistoryTable/HistoryTable'
import { HistoryNav } from './components/HitoryNav/HistoryNav'

export function History() {
  const items = [
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      onClick: () => console.log('clicked'),
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      onClick: () => console.log('clicked'),
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      onClick: () => console.log('clicked'),
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      onClick: () => console.log('clicked'),
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      onClick: () => console.log('clicked'),
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      onClick: () => console.log('clicked'),
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      onClick: () => console.log('clicked'),
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      onClick: () => console.log('clicked'),
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      onClick: () => console.log('clicked'),
    },
    {
      date: 'Quinta-feira, 25 Jan, 2024',
      origin: 'Rua A, 123',
      destination: 'Rua B, 456',
      onClick: () => console.log('clicked'),
    },
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      width: '100%',
      position: 'relative',
    }}>
      <HistoryNav />
      <div style={{
        display: 'flex',
        marginLeft: '60px',
        flex: 1,
        position: 'relative',
      }}>
        <div style={{
          width: '35%',
          height: `calc(100vh - 41px - (${designTokens.spacing.medium}) * 2)`,
        }}>
          <HistoryTable items={items} />
        </div>
        <div style={{
          margin: '20px',
          width: '65%',
          height: 'calc(100% - 40px)',
          borderRadius: designTokens.borderRadius.medium,
          boxShadow: ` 0px 4px 4px 2px ${designTokens.color.boxShadow}`,
          overflow: 'hidden',
        }}>
          <MapComponent />
        </div>
      </div>
    </div>
  )
}
