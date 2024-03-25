import { designTokens } from "design-tokens";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Stepper } from "../Steper/Stepper";
import { AuthButton } from "../AuthButton/AuthButton";

export function RegisterForm() {
    const [formStep, setFormStep] = useState(0)
    const steps = [
        { title: 'Cadastro' },
        { title: 'Dados Pessoais' },
        { title: 'Personalização' },
        { title: 'Concluído' }
    ]
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { isValid, errors }
    } = useForm({mode: 'all'})

    const onSubmit = (data: unknown) => {
        console.log(data)
    }

    console.log('render')

    useEffect(() => {
        // console.log(JSON.stringify(errors, null, 2))
    }, [errors, formStep, watch()])

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
        height: '35px',
    }

    const smallTextInputStyle = {
        padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
        borderRadius: designTokens.borderRadius.medium,
        border: `1px solid ${designTokens.color.border}`,
        outline: 'none',
        fontSize: designTokens.font.size.medium,
        height: '35px',
        width: '200px'
    }

    return (
        <form style={{
            display: 'flex',
            width: 'auto',
            flexDirection: 'column',
            gap: designTokens.spacing.mediumLarge
        }}
            onSubmit={handleSubmit(onSubmit)}>
            <Stepper steps={steps} currentStep={formStep} />
            {formStep >= 0 && (
                <section style={{
                    display: formStep === 0 ? 'flex' : 'none',
                    flexDirection: 'column',
                    gap: designTokens.spacing.medium
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
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
                        <input style={{
                            padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                            borderRadius: designTokens.borderRadius.medium,
                            border: `1px solid ${designTokens.color.border}`,
                            outline: 'none',
                            fontSize: designTokens.font.size.medium,
                            height: '35px',
                        }}
                            id='email'
                            type='email'
                            {...register('email', {
                                required: { value: true, message: 'Email obrigatório' },
                                validate: (value) => value.includes('@') || 'Email inválido',

                            })}
                            placeholder='Seu email'
                        />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email.message as string}</span>}
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
                        {errors.password && <span style={{ color: 'red' }}>{errors.password.message as string}</span>}
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
                        {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword.message as string}</span>}
                    </div>
                    <AuthButton
                        currentStep={formStep}
                        steps={steps.length}
                        disabled={!isValid}
                        onClickNext={() => setFormStep(formStep + 1)}
                    />
                </section>
            )}
            {formStep >= 1 && (
                <section style={{
                    display: formStep === 1 ? 'flex' : 'none',
                    flexDirection: 'column',
                    gap: designTokens.spacing.medium
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
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
                                required: { value: true, message: 'Nome obrigatório' }
                            })}
                            placeholder='Seu nome'
                        />
                        {errors.name && <span style={{ color: 'red' }}>{errors.name.message as string}</span>}
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
                        {errors.gender && <span style={{ color: 'red' }}>Selecione uma opção</span>}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: designTokens.spacing.tiny
                    }}>
                        <label htmlFor="birthDate">Data de nascimento</label>
                        <input style={smallTextInputStyle}
                            id="birthDate"
                            type="date"
                            {...register('birthDate', {
                                required: { value: true, message: 'Data de nascimento obrigatória' }
                            })}
                        />
                        {errors.birthDate && <span style={{ color: 'red' }}>{errors.birthDate.message as string}</span>}
                    </div>
                    <AuthButton
                        currentStep={formStep}
                        steps={steps.length}
                        disabled={!isValid}
                        onClickBack={() => {
                            setFormStep(formStep - 1)
                            // reset({ 
                            //     email: watch('email'), 
                            //     password: watch('password'), 
                            //     confirmPassword: watch('confirmPassword'),
                            // })
                            // errors?.birthDate 
                            // ? unregister('birthDate')
                            // : resetField('birthDate')

                        }}
                        onClickNext={() => setFormStep(formStep + 1)}
                    />
                </section>
            )}
            {formStep >= 2 && (
                <section style={{
                    display: formStep === 2 ? 'flex' : 'none',
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
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            margin: 0,
                        }}>
                            Pernalização
                        </h1>
                        <p>Estamos quase lá! Só mais algumas informações para conhecermos um pouco melhor de você.</p>
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
                                required: { value: true, message: 'Endereço obrigatório' }
                            })}
                            placeholder='Seu endereço'
                        />
                    </div>
                    <AuthButton
                        currentStep={formStep}
                        steps={steps.length}
                        disabled={!isValid}
                        onClickBack={() => {
                            setFormStep(formStep - 1)
                            reset({
                                email: watch('email'),
                                password: watch('password'),
                                confirmPassword: watch('confirmPassword'),
                                name: watch('name'),
                                gender: watch('gender'),
                                birthDate: watch('birthDate')
                            })
                        }}
                        onClickNext={() => setFormStep(formStep + 1)}
                    />
                </section>
            )}
            {formStep >= 3 && (
                <section style={{
                    display: formStep === 3 ? 'flex' : 'none',
                    flexDirection: 'column',
                    gap: designTokens.spacing.medium
                }}>
                    <h1 style={{
                        color: designTokens.color.text,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        margin: 0,
                    }}>
                        Concluído
                    </h1>
                    <label>Seu cadastro foi realizado com sucesso!</label>
                    <AuthButton
                        currentStep={formStep}
                        steps={steps.length}
                        disabled={!isValid}
                        onClickBack={() => {
                            setFormStep(formStep - 1)
                        }}
                    />
                </section>
            )}
            <AuthButton
                currentStep={formStep}
                steps={steps.length}
                disabled={isValid}
                onClickBack={() => {
                    setFormStep(formStep - 1)
                }}
                onClickNext={() => setFormStep(formStep + 1)}
            />
            <pre>
                {JSON.stringify(watch(), null, 2)}
            </pre>
        </form>
    )
}