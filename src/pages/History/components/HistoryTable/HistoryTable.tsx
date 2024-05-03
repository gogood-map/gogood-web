import { designTokens } from 'design-tokens'
import { HistoryTableItem, HistoryTableItemProps } from '../HistoryTableItem/HistoryTableItem'
import styled from 'styled-components'

export type HistoryTableProps = {
  items: HistoryTableItemProps[]
}

export function HistoryTable(props: HistoryTableProps) {
  const { items } = props

  const ScrolableDiv = styled.div`
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: ${designTokens.borderRadius.medium};  // Adicione o border-radius aqui
    }

    &::-webkit-scrollbar-thumb {
      background: ${designTokens.color.selected};
      border-radius: ${designTokens.borderRadius.medium};  // Adicione o border-radius aqui
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
      padding: `0 0 0 ${designTokens.spacing.medium}`,
      borderRadius: designTokens.borderRadius.medium,
      backgroundColor: designTokens.color.ligthGray,
      height: `calc(100% - (${designTokens.spacing.medium} * 2))`,
    }}>
      <ScrolableDiv>

        {items.map((item, index) => (
          <HistoryTableItem key={index} {...item} />
        ))}
      </ScrolableDiv>
    </div>
  )
}
