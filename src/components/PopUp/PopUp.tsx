import { designTokens } from 'design-tokens'
import { IoClose } from 'react-icons/io5'

export type PopUpProps = {
  children: React.ReactNode
  onClose: () => void
}

export function PopUp(props: PopUpProps) {
  const { children, onClose } = props

  const handleChildClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }} onClick={onClose}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: designTokens.spacing.medium,
        borderRadius: designTokens.borderRadius.medium,
        minWidth: '500px',
        height: 'fit-content',
        backgroundColor: designTokens.color.white,
        gap: designTokens.spacing.medium,
        position: 'relative',
        zIndex: 2,
      }} onClick={handleChildClick} >
        <div style={{
          top: designTokens.spacing.medium,
          right: designTokens.spacing.medium,
          position: 'absolute',
          cursor: 'pointer',
          color: designTokens.color.secondary,
        }} onClick={onClose}>
          <IoClose size={30} />
        </div>
        {children}
      </div>
    </div>
  )
}
