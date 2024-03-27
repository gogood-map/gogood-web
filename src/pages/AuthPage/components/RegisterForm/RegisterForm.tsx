import { isAlpha, isEmail } from 'validator'
import { designTokens } from 'design-tokens'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Stepper } from '../../../../components/Steper/Stepper'
import { AuthButton } from '../AuthButton/AuthButton'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import CompleteRegister from '../../../../assets/CompleteRegister.svg'
import styled from 'styled-components'

export function RegisterForm() {
    const [formStep, setFormStep] = useState(0)
    const navigate = useNavigate()
    const steps = [
        { title: 'Cadastro' },
        { title: 'Dados' },
        { title: 'Personalização' },
        { title: 'Concluído' }
    ]
    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid, errors }
    } = useForm({ mode: 'all' })

    const onSubmit = (data: unknown) => {
        console.log(data)
    }


    const RadioInput = styled.input.attrs({ type: 'radio' })`
        appearance: none;
        accent-color: ${designTokens.color.primary};
        border-radius: 100%;
        border: 1px solid ${designTokens.color.border};
        width: ${designTokens.spacing.medium};
        height: ${designTokens.spacing.medium};
        margin: 0 0 0 ${designTokens.spacing.tiny};

        &:checked {
            background-color: ${designTokens.color.primary};
        }
    `
    const textInputStyle = {
        padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
        borderRadius: designTokens.borderRadius.medium,
        border: `1px solid ${designTokens.color.border}`,
        outline: 'none',
        fontSize: designTokens.font.size.medium,
        height: '25px',
    }

    const smallTextInputStyle = {
        padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
        borderRadius: designTokens.borderRadius.medium,
        border: `1px solid ${designTokens.color.border}`,
        outline: 'none',
        fontSize: designTokens.font.size.medium,
        height: '25px',
        width: '200px'
    }

    return (
        <form style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: designTokens.spacing.mediumLarge,
        }}
            onSubmit={handleSubmit(onSubmit)}>
            <Stepper steps={steps} currentStep={formStep} />
            {formStep >= 0 && (
                <section style={{
                    display: formStep === 0 ? 'flex' : 'none',
                    width: '100%',
                    flexDirection: 'column',
                    gap: designTokens.spacing.medium
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
                        fontSize: designTokens.font.size.extraLarge,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        margin: 0,
                    }}>
                        Cadastre-se
                    </h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: designTokens.spacing.tiny
                    }}>
                        <label htmlFor='email'>Email</label>
                        <input style={textInputStyle}
                            autoComplete='off'
                            id='email'
                            type='email'
                            {...register('email', {
                                required: { value: true, message: 'Email obrigatório' },
                                validate: (value) => isEmail(value) || 'Email inválido',
                            })}
                            placeholder='Seu email'
                        />
                        {errors.email && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.email.message as string}</span>}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: designTokens.spacing.tiny
                    }}>
                        <label htmlFor='password'>Senha</label>
                        <input style={textInputStyle}
                            id='password'
                            type='password'
                            {...register('password', {
                                required: { value: true, message: 'Senha obrigatória' },
                                minLength: { value: 6, message: 'Senha deve ter no mínimo 6 caracteres' }
                            })}
                            placeholder='Sua senha'
                        />
                        {errors.password && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.password.message as string}</span>}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: designTokens.spacing.tiny
                    }}>
                        <label htmlFor='confirmPassword'>Confirme sua senha</label>
                        <input style={textInputStyle}
                            id='confirmPassword'
                            type='password'
                            {...register('confirmPassword', {
                                required: { value: true, message: 'Confirmação de senha obrigatória' },
                                validate: (value, { password }) => value === password || 'Senhas não conferem'
                            })}
                            placeholder='Confirme sua senha'
                        />
                        {errors.confirmPassword && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.confirmPassword.message as string}</span>}
                    </div>
                    <AuthButton
                        currentStep={formStep}
                        steps={steps.length}
                        disabled={(!watch('email') || !watch('password') || !watch('confirmPassword'))
                            || (errors.email ? true : false || errors.password ? true : false || errors.confirmPassword ? true : false)}
                        onClickNext={() => setFormStep(formStep + 1)}
                    />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        Ou faça parte com

                        <GoogleLogin
                            text='signin'
                            onSuccess={response => console.log(response)}
                            onError={() => console.log('error')}
                        />
                    </div>
                </section>
            )}
            {formStep >= 1 && (
                <section style={{
                    display: formStep === 1 ? 'flex' : 'none',
                    width: '100%',
                    flexDirection: 'column',
                    gap: designTokens.spacing.medium
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
                        fontSize: designTokens.font.size.extraLarge,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        margin: 0,
                    }}>
                        Dados Pessoais
                    </h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: designTokens.spacing.tiny
                    }}>
                        <label htmlFor='name'>Nome</label>
                        <input style={textInputStyle}
                            id='name'
                            type='text'
                            {...register('name', {
                                required: { value: true, message: 'Nome obrigatório' },
                                minLength: { value: 3, message: 'Nome deve ter no mínimo 3 caracteres' },
                                validate: (value) => isAlpha(value) || 'Nome deve conter apenas letras'
                            })}
                            placeholder='Seu nome'
                        />
                        {errors.name && watch('name') && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.name.message as string}</span>}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: designTokens.spacing.small
                    }}>
                        <label>Selecione seu gênero:</label>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: designTokens.spacing.tiny
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: designTokens.spacing.medium
                            }}>
                                <RadioInput
                                    type='radio'
                                    value='masculino'
                                    {...register('gender', { required: true })}
                                />
                                <label htmlFor='masculino'>Masculino</label>
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: designTokens.spacing.medium
                            }}>
                                <RadioInput
                                    type='radio'
                                    value='feminino'
                                    {...register('gender', { required: true })}
                                />
                                <label htmlFor='feminino'>Feminino</label>
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: designTokens.spacing.medium
                            }}>
                                <RadioInput
                                    type='radio'
                                    value='não especificado'
                                    {...register('gender', { required: true })}
                                />
                                <label htmlFor='not-specified'>Prefiro não dizer</label>
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: designTokens.spacing.medium
                            }}>
                                <RadioInput
                                    type='radio'
                                    value='outro'
                                    {...register('gender', { required: true })}
                                />
                                <label htmlFor='outro'>Outro</label>
                            </div>
                        </div>
                        {errors.gender && watch('gender') && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>Selecione uma opção</span>}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: designTokens.spacing.tiny
                    }}>
                        <label htmlFor='birthDate'>Data de nascimento</label>
                        <input style={smallTextInputStyle}
                            id='birthDate'
                            type='date'
                            {...register('birthDate', {
                                required: { value: true, message: 'Data de nascimento obrigatória' }
                            })}
                        />
                        {errors.birthDate && watch('birthDate') && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.birthDate.message as string}</span>}
                    </div>
                    <AuthButton
                        currentStep={formStep}
                        steps={steps.length}
                        disabled={(!watch('name') || !watch('gender') || !watch('birthDate'))
                            || (errors.name ? true : false || errors.gender ? true : false || errors.birthDate ? true : false)}
                        onClickBack={() => setFormStep(formStep - 1)}
                        onClickNext={() => setFormStep(formStep + 1)}
                    />
                </section>
            )}
            {formStep >= 2 && (
                <section style={{
                    display: formStep === 2 ? 'flex' : 'none',
                    width: '100%',
                    flexDirection: 'column',
                    gap: designTokens.spacing.medium
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: designTokens.spacing.tiny
                    }}>
                        <h1 style={{
                            color: designTokens.color.text,
                            fontSize: designTokens.font.size.extraLarge,
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            margin: 0,
                        }}>
                            Personalização
                        </h1>
                        <p style={{
                            color: designTokens.color.text,
                            fontSize: designTokens.font.size.smallMedium,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            width: '100%',
                            margin: 0,

                        }}>Estamos quase lá! Só mais algumas informações para conhecermos um pouco melhor de você.</p>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: designTokens.spacing.tiny
                    }}>
                        <label htmlFor='address'>Endereço</label>
                        <input style={textInputStyle}
                            id='address'
                            type='text'
                            {...register('address', {
                                required: { value: true, message: 'Endereço obrigatório' },
                            })}
                            placeholder='Seu endereço'
                        />
                        {errors.address && watch('address') && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>{errors.address.message as string}</span>}
                    </div>
                    <AuthButton
                        currentStep={formStep}
                        steps={steps.length - 1}
                        disabled={!watch('address') || !isValid}
                        onClickBack={() => setFormStep(formStep - 1)}
                        onClickNext={() => setFormStep(formStep + 1)}
                        onClickSubmit={() => setFormStep(formStep + 1)}
                    />
                </section>
            )}
            {formStep >= 3 && (
                <section style={{
                    display: formStep === 3 ? 'flex' : 'none',
                    width: '100%',
                    flexDirection: 'column',
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
                        fontSize: designTokens.font.size.extraLarge,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        margin: 0,
                    }}>
                        Concluído
                    </h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: designTokens.spacing.medium,
                        width: '100%'
                    }}>
                        <span>Seu cadastro foi realizado com sucesso!</span>
                        <img src={CompleteRegister} alt="cadastro completo" />
                    </div>

                </section>
            )}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                color: designTokens.color.text,
                fontSize: designTokens.font.size.medium,
            }}>
                Possui cadastro? Retome sua segurança!
                <a
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = designTokens.color.secondary
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = designTokens.color.primary
                    }}
                    style={{
                        color: designTokens.color.primary,
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                    onClick={() => { navigate('/login') }}
                > Login </a>

            </div>
            {/* <AuthButton
                currentStep={formStep}
                steps={steps.length}
                onClickBack={() => setFormStep(formStep - 1)}
                onClickNext={() => setFormStep(formStep + 1)}
            /> */}
        </form>
    )
}