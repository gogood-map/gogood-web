import { designTokens } from 'design-tokens'
import { IoClose } from 'react-icons/io5'
import { PiCopySimple } from 'react-icons/pi'
import styled from 'styled-components'

export type RouteStepsProps = {
  visible: boolean
  steps?: {
    instruction: string
  }[]
  onShare?: () => void
  onClose?: () => void
}

export function RouteSteps(props: RouteStepsProps) {
  const { steps, visible, onShare, onClose } = props

  const ListSteps = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: ${designTokens.spacing.small};

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
      position: 'absolute',
      top: designTokens.spacing.medium,
      right: designTokens.spacing.medium,
      backgroundColor: designTokens.color.background,
      padding: visible ? designTokens.spacing.medium : `0 ${designTokens.spacing.medium}`,
      borderRadius: designTokens.borderRadius.medium,
      boxShadow: `0px 4px 13.9px 0px ${designTokens.color.boxShadow}`,
      width: '300px',
      height: visible ? 'auto' : 0,
      maxHeight: `calc(100vh - 27px - (${designTokens.spacing.medium} * 2))`,
      gap: designTokens.spacing.medium,
      transition: 'height 0.3s, padding 0.3s',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}></div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{
          margin: 0,
          fontSize: designTokens.font.size.large,
          fontWeight: designTokens.font.weight.semiBold,
        }}>
          Instruções da rota
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }} onClick={onClose}>
          <IoClose size={24} />
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }} onClick={onShare}>
          <PiCopySimple size={24} />
        </div>
      </div>
      <ListSteps>
        {steps?.map((step, index) => (
          <div key={index} style={{
            display: 'flex',
            gap: designTokens.spacing.small,
            alignItems: 'center',
          }}>
            <span style={{
              color: designTokens.color.text,
              fontSize: designTokens.font.size.medium,
            }} dangerouslySetInnerHTML={{ __html: step.instruction}}>
            </span>
          </div>
        ))}
      </ListSteps>
    </div>
  )
}
