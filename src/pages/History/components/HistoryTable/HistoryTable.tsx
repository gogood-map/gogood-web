import { designTokens } from 'design-tokens'
import { HistoryTableItem, HistoryTableItemProps } from '../HistoryTableItem/HistoryTableItem'
import styled from 'styled-components'
import { queue } from '../../../../utils/data-structure/Queue/Queue'
import { useEffect, useState } from 'react'
import { RouteRequest } from '../../../../utils/types/route'
import { Button } from '../../../../components/Button/Button'
import { deleteHistoryByUser } from '../../../../utils/requests/history'
import { useAuth } from '../../../../hooks/AuthProvider/AuthProvider'
import { toast } from 'react-toastify'

export type HistoryTableProps = {
  items: HistoryTableItemProps[]
  onClick: (route: RouteRequest) => void
}

export function HistoryTable(props: HistoryTableProps) {
  const { items, onClick } = props
  const { user } = useAuth()
  const historyQueue = queue<HistoryTableItemProps>()
  const [renderItems, setRenderItems] = useState<HistoryTableItemProps[]>([])

  useEffect(() => {
    items.forEach(item => historyQueue.enqueue(item))
    setRenderItems(historyQueue.getQueue())
  }, [])

  const handleDeleteHistory = () => {
    const deleteNotification = toast.loading('Apagando histórico...', { autoClose: false })
    if (user) {
      deleteHistoryByUser(user.id).then(() => {
        toast.update(deleteNotification, {
          render: 'Histórico apagado com sucesso!',
          type: 'success',
          autoClose: 2000,
        })
        historyQueue.clear()
        setRenderItems([])
      }).catch((err) => {
        console.error(err)
        toast.update(deleteNotification, {
          render: 'Erro ao apagar histórico',
          type: 'error',
          autoClose: 2000,
        })
      }).finally(() => {
        toast.dismiss(deleteNotification)
      })
    }
  }

  const ScrolableDiv = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: ${designTokens.spacing.medium};
    gap: ${designTokens.spacing.tiny};

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${designTokens.color.ligthGray};
      border-radius: ${designTokens.borderRadius.medium};
    }

    &::-webkit-scrollbar-thumb {
      background: ${designTokens.color.selected};
      border-radius: ${designTokens.borderRadius.medium};
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${designTokens.color.selectedHover};
    }
  `

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: designTokens.spacing.medium,
      padding: `${designTokens.spacing.medium}`,
      borderRadius: designTokens.borderRadius.medium,
      backgroundColor: designTokens.color.white,
      boxShadow: `0px 4px 13.9px 0px ${designTokens.color.boxShadow}`,
      height: `calc(100% - (${designTokens.spacing.medium} * 2))`,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{
          margin: 0,
          fontSize: designTokens.font.size.extraLarge,
          fontWeight: designTokens.font.weight.semiBold,
        }}>
          Histórico de rotas
        </h1>
        <Button label='Apagar tudo' type='text' onClick={handleDeleteHistory} />
      </div>
      <ScrolableDiv>
        {renderItems.length > 0 ? (
          renderItems.map((item, index) => (
            <HistoryTableItem
              key={index}
              date={item.date}
              origin={item.origin}
              destination={item.destination}
              onClick={() => onClick({
                origem: item.origin,
                destino: item.destination,
                tipoTransporte: item.locomotion || 'automovel'
              })}
            />
          ))
        ) : (
          <p>Não há registros de histórico</p>
        )}
      </ScrolableDiv>
    </div>
  )
}
