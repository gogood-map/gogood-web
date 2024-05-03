import { designTokens } from 'design-tokens'
import { FaArrowRight } from 'react-icons/fa6'

export type HistoryTableItemProps = {
  date: string
  origin: string
  destination: string
  onClick: () => void
}

export function HistoryTableItem(props: HistoryTableItemProps) {
  const { date, origin, destination, onClick } = props

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: designTokens.spacing.small,
      paddingTop: designTokens.spacing.small,
      paddingBottom: designTokens.spacing.small,
    }}>
      <h2 style={{
        fontSize: designTokens.font.size.mediumLarge,
        fontWeight: designTokens.font.weight.semiBold,
        margin: 0,
      }}>
        {date}
      </h2>
      <div onClick={() => onClick} style={{
        display: 'flex',
        gap: designTokens.spacing.small,
        alignItems: 'center',
        marginLeft: designTokens.spacing.small,
        cursor: 'pointer',
      }}>
        <span style={{
          color: designTokens.color.text,
          fontSize: designTokens.font.size.medium,
        }}>
          {origin}
        </span>
        <FaArrowRight style={{
          color: designTokens.color.text,
        }} />
        <span style={{
          color: designTokens.color.text,
          fontSize: designTokens.font.size.medium,
        }}>
          {destination}
        </span>
      </div>
    </div>
  )
}
