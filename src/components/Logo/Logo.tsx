import Logo from '../../assets/Logo.svg'
import { useNavigate } from 'react-router-dom'

export type LogoProps = {
    size: 'small' | 'medium' | 'large'
}

export function LogoImage(props: LogoProps) {
    const { size } = props
    const navigate = useNavigate()

    return (
        <img src={Logo} alt='logo'
            onClick={() => navigate('/')}
            style={{
                cursor: 'pointer',
                width: size === 'small' ? '50px' : size === 'medium' ? '100px' : '200px',
            }}
        />
    )
}