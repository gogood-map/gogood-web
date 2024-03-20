import { designTokens } from "design-tokens"

export type StepperProps = {
    steps: {
        title: string
    }[]
    currentStep: number
}

export function Stepper(props: StepperProps) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            width: '100%',
        }}>
            {props.steps.map((step, index) => (
                <div key={index}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: `calc(100% / ${props.steps.length})`,
                    }}>
                    <span style={{
                        textAlign: 'center',
                        fontSize: designTokens.font.size.small,
                        color: index === props.currentStep
                            ? designTokens.color.secondary
                            : 'transparent',
                        userSelect: 'none',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>{step.title}</span>
                    <div style={{
                        height: '6px',
                        borderRadius: designTokens.borderRadius.medium,
                        background: index > props.currentStep
                            ? designTokens.color.background
                            : index === props.currentStep
                                ? 'linear-gradient(90deg, #12FFBB 0%, #06986E 100%)'
                                : designTokens.color.primary,
                    }} />
                </div>
            ))}
        </div>
    )

}