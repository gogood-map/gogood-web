import { designTokens } from 'design-tokens'

export type DashboardContainerProps = {
  children: React.ReactNode
}

export function DashboardContainer(props: DashboardContainerProps) {
  const { children } = props

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `0 ${designTokens.spacing.medium}`,
      gap: designTokens.spacing.medium,
      width: '100%',
    }}>
      {children}
    </div>
  );
}
