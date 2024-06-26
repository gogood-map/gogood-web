import { designTokens } from 'design-tokens'
import { useAuth } from '../../hooks/AuthProvider/AuthProvider'
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                navigate('/perfil')
            }}
        >
            <span>{user?.name}</span>
            {user?.picture &&
                <img src={user.picture} alt='Imagem do usuário' style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%'
                }} />
            }
        </div>
    )
}
