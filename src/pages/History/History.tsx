import { designTokens } from 'design-tokens'
import { MapComponent } from '../../components/MapComponent/MapComponent'
import { HistoryTable } from './components/HistoryTable/HistoryTable'
import { useEffect, useState } from 'react'
import { RoutesResponse } from '../Map/components/RoutesSelection/RoutesSelection'
import { HistoryTableItemProps } from './components/HistoryTableItem/HistoryTableItem'
import { RouteRequest } from '../../utils/types/route'
import { getRoute } from '../../utils/requests/route'
import { getHistoryByUser } from '../../utils/requests/history'
import { useAuth } from '../../hooks/AuthProvider/AuthProvider'
import { toast } from 'react-toastify'

export function History() {
  const [route, setRoute] = useState<RoutesResponse[]>()
  const [historyItems, setHistoryItems] = useState<HistoryTableItemProps[]>([])
  const { user } = useAuth()

  useEffect(() => {
    console.log("a")
    if (!user) return
    console.log(user)
    getHistoryByUser(user?.id)
      .then((response) => {
        console.log(response.data)
        setHistoryItems(response.data.map((item) => ({
          date: item.created_at,
          origin: item.origem,
          destination: item.destino,
          locomotion: item.meio_locomocao as 'bike' | 'veiculo' | 'a-pe' | 'transporte-publico',
        })))
      }).catch((error) => {
        console.error(error)
        toast.error('Erro ao carregar histórico')
      })
  }, [])

  const handleSelectRoute = (route: RouteRequest) => {
    const notification = toast.loading('Carregando rota...', { autoClose: false })
    getRoute(route.origem, route.destino, route.tipoTransporte)
      .then((response) => {
        setRoute(response.data)
        toast.update(notification, {
          render: 'Rota carregada com sucesso',
          type: 'success',
          autoClose: 2000,
        })
      }).catch((error) => {
        console.error(error)
        toast.update(notification, {
          render: 'Erro ao carregar rota',
          type: 'error',
          autoClose: 2000,
        })
      }).finally(() => {
        setTimeout(() => {
          toast.dismiss(notification)
        }, 3000)
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
        {historyItems && <HistoryTable items={historyItems} onClick={handleSelectRoute} />}
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
