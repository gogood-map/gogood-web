import { RiHistoryFill } from "react-icons/ri";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { Sidebar } from "./Sidebar";
import { FiHome, FiMap, FiSettings, FiUser } from "react-icons/fi";

export default {
    title: "Components/Sidebar",
    component: Sidebar,
};

const defaultIconSize = '28px';

export const Default = () => {
    return (
        <Sidebar onClick={() => {
            console.log('clicked')
        }} >
            <SidebarItem icon={<FiHome size={defaultIconSize} />} text="Início" active={true} alert />
            <SidebarItem icon={<FiMap size={defaultIconSize} />} text="Mapa" active={false} />
            <SidebarItem icon={<FiUser size={defaultIconSize} />} text="Perfil" active={false} />
            <SidebarItem icon={<RiHistoryFill size={defaultIconSize} />} text="Histórico" active={false} />
            <SidebarItem icon={<FiSettings size={defaultIconSize} />} text="Ajustes" active={false} />
        </Sidebar>
    );
};