import { designTokens } from 'design-tokens'
import { useState } from 'react'
import { FaHistory } from 'react-icons/fa'
import { IoArrowForward } from 'react-icons/io5'

export type HistoryTableItemProps = {
  date: string
  origin: string
  destination: string
  locomotion?: 'bike' | 'automovel' | 'a-pe' | 'transporte-publico'
  onClick?: () => void
}

export function HistoryTableItem(props: HistoryTableItemProps) {
  const { date, origin, destination, onClick } = props
  const [hovered, setHovered] = useState(false)

  const dateObj = new Date(date)
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  const dateStr = dateObj.toLocaleDateString('pt-BR', options)
  const formattedDate = dateStr[0].toUpperCase() + dateStr.slice(1)

  return (
    <div
      onMouseEnter={() => { setHovered(true) }}
      onMouseLeave={() => { setHovered(false) }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${designTokens.spacing.tiny} ${designTokens.spacing.small}`,
        marginRight: designTokens.spacing.medium,
        gap: designTokens.spacing.tiny,
        borderRadius: designTokens.borderRadius.medium,
        backgroundColor: hovered ? designTokens.color.ligthGray : designTokens.color.white,
        position: 'relative',
      }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <h2 style={{
          display: 'flex',
          alignItems: 'center',
          color: designTokens.color.text,
          gap: designTokens.spacing.small,
          fontSize: designTokens.font.size.mediumLarge,
          fontWeight: designTokens.font.weight.semiBold,
          margin: 0,
        }}>
          <FaHistory size={designTokens.font.size.mediumLarge} />
          {formattedDate}
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: designTokens.spacing.medium,
        }}>
          <span style={{
            color: designTokens.color.text,
            fontSize: designTokens.font.size.medium,
            fontWeight: designTokens.font.weight.medium,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '250px',
          }}>
            {origin}
          </span>
          <span style={{
            color: designTokens.color.text,
            fontSize: designTokens.font.size.medium,
            fontWeight: designTokens.font.weight.medium,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '250px',
          }}>
            {destination}
          </span>
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: designTokens.spacing.tiny,
      }}>
        <div style={{
          display: hovered ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: designTokens.color.grayScale[300],
          color: designTokens.color.text,
          padding: `${designTokens.spacing.small}`,
          marginRight: designTokens.spacing.tiny,
          borderRadius: designTokens.borderRadius.medium,
          border: 'none',
          cursor: 'pointer',
        }} onClick={onClick}>
          <IoArrowForward size={designTokens.font.size.large} />
        </div>
      </div>
    </div>
  )
}
