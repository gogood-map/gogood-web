import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { SidebarItem } from "../../components/SidebarItem/SidebarItem";
import { FiHome, FiMap, FiSettings, FiUser } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { designTokens } from "design-tokens";

export function SidebarLayout() {
    const defaultIconSize = '24px';
    const navigate = useNavigate();

    const icons = [
        { icon: <FiHome size={defaultIconSize} />, text: "Início", alert: true, onclick: () => { navigate('/') } },
        { icon: <FiMap size={defaultIconSize} />, text: "Mapa", onclick: () => { navigate('/mapa') } },
        { icon: <FiUser size={defaultIconSize} />, text: "Perfil", onclick: () => { navigate('/perfil') } },
        { icon: <RiHistoryFill size={defaultIconSize} />, text: "Histórico", onclick: () => { navigate('/historico') } },
        { icon: <FiSettings size={defaultIconSize} />, text: "Ajustes", onclick: () => { navigate('/ajustes') } },
    ]

    return (
        <span style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            userSelect: 'none',
            overflow: 'hidden',
            backgroundColor: designTokens.color.background,
        }}>
            <Sidebar>
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
    );
}