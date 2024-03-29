import { RegisterForm } from '../RegisterForm/RegisterForm'
import { AuthCard } from './AuthCard'

export default {
    title: 'Components/AuthCard',
    component: AuthCard,
}

const Template = () => <AuthCard children={<RegisterForm/>} /> 

export const Register = Template.bind({})
