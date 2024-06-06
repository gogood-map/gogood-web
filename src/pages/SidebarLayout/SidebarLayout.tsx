import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { SidebarItem } from '../../components/SidebarItem/SidebarItem'
import { FiHome, FiMap, FiUser } from 'react-icons/fi'
import { designTokens } from 'design-tokens'
import { createContext, useState } from 'react'
import { RiHistoryFill } from 'react-icons/ri'

export type SidebarContextProps = {
    expanded: boolean
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export function SidebarLayout() {
    const [expanded, setExpanded] = useState(false)
    const defaultIconSize = '24px'
    const navigate = useNavigate()

    const icons = [
        { icon: <FiHome size={defaultIconSize} />, text: 'Início', onclick: () => { navigate('/') } },
        { icon: <FiMap size={defaultIconSize} />, text: 'Mapa', onclick: () => { navigate('/mapa') } },
        { icon: <FiUser size={defaultIconSize} />, text: 'Perfil', alert: true, onclick: () => { navigate('/perfil') } },
        { icon: <RiHistoryFill size={defaultIconSize} />, text: 'Histórico', onclick: () => { navigate('/historico') } },
        // { icon: <FiSettings size={defaultIconSize} />, text: 'Ajustes', onclick: () => { navigate('/ajustes') } },
    ]

    return (
        <SidebarContext.Provider value={{ expanded }}>
            <span style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                minHeight: '100vh',
                userSelect: 'none',
                backgroundColor: designTokens.color.background,
            }}>
                <Sidebar onClick={() => { setExpanded(!expanded) }}>
                    {icons.map((icon, index) => (
                        <SidebarItem
                            key={index}
                            icon={icon.icon}
                            text={icon.text}
                            onClick={icon.onclick}
                            alert={icon.alert}
                        />
                    ))}
                </Sidebar>
                <Outlet />
            </span>
        </SidebarContext.Provider>
    )
}
