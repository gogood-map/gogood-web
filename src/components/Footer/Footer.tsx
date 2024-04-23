import { designTokens } from "design-tokens";

export function Footer() {
    return (
        <footer style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            padding: designTokens.spacing.medium,
            backgroundColor: designTokens.color.secondary,
        }}>
            <div>
                <span style={{
                    color: designTokens.color.white,
                    fontSize: designTokens.font.size.smallMedium,
                }}>© 2024 Gogood. Todos os direitos reservados.</span>
            </div>
        </footer>
    )
}