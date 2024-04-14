import { designTokens } from 'design-tokens'

export type RouteOptionProps = {
    risk: string
    durationInMinutes: number
    color: string
}

export function RouteOption(props: RouteOptionProps) {
    const { risk, durationInMinutes, color } = props

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
            boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
            backgroundColor: designTokens.color.white,
            borderRadius: designTokens.borderRadius.smallMedium
        }}>
            <div style={{
                gap: designTokens.spacing.tiny,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <div style={{
                    width: '32px',
                    height: '12px',
                    backgroundColor: color,
                    borderRadius: designTokens.borderRadius.small,
                }} />
                <div style={{
                    color: designTokens.color.text,
                    fontSize: designTokens.font.size.small,
                    fontWeight: designTokens.font.weight.bold,
                }}>
                    {risk}
                </div>
            </div>

            <div style={{
                color: designTokens.color.text,
                fontSize: designTokens.font.size.small,
                fontWeight: designTokens.font.weight.bold,
            }}>
                {durationInMinutes < 60 && (
                    `${durationInMinutes} min`
                )}
                {durationInMinutes >= 60 && <>
                    {`${Math.floor(durationInMinutes / 60)}h`}
                    {durationInMinutes % 60 !== 0 && (
                        ` ${durationInMinutes % 60}min`
                    )}
                </>}
            </div>
        </div>
    )
}