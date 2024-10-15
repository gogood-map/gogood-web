import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { SidebarItem } from '../../components/SidebarItem/SidebarItem'
import { FiHome, FiMap, FiUser } from 'react-icons/fi'
import { createContext, useState } from 'react'
import { RiChat4Line, RiHistoryFill } from 'react-icons/ri'
import styles from './SidebarLayout.module.css'
import { useAuth } from '../../hooks/AuthProvider/AuthProvider'


export type SidebarContextProps = {
    expanded: boolean
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export function SidebarLayout() {
    const { user } = useAuth()
    const [expanded, setExpanded] = useState(false)
    const defaultIconSize = '24px'
    const navigate = useNavigate()

    const icons = [
        { icon: <FiHome size={defaultIconSize} />, text: 'Início', onclick: () => { navigate('/') } },
        { icon: <FiMap size={defaultIconSize} />, text: 'Mapa', onclick: () => { navigate('/mapa') } },
        { icon: <FiUser size={defaultIconSize} />, text: 'Perfil', alert: true, onclick: () => { navigate('/perfil') } },
        { icon: <RiHistoryFill size={defaultIconSize} />, text: 'Histórico', onclick: () => { navigate('/historico') } },
    ]
    
    const iconsWithoutLogin = [
        { icon: <FiHome size={defaultIconSize} />, text: 'Início', onclick: () => { navigate('/') } },
        { icon: <FiMap size={defaultIconSize} />, text: 'Mapa', onclick: () => { navigate('/mapa') } },
    ]
    return (
        
        <SidebarContext.Provider value={{ expanded }}>
            <span className={styles['sidebar-layout']}>
                <Sidebar onClick={() => { setExpanded(!expanded) }}>
                   
                    {user && icons.map((icon, index) => (
                        
                        <SidebarItem
                            key={index}
                            icon={icon.icon}
                            text={icon.text}
                            onClick={icon.onclick}
                            alert={icon.alert}
                        />
                    ))}
                    {!user && iconsWithoutLogin.map((icon, index) => (
                        
                        <SidebarItem
                            key={index}
                            icon={icon.icon}
                            text={icon.text}
                            onClick={icon.onclick}
                        />
                    ))}
                </Sidebar>
                <Outlet />
            </span>
        </SidebarContext.Provider>
    )
}
