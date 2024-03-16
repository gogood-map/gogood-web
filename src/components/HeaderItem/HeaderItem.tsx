import { designTokens } from 'design-tokens'
// import { useLocation } from 'react-router-dom'

export type HeaderItemProps = {
    label: string
    path: string
    onClick?: () => void
}

export function HeaderItem({ label, path, onClick }: HeaderItemProps) {
    const url = window.location.pathname

    const styleItem = url === path ? {
        textDecoration: 'underline',
        color: designTokens.color.selected,
        fontWeight: designTokens.fontWeight.bold
    } : {
        textDecoration: 'none',
        color: designTokens.color.text,
        fontWeight: designTokens.fontWeight.regular,
    }

    return (
        <li onClick={onClick}
            style={{
                listStyleType: 'none',
                cursor: 'pointer',
                userSelect: 'none',
            }}>
            <p style={{
                margin: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                ...styleItem
            }}>
                {label}
            </p>
        </li>
    )
}