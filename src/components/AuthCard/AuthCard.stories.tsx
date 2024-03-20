import { AuthCard } from './AuthCard'

export default {
    title: 'Components/AuthCard',
    component: AuthCard,
}

const title = 'Cadastro'
const steps = [
    {
        title: 'Dados pessoais',
        inputs: [
            { label: 'Nome', type: 'text', placeholder: 'Digite seu nome' },
            { label: 'Email', type: 'email', placeholder: 'Digite seu email' },
            { label: 'Senha', type: 'password', placeholder: 'Digite sua senha' },
        ]
    },
    {
        title: 'Endereço',
        inputs: [
            { label: 'CEP', type: 'text', placeholder: 'Digite seu CEP' },
            { label: 'Rua', type: 'text', placeholder: 'Digite sua rua' },
            { label: 'Número', type: 'text', placeholder: 'Digite o número' },
        ]
    }

]
const Template = () => <AuthCard title={title} steps={steps} />

export const Default = Template.bind({})
