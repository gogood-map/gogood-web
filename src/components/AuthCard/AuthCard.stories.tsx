import { QuestionProps } from '../Question/Question'
import { AuthCard } from './AuthCard'

export default {
    title: 'Components/AuthCard',
    component: AuthCard,
}

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

const Template = () => <AuthCard steps={loginSteps} />

export const Default = Template.bind({})
