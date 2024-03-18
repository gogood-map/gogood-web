import { Button } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
    const navigate = useNavigate()

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <h1>Página não encontrada!</h1>
                <Button label='Voltar' type='solid' onClick={() => {navigate('/')}} />
            </div>
        </div>
    );
}