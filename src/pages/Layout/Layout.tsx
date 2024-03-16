import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { HeaderItem } from '../../components/HeaderItem/HeaderItem';
import { designTokens } from 'design-tokens';

export function Layout() {

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' }
    ]

    return (
        <span style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            padding: designTokens.spacing.large,
            userSelect: 'none'
        }}>
            <Header>
                {navItems.map((item, index) => (
                    <HeaderItem key={index} path={item.path} label={item.label} />
                ))}
            </Header>
            <Outlet />
        </span>
    )
}
