import { designTokens } from 'design-tokens'
import { useAuth } from '../AuthProvider/AuthProvider'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function UserIcon() {
    const [isHovered, setIsHovered] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate()

    const defaultStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: designTokens.spacing.small,
        padding: designTokens.spacing.small,
        borderRadius: designTokens.borderRadius.medium,
        backgroundColor: designTokens.color.background,
        color: '#333',
        fontSize: designTokens.font.size.smallMedium,
        fontWeight: designTokens.font.weight.medium,
        cursor: 'pointer'
    } as React.CSSProperties

    const hoverStyle = {
        boxShadow: `0px 8px 22px 0px ${designTokens.color.boxShadow}`,
    } as React.CSSProperties



    return (
        <div style={isHovered ? { ...defaultStyle, ...hoverStyle } : defaultStyle}
            
            onClick={() => {
                console.log('Clicou no usuário!')
                navigate('/profile')
            }}
        >
            <span>{user?.name}</span>
            <img src={user?.picture} alt='User' style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%'
            }} />
        </div>
    )
}   