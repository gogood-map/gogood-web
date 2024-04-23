import { designTokens } from 'design-tokens'

export type AuthCardProps = {
    children: React.ReactNode
}

export function AuthCard(props: AuthCardProps) {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '350px',
            height: 'auto',
            maxHeight: '650px',
            gap: designTokens.spacing.mediumLarge,
            padding: designTokens.spacing.large,
            borderRadius: designTokens.borderRadius.medium,
            boxShadow: `0px 4px 13.9px 0px ${designTokens.color.boxShadow}`,
            backgroundColor: designTokens.color.white,
        }}>
            {props.children}
        </div>
    )
}