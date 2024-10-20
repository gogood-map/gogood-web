// import { useEffect, useState } from "react"
import { ListItem } from "./ListItem"
import { designTokens } from "design-tokens"

export type ListAutoCompleteProps = {
  items: string[]
  show: boolean
  onSelect: (item: string) => void
}

export function ListAutoComplete(props: ListAutoCompleteProps) {
  const { items, show, onSelect } = props

  return (
    <div style={{
      position: 'absolute',
      width: 'calc(100% + 2px)',
      height: show ? 'auto' : '0px',
      top: '100%',
      background: designTokens.color.background,
      borderRadius: designTokens.borderRadius.medium,
      boxShadow: `0 4px 14px 0 ${designTokens.color.boxShadow}`,
      zIndex: 1,
      maxHeight: 'calc(41px * 3)',
      overflowY: 'auto',
    }}>
      {items.map((item) => {
        return (
          <div key={item} style={{
            cursor: 'pointer'
          }}>
            <ListItem item={item} onSelect={onSelect} />
          </div>
        )
      })}
    </div>
  )
}
