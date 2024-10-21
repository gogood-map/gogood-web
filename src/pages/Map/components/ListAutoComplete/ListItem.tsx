import { FaHistory } from 'react-icons/fa'
import style from './ListItem.module.css'

export type ListItemProps = {
  item: string
  onSelect: (item: string) => void
}

export function ListItem(props: ListItemProps) {
  const { item, onSelect } = props

  return (
    <div
      className={style.item_container}
      onClick={() => {
        onSelect(item)
      }}
    >
      <FaHistory className={style.item_icon} />
      <span className={style.item_text}>
        {item}
      </span>
    </div>
  )
}
