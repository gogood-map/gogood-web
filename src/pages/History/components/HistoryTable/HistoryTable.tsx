import { designTokens } from 'design-tokens'
import { HistoryTableItem, HistoryTableItemProps } from '../HistoryTableItem/HistoryTableItem'
import styled from 'styled-components'
import { RoutesResponse } from '../../../Map/components/RoutesSelection/RoutesSelection'

export type HistoryTableProps = {
  items: HistoryTableItemProps[]
  onClick?: (route: RoutesResponse) => void
}

export function HistoryTable(props: HistoryTableProps) {
  const { items, onClick } = props

  const ScrolableDiv = styled.div`
    overflow-y: auto;
    width: 100%;
    padding-top: ${designTokens.spacing.small};
    padding-bottom: ${designTokens.spacing.small};

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${designTokens.color.gray};
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
      margin: designTokens.spacing.medium,
      padding: `${designTokens.spacing.medium}`,
      borderRadius: designTokens.borderRadius.medium,
      backgroundColor: designTokens.color.white,
      boxShadow: `0 4px 14px 2px ${designTokens.color.boxShadow}`,
      height: `calc(100% - (${designTokens.spacing.medium} * 4))`,
    }}>
      <ScrolableDiv>
        {items.map((item, index) => (
          <HistoryTableItem
            key={index}
            date={item.date}
            origin={item.origin}
            destination={item.destination}
            onClick={() => onClick && onClick(item as unknown as RoutesResponse)}
          />
        ))}
      </ScrolableDiv>
    </div>
  )
}
