import { ReactNode, useContext, useState } from "react";
import { SidebarContext, SidebarContextProps } from "../../pages/SidebarLayout/SidebarLayout";
import { designTokens } from "design-tokens";

export type SidebarItemProps = {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
    onClick?: () => void;
}

export function SidebarItem({ icon, text, alert, onClick }: SidebarItemProps) {
    const { expanded } = useContext(SidebarContext) as SidebarContextProps
    const [isHovered, setIsHovered] = useState(false)

    const toolTipStyle = {
        position: 'absolute',
        left: '100%',
        borderRadius: '0.375rem',
        padding: '0.25rem 0.5rem',
        marginLeft: designTokens.spacing.small,
        backgroundColor: designTokens.color.background,
        color: designTokens.color.text,
        fontSize: designTokens.font.size.medium,
        visibility: 'hidden',
        opacity: '0',
        transform: `translateX(-${designTokens.spacing.tiny})`,
        transition: 'visibility 0s, opacity 0.3s, transform 0.3s',
    } as React.CSSProperties

    const hoveredToolTipStyle = {
        visibility: 'visible',
        opacity: '1',
        transform: 'translateX(0)'
    } as React.CSSProperties


    return (
        <li
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: designTokens.font.weight.medium,
                borderRadius: designTokens.borderRadius.medium,
                color: designTokens.color.text,
                width:'fit-content',
                padding: 0,
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            {icon}
            <span
                style={{
                    overflow: 'hidden',
                    transition: 'width 0.3s ease, margin-left 0.3s ease',
                    width: expanded ? '100px' : '0',
                    marginLeft: expanded ? designTokens.spacing.medium : '0',
                    fontSize: designTokens.font.size.mediumLarge,
                }}
            >
                {text}
            </span>
            {alert && (
                <div
                    style={{
                        position: expanded ? 'unset' : 'absolute',
                        margin: expanded ? '0' : '0 0 22px 22px',
                        backgroundColor: designTokens.color.primary,
                        color: designTokens.color.white,
                        borderRadius: '50%',
                        width: '0.5rem',
                        height: '0.5rem',
                    }}
                />
            )}

            {!expanded && (
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={isHovered ? { ...toolTipStyle, ...hoveredToolTipStyle } : toolTipStyle}
                >
                    {text}
                </div>
            )}
        </li>
    )
}
