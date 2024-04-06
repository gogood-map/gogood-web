import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { SidebarItem } from "../../components/SidebarItem/SidebarItem";
import { FiHome, FiMap, FiSettings, FiUser } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { designTokens } from "design-tokens";

export function SidebarLayout() {
    const defaultIconSize = '24px';

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
        }}>
            <Sidebar>
                <SidebarItem icon={<FiHome size={defaultIconSize} />} text="Início" alert />
                <SidebarItem icon={<FiMap size={defaultIconSize} />} text="Mapa" />
                <SidebarItem icon={<FiUser size={defaultIconSize} />} text="Perfil" />
                <SidebarItem icon={<RiHistoryFill size={defaultIconSize} />} text="Histórico" />
                <SidebarItem icon={<FiSettings size={defaultIconSize} />} text="Ajustes" />
            </Sidebar>
            <Outlet />
        </span>
    );
}