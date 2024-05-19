import { designTokens } from 'design-tokens'
import { useState } from 'react'
import { BiSolidShareAlt } from 'react-icons/bi'
import { FaHistory } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa6'
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
      {/* <div style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: hovered ? 1 : 0,
        visibility: hovered ? 'visible' : 'hidden',
        backgroundColor: designTokens.color.ligthGray,
        borderRadius: designTokens.borderRadius.medium,
        transition: 'visibility 0s, opacity 0.3s, transform 0.3s',
        padding: `0 ${designTokens.spacing.small}`,
        marginTop: designTokens.spacing.tiny,
        zIndex: 1,
      }}>Mostrar no mapa</div> */}
      <div style={{
        display: 'flex',
        flexDirection: 'column'
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
          {date}
        </h2>
        <div onClick={onClick} style={{
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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: designTokens.spacing.tiny,
      }}>
        <button style={{
          display: hovered ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          backgroundColor: designTokens.color.grayScale[300],
          color: designTokens.color.text,
          padding: `${designTokens.spacing.small}`,
          borderRadius: designTokens.borderRadius.medium,
          fontSize: designTokens.font.size.medium,
          border: 'none',
          cursor: 'pointer',
        }}>
          <BiSolidShareAlt size={designTokens.font.size.large} />
        </button>
        <button style={{
          display: hovered ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          backgroundColor: designTokens.color.grayScale[300],
          color: designTokens.color.text,
          padding: `${designTokens.spacing.small}`,
          borderRadius: designTokens.borderRadius.medium,
          fontSize: designTokens.font.size.medium,
          border: 'none',
          cursor: 'pointer',
        }} onClick={onClick}>
          <IoArrowForward size={designTokens.font.size.large} />
        </button>
      </div>
    </div>
  )
}
