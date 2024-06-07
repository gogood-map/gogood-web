import { designTokens } from 'design-tokens'
import { DashboardLine } from '../DashboardLine/DashboardLine'

export type DashboardCardProps = {
  title: string
  data: number[]
  labels: string[]
  height: string
  type: 'line' | 'bar' | 'pie'
}

export function DashboardCard(props: DashboardCardProps) {
  const { title, data, labels, height, type } = props

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: designTokens.spacing.medium,
      borderRadius: designTokens.borderRadius.medium,
      boxShadow: `0 4px 4px ${designTokens.color.boxShadow}`,
      backgroundColor: designTokens.color.background,
      gap: designTokens.spacing.medium,
      width: '100%',
      zIndex: 2,
    }}>
      <h2 style={{
        color: designTokens.color.text,
        margin: 0,
      }}>{title}</h2>
      <div style={{
        height: height,
      }}>
        {type === 'line' && (
          <DashboardLine data={data} labels={labels} />
        )}
      </div>
    </div>
  )
}
