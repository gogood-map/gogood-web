import { QuestionProps } from './AuthCard' 
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
                label: 'E-mail',
                name: 'email',
                type: 'email',
                placeholder: 'Seu E-mail',
                registerOptions: {
                    required: true
                }
            },
            {
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
                registerOptions: {
                    required: true
                }
            },
            {
                label: 'Confirmar Senha',
                name: 'passwordConfirmation',
                type: 'password',
                placeholder: 'Confirme sua senha',
                registerOptions: {
                    required: true
                }
            }

        ] as QuestionProps[]
    },
    {
        title: 'Dados Pessoais',
        inputs: [
            {
                label: 'Nome',
                name: 'name',
                type: 'text',
                placeholder: 'Seu nome',
                registerOptions: {
                    required: true
                }
            },
            {
                label: 'Gênero',
                name: 'gender',
                type: 'radio',
                options: [
                    { label: 'Masculino', value: 'masculino' },
                    { label: 'Feminino', value: 'feminino' },
                    { label: 'Outro', value: 'outro' }
                ],
                registerOptions: {
                    required: true
                }
            },
            {
                label: 'Data de Nascimento',
                name: 'birthDate',
                type: 'date',
                placeholder: 'Data de Nascimento',
                registerOptions: {
                    required: true
                }
            }
        ] as QuestionProps[]
    }
]

const Template = () => <AuthCard
    steps={loginSteps}
    onSubmit={(value) => { console.log(value) }}
/>

export const Default = Template.bind({})
