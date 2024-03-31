
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { HeaderItem } from '../../components/HeaderItem/HeaderItem'
import { designTokens } from 'design-tokens'

export function Layout() {

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/mapa', label: 'Mapa' },
        { path: '#sobre-nos', label: 'Sobre Nós' }
    ]

    return (
        <span style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: '32px',
            minHeight: '100vh',
            userSelect: 'none',
            overflow: 'hidden',
            backgroundColor: designTokens.color.background,
            gap: designTokens.spacing.large
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '1376px',
                width: '100%',
                gap: designTokens.spacing.large

            }}>
                <Header>
                    {navItems.map((item, index) => (
                        <HeaderItem key={index} path={item.path} label={item.label} />
                    ))}
                </Header>
                <Outlet />
            </div>
        </span>
    )
}