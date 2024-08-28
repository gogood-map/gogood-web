import { designTokens } from 'design-tokens'
import { useState } from 'react'
import { CSSProperties } from 'styled-components'

export type CancelRouteSelectProps = {
  onCancelSelect: () => void
}

export function CancelRouteSelect(props: CancelRouteSelectProps) {
  const { onCancelSelect } = props
  const [hovered, setHovered] = useState(false)

  const defaultStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
    boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
    backgroundColor: designTokens.color.white,
    borderRadius: designTokens.borderRadius.smallMedium,
    transition: 'transform .3s ease',
  } as CSSProperties

  const hoveredStyle = {
    transform: 'scale(1.02)',
  } as CSSProperties

  return (
    <div
      onMouseEnter={() => { setHovered(true) }}
      onMouseLeave={() => { setHovered(false) }}
      style={hovered ? { ...defaultStyle, ...hoveredStyle } : { ...defaultStyle }}
      onClick={onCancelSelect}
    >

        <div style={{
          width: '32px',
          height: '12px',
          backgroundColor: designTokens.color.primary,
          borderRadius: designTokens.borderRadius.small,
        }} />
        <div style={{
          color: designTokens.color.text,
          fontSize: designTokens.font.size.small,
          fontWeight: designTokens.font.weight.bold,
        }}>
          Ver todas as rotas
        </div>

      <div style={{
        width: '32px',
        height: '12px',
      }}>  </div>
    </div>
  )
}
