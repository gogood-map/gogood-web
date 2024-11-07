import { designTokens } from 'design-tokens'
import { RiAccountCircleLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../hooks/AuthProvider/AuthProvider'
import { useForm } from 'react-hook-form'
import { Input } from '../../../../components/Input/Input'
import { SelectInput } from '../../../../components/SelectInput/SelectInput'
import { Button } from '../../../../components/Button/Button'
import { PopUp } from '../../../../components/PopUp/PopUp'
import { deleteUser, updateUser } from '../../../../utils/requests/user'
import { toast } from 'react-toastify'
import { isAlpha, isEmail } from 'validator'
import { useNavigate } from 'react-router-dom'
import { ImageProfile } from '../ImageProfile/ImageProfile'

export const FormProfile = () => {
  const { user, logout, login } = useAuth()
  const [showExcludeCard, setShowExcludeCard] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  const { register, watch, setValue, formState: { errors } } = useForm({ mode: 'all' })
  const navigate = useNavigate()

  const handleUpdateUser = () => {
    if (!user) {
      toast.error('Faça login para atualizar o usuário')
      setUpdateForm(false)
      return
    }

    const notification = toast.loading('Atualizando usuário...', { autoClose: false })

    updateUser(user?.id, {
      nome: watch('name'),
      email: watch('email'),
      genero: watch('gender').toLowerCase(),
      dt_Nascimento: watch('birthdate')
    }).then(() => {
      toast.update(notification, {
        render: 'Usuário atualizado com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
      login({
        id: user.id,
        name: watch('name'),
        email: watch('email'),
        gender: watch('gender'),
        birthdate: watch('birthdate'),
        token: user.token,
        picture: user.picture
      }, false)

      setUpdateForm(false)
    }).catch((error) => {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('gender', user.gender[0].toUpperCase() + user.gender.slice(1))
      setValue('birthdate', user.birthdate)

      toast.update(notification, {
        render: 'Erro ao atualizar usuário',
        type: 'error',
        isLoading: false,
        autoClose: 2000
      })
      setUpdateForm(false)
      console.error(error)
    }).finally(() => {
      setTimeout(() => {
        toast.dismiss(notification)
      }, 2000)
    })
  }

  const handleDeleteUser = () => {
    if (!user) {
      toast.error('Faça login para excluir o usuário')
      return
    }

    const notification = toast.loading('Excluindo usuário...', { autoClose: false })

    deleteUser(user.id).then(() => {
      toast.update(notification, {
        render: 'Usuário excluído com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
      logout()
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }).catch((error) => {
      toast.update(notification, {
        render: 'Erro ao excluir usuário',
        type: 'error',
        isLoading: false,
        autoClose: 2000
      })
      console.error(error)
    }).finally(() => {
      setTimeout(() => {
        toast.dismiss(notification)
      }, 2000)
    })
  }

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('gender', user.gender[0].toUpperCase() + user.gender.slice(1))
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
          <Button label='Excluir' color='#FF3030' type='primary' onClick={handleDeleteUser} />
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
        <ImageProfile />

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
                  required: { value: true, message: 'Nome obrigatório' },
                  minLength: { value: 3, message: 'Nome deve ter no mínimo 3 caracteres' },
                  validate: (value) => isAlpha(value.replace(/\s/g, ''), 'pt-BR') || 'Nome deve conter apenas letras'
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
                'Masculino', 'Feminino', 'Outro', 'Não especificado'
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
              disabled={updateForm && (!(!errors.name && !errors.email && !errors.birthdate)
                || (!watch('name') || !watch('email') || !watch('gender') || !watch('birthdate')))}
              onClick={() => { updateForm ? handleUpdateUser() : setUpdateForm(true) }}
            />
          </div>
        </section>
      </form>
    </div>
  )
}
