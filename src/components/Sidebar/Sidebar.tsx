import { FiLogOut, FiMenu } from 'react-icons/fi'
import { ReactNode, useContext } from 'react'
import { designTokens } from 'design-tokens'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useAuth } from '../../hooks/AuthProvider/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { SidebarContext, SidebarContextProps } from '../../pages/SidebarLayout/SidebarLayout'

type SidebarProps = {
    children: ReactNode
    onClick: () => void
}

export function Sidebar({ children, onClick }: SidebarProps) {
    const { expanded } = useContext(SidebarContext) as SidebarContextProps
    const { logout } = useAuth()
    const { user } = useAuth()
    const navigate = useNavigate()

    const buttonStyle = {
        backgroundColor: 'rgb(249, 250, 251)',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
    } as React.CSSProperties

    const expandedStyle = {
        transform: 'rotate(180deg)',
    } as React.CSSProperties

    return (
        <aside style={{
            height: '100vh',
            width: 'min-content',
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 1,
        }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: `calc(100% - (${designTokens.spacing.large} * 2))`,
                backgroundColor: designTokens.color.background,
                borderRadius: `0px ${designTokens.borderRadius.large} ${designTokens.borderRadius.large} 0px`,
                paddingTop: designTokens.spacing.large,
                paddingBottom: designTokens.spacing.large,
                paddingLeft: designTokens.spacing.medium,
                paddingRight: designTokens.spacing.medium,
                boxShadow: `0px 4px 4px 4px ${designTokens.color.boxShadow}`
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',

                    gap: designTokens.spacing.medium,
                    width: '100%',
                    height: '30px',
                }}>
                    <button
                        onClick={() => onClick()}
                        style={expanded ? { ...buttonStyle, ...expandedStyle } : buttonStyle}
                    >
                        <FiMenu size={'28px'} />
                    </button>
                </div>

                <ul style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 0,
                    padding: 0,
                    gap: designTokens.spacing.large,
                    minHeight: '70%',
                }}>
                    {children}
                </ul>
                {user &&
                    <div>
                        <SidebarItem icon={<FiLogOut size={'28px'} />} text='Sair' active={false} onClick={() => {
                            logout()
                            navigate('/')
                        }} />
                    </div>
                }
            </nav>
        </aside>
    )
}
