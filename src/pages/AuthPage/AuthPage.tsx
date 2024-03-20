import BackgroundSign from '../../assets/BackgroundSign.svg'
import { AuthCard } from '../../components/AuthCard/AuthCard'
import { QuestionProps } from '../../components/Question/Question'

export type AuthPageProps = {
    type?: 'login' | 'register'
}

export function AuthPage(props: AuthPageProps) {
    const { type } = props

    const loginSteps = [
        {
            title: 'Login',
            inputs: [
                {
                    title: 'Email',
                    placeholder: 'email@exemplo.com',
                    type: 'FreeText',
                    value: '',
                    helperText: 'Campo obrigatório',
                    required: true,
                    onChange: (value) => console.log(value),
                    onBlur: (event) => console.log(event),
                },
                {
                    title: 'Senha',
                    placeholder: '********',
                    type: 'FreeText',
                    value: '',
                    helperText: 'Campo obrigatório',
                    required: true,
                    onChange: (value) => console.log(value),
                    onBlur: (event) => console.log(event),
                },
                {
                    title: 'Confirmar senha',
                    placeholder: '********',
                    type: 'FreeText',
                    value: '',
                    helperText: 'Campo obrigatório',
                    required: true,
                    onChange: (value) => console.log(value),
                    onBlur: (event) => console.log(event),
                }

            ] as QuestionProps[]
        },
        {
            title: 'Dados Pessoais',
            inputs: [
                {
                    title: 'Nome',
                    placeholder: 'Nome',
                    type: 'FreeText',
                    value: '',
                    helperText: 'Campo obrigatório',
                    required: true,
                    onChange: (value) => console.log(value),
                    onBlur: (event) => console.log(event),
                },
                {
                    title: 'Gênero',
                    type: 'SingleChoice',
                    value: '',
                    helperText: 'Campo obrigatório',
                    required: false,
                    options: [
                        {
                            label: 'Masculino',
                            openField: false
                        },
                        {
                            label: 'Feminino',
                            openField: false
                        },
                        {
                            label: 'Prefiro não dizer',
                            openField: false
                        },
                        {
                            label: 'Outro',
                            openField: true
                        }
                    ],
                },
                {
                    title: 'Data de Nascimento',
                    placeholder: 'dd/mm/aaaa',
                    type: 'FreeText',
                    value: '',
                    helperText: 'Campo obrigatório',
                    required: true,
                    onChange: (value) => console.log(value),
                    onBlur: (event) => console.log(event),
                },
                {
                    title: 'Telefone',
                    placeholder: '(00) 00000-0000',
                    type: 'FreeText',
                    value: '',
                    helperText: 'Campo obrigatório',
                    required: true,
                    onChange: (value) => console.log(value),
                    onBlur: (event) => console.log(event),
                }
            ] as QuestionProps[]
        }
    ]

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            backgroundImage: `url(${BackgroundSign})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            {type === 'login' && (
                <AuthCard steps={loginSteps} />
            )}

        </div>
    )
}