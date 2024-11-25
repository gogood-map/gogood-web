import { designTokens } from 'design-tokens'
import { useAuth } from '../../hooks/AuthProvider/AuthProvider'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserImage } from '../../utils/requests/user'
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'

export function UserIcon() {
    const [isHovered, setIsHovered] = useState(false)
    const [image, setImage] = useState('')
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

    const createAvatarImage = () => {
        if (user) {
          const svg = createAvatar(initials, {
            seed: user.name,
            scale: 100,
          })
          setImage(svg.toDataUri())
        }
      }

    useEffect(() => {
        if (user) {
            getUserImage(user.id)
              .then((response) => {
                console.log('Imagem', response.data)
                if (response.data.size === 0) {
                  createAvatarImage()
                  return
                } else {
                  setImage(URL.createObjectURL(response.data))
                }
              })
              .catch((error) => {
                console.log('Erro ao buscar imagem do usuário')
                console.log(error)
                createAvatarImage()
              })
          }
    }, [])

    return (
        <div style={isHovered ? { ...defaultStyle, ...hoverStyle } : defaultStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                navigate('/perfil')
            }}
        >
            {image &&
                <img src={image} alt='Imagem do usuário' style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%'
                }} />
            }
            <span>{user?.name}</span>
        </div>
    )
}
