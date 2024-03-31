import { designTokens } from 'design-tokens'
import { useEffect, useState } from 'react'

export type HeaderItemProps = {
    label: string
    path: string
    onClick?: () => void
}

type styleItem = {
    textDecoration: string
    color: string
    fontWeight: number
}

export function HeaderItem({ label, path, onClick }: HeaderItemProps) {
    const url = window.location.pathname
    const divRef = window.location.hash
    const [styleItem, setStyleItem] = useState<styleItem>({
        textDecoration: 'none',
        color: designTokens.color.text,
        fontWeight: designTokens.font.weight.regular
    })

    useEffect(() => {
        if (divRef) {
            if (divRef === path) {
                setStyleItem({
                    textDecoration: 'underline',
                    color: designTokens.color.selected,
                    fontWeight: designTokens.font.weight.bold
                })
            } else {
                setStyleItem({
                    textDecoration: 'none',
                    color: designTokens.color.text,
                    fontWeight: designTokens.font.weight.regular
                })
            }
        } else {
            if (url === path) {
                setStyleItem({
                    textDecoration: 'underline',
                    color: designTokens.color.selected,
                    fontWeight: designTokens.font.weight.bold
                })
            } else {
                setStyleItem({
                    textDecoration: 'none',
                    color: designTokens.color.text,
                    fontWeight: designTokens.font.weight.regular
                })
            }
        }

    }, [divRef, path, url])

    return (
        <li onClick={onClick}
            style={{
                listStyleType: 'none',
                cursor: 'pointer',
                userSelect: 'none',
            }}>
            <p style={{
                margin: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                ...styleItem
            }}>
                {label}
            </p>
        </li>
    )
}