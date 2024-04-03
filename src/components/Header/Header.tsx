import React, { useEffect, useState, isValidElement } from 'react'
import { designTokens } from 'design-tokens'
import { HeaderItemProps } from '../HeaderItem/HeaderItem'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import { Button } from '../Button/Button'
import { useAuth } from '../../hooks/AuthProvider/AuthProvider'
import { UserIcon } from '../UserIcon/UserIcon'

export type HeaderProps = {
    children?: React.ReactNode | React.ReactNode[]
}

export function Header(props: HeaderProps) {
    const { children } = props
    const { user } = useAuth()
    const [isMobile, setIsMobile] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyItems: 'center',
        maxheight: '85px',
        width: `calc(100% - ${designTokens.spacing.large} * 2)`,
        boxShadow: `-3px 5px 12.4px 0px ${designTokens.color.boxShadow}`,
        backgroundColor: designTokens.color.background,
        borderRadius: designTokens.borderRadius.large,
        paddingTop: designTokens.spacing.small,
        paddingBottom: designTokens.spacing.small,
        paddingLeft: designTokens.spacing.large,
        paddingRight: designTokens.spacing.large

    }

    const handleClick = (path: string) => {
        navigate(path)
    }

    return (
        <header style={{
            userSelect: 'none',
            ...headerStyle
        }}>

            {!isMobile && <>
                <Logo size='large' />
                <nav style={{
                    userSelect: 'none',
                }}>
                    <ul style={{
                        display: 'flex',
                        gap: designTokens.spacing.large,
                        userSelect: 'none',
                        margin: 0,
                        padding: 0
                    }}>
                        {React.Children.map(children, (child) => {
                            if (isValidElement<HeaderItemProps>(child)) {
                                return React.cloneElement(child, {
                                    key: child.props.path,
                                    onClick: () => handleClick(child.props.path)
                                })
                            }
                            return child
                        }
                        )}
                    </ul>
                </nav>
                <div style={{
                    display: 'flex',
                    gap: designTokens.spacing.medium,

                }}>
                    {!user?.name &&
                        <>
                            <Button label='Entrar' type='outline' onClick={() => handleClick('/login')} />
                            <Button label='Cadastrar' type='solid' onClick={() => handleClick('/cadastro')} />
                        </>
                    }
                    {user?.name && <UserIcon />}
                </div>
            </>}

            {isMobile && <button>Menu</button>}
        </header>

    )
}