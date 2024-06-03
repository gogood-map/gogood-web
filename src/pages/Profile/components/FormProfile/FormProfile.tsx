import { designTokens } from 'design-tokens'
import { RiAccountCircleLine } from 'react-icons/ri'
import monteiro from '../../../../assets/monteiro.png'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../hooks/AuthProvider/AuthProvider'
import { useForm } from 'react-hook-form'
import { Input } from '../../../../components/Input/Input'
import isEmail from 'validator/lib/isEmail'
import { SelectInput } from '../../../../components/SelectInput/SelectInput'
import { Button } from '../../../../components/Button/Button'
import { PopUp } from '../../../../components/PopUp/PopUp'

export const FormProfile = () => {
  const { user } = useAuth()
  const [showExcludeCard, setShowExcludeCard] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  const { register, setValue, formState: { errors } } = useForm({ mode: 'all' })

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('gender', user.gender)
      setValue('birthdate', user.birthdate)
    }
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      boxShadow: `0px 4px 13.9px 0px ${designTokens.color.boxShadow}`,
      width: `calc(100% - ${designTokens.spacing.large} * 2)`,
      height: `calc(100% - ${designTokens.spacing.large} * 2)`,
      padding: designTokens.spacing.large,
      borderRadius: designTokens.borderRadius.large,
      gap: designTokens.spacing.medium,
    }}>
      {showExcludeCard && <PopUp onClose={() => setShowExcludeCard(false)}>
        <h1 style={{ margin: 0 }}>Excluir conta</h1>
        <p>Deseja realmente excluir a conta?</p>
        <div style={{
          display: 'flex',
          gap: designTokens.spacing.medium
        }}>
          <Button label='Cancelar' onClick={() => setShowExcludeCard(false)} />
          <Button label='Excluir' color='#FF3030' type='primary' onClick={() => { }} />
        </div>
      </PopUp>}
      <span style={{
        display: 'flex',
        alignItems: 'center',
        fontFamily: designTokens.font.family,
        fontSize: designTokens.font.size.large,
        fontWeight: designTokens.font.weight.medium,
        gap: designTokens.spacing.medium
      }}><RiAccountCircleLine size={40} /> Detalhes da Conta</span>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing.medium,
          padding: `0 ${designTokens.spacing.medium}`,
          flex: 1
        }}
      >
        <section>
          <div style={{
            width: 100,
            height: 100,
            backgroundSize: 'cover',
            borderRadius: 100,
            backgroundImage: `url(${monteiro})`
          }}></div>
        </section>

        <section style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: designTokens.spacing.small,
            flex: 1,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Input
                label='Nome'
                value={user?.name}
                disabled={!updateForm}
                register={register('name', {
                  required: 'Campo obrigatório'
                })}
              />

              {errors.name && <span style={{ color: 'red', fontSize: designTokens.font.size.small }}>
                {String(errors.name.message)}
              </span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Input
                label='Email'
                disabled={!updateForm}
                value={user?.email}
                register={register('email', {
                  required: 'Campo obrigatório',
                  validate: (value) => isEmail(value) || 'Email inválido'
                })}
              />

              {errors.email && <span style={{
                color: 'red',
                fontSize: designTokens.font.size.small
              }}>
                {String(errors.email.message)}
              </span>}
            </div>

            <SelectInput
              label='Gênero'
              value={user?.gender}
              disabled={!updateForm}
              register={register('gender')} options={[
                'Masculino', 'Feminino', 'Outro', 'Prefiro não dizer'
              ]}
            />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Input
                label='Data de Nascimento'
                type={'date'}
                value={user?.birthdate}
                disabled={!updateForm}
                register={register('birthdate', {
                  required: 'Campo obrigatório',
                  validate: (value) => new Date(value) < new Date() || 'Data inválida'
                })}
              />
              {errors.birthdate && <span style={{
                color: 'red',
                fontSize: designTokens.font.size.small
              }}>
                {String(errors.birthdate.message)}
              </span>}
            </div>

          </div>
          <div style={{
            display: 'flex',
            gap: designTokens.spacing.medium
          }}>
            <Button
              label={updateForm ? 'Cancelar' : 'Excluir Conta'}
              type='primary'
              color={updateForm ? designTokens.color.secondary : '#FF4040'}
              onClick={() => updateForm ? setUpdateForm(false) : setShowExcludeCard(true)}
            />
            <Button
              label={updateForm ? 'Salvar' : 'Atualizar'}
              type='primary'
              onClick={() => { updateForm ? setUpdateForm(false) : setUpdateForm(true)}}
            />
          </div>
        </section>
      </form>
    </div>
  )
}
