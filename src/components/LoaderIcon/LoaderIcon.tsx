import { TbLoader2 } from 'react-icons/tb'
import style from './LoaderIcon.module.css'

type LoaderIconProps = {
    size?: number
}

export function LoaderIcon(props: LoaderIconProps) {
    const { size } = props

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <TbLoader2 className={style.loader_icon} size={size} />

        </div>
    )
}
