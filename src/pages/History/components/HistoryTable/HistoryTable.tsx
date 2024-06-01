import { designTokens } from 'design-tokens'
import { HistoryTableItem, HistoryTableItemProps } from '../HistoryTableItem/HistoryTableItem'
import styled from 'styled-components'
import { RoutesResponse } from '../../../Map/components/RoutesSelection/RoutesSelection'
import { queue } from '../../../../utils/data-structure/Queue/Queue'
import { useEffect, useState } from 'react'

export type HistoryTableProps = {
  items: HistoryTableItemProps[]
  onClick?: (route: RoutesResponse) => void
}

export function HistoryTable(props: HistoryTableProps) {
  const { items, onClick } = props
  const historyQueue = queue<HistoryTableItemProps>()
  const [renderItems, setRenderItems] = useState<HistoryTableItemProps[]>([])

  useEffect(() => {
    items.slice(-10).forEach(item => historyQueue.enqueue(item))
    setRenderItems(historyQueue.getQueue())
    console.log(historyQueue.getQueue())
  }, [items])

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
      <h1 style={{
        margin: 0,
        fontSize: designTokens.font.size.extraLarge,
        fontWeight: designTokens.font.weight.semiBold,
      }}>
        Histórico de rotas
      </h1>
      <ScrolableDiv>
        {renderItems.length > 0 ? (
          renderItems.map((item, index) => (
            <HistoryTableItem
              key={index}
              date={item.date}
              origin={item.origin}
              destination={item.destination}
              onClick={() => onClick && onClick(item as unknown as RoutesResponse)}
            />
          ))
        ) : (
          <p>Não há registros de histórico</p>
        )}
      </ScrolableDiv>
    </div>
  )
}
