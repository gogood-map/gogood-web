import { designTokens } from 'design-tokens'
import { Address } from '../../../Profile/components/AddressList/AddressList'
import { useState } from 'react'

export type CarouselItemProps = {
  address: Address
  icon: React.ReactNode
  onClick: (address: Address) => void
}

export function CarouselItem(props: CarouselItemProps) {
  const { address, icon, onClick } = props
  const [isHovered, setIsHovered] = useState(false)

  const toolTipStyle = {
    position: 'absolute',
    top: `calc(100% + ${designTokens.spacing.tiny})`,
    borderRadius: designTokens.borderRadius.medium,
    padding: designTokens.spacing.small,
    marginLeft: designTokens.spacing.small,
    backgroundColor: designTokens.color.background,
    color: designTokens.color.text,
    fontSize: designTokens.font.size.medium,
    visibility: 'hidden',
    opacity: '0',
    transform: `translateY(-${designTokens.spacing.tiny})`,
    transition: 'visibility 0s, opacity 0.3s, transform 0.3s',
  } as React.CSSProperties

  const hoveredToolTipStyle = {
    visibility: 'visible',
    opacity: '1',
    transform: 'translateY(0)'
  } as React.CSSProperties

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'fit-content',
      cursor: 'pointer',
      position: 'relative',
      maxWidth: '150px',
      boxShadow: `0px 4px 4px ${designTokens.color.boxShadow}`,
      border: `1px solid ${designTokens.color.border}`,
      padding: `${designTokens.spacing.tiny} ${designTokens.spacing.small}`,
      marginBottom: designTokens.spacing.tiny,
      borderRadius: designTokens.borderRadius.large,
      backgroundColor: designTokens.color.background,
      gap: designTokens.spacing.tiny,
    }} onClick={() => onClick(address)}>
      <span style={{
        display: 'flex',
        minWidth: '16px',
      }}>
        {icon}
      </span>
      <p
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          color: designTokens.color.text,
          fontWeight: designTokens.font.weight.semiBold,
          fontSize: '12px',
          lineClamp: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          margin: 0,
        }}
      >{address.tag}</p>
      <div style={
        isHovered ?
          { ...toolTipStyle, ...hoveredToolTipStyle } :
          toolTipStyle
      }>
        {address.street}, {address.number} - {address.city}
      </div>

    </div>
  )
}
