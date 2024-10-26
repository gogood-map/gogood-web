import { designTokens } from 'design-tokens'
import { Address } from '../../../Profile/components/AddressList/AddressList'

export type CarouselItemProps = {
  address: Address
  icon: React.ReactNode
  onClick: (address: Address) => void
}

export function CarouselItem(props: CarouselItemProps) {
  const { address, icon, onClick } = props

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
    </div>
  )
}
