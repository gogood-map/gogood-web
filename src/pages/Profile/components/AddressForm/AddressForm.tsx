import { designTokens } from 'design-tokens'
import { useForm } from 'react-hook-form'
import { BiHomeAlt2, BiHomeHeart } from 'react-icons/bi'
import { IoSchoolOutline } from 'react-icons/io5'
import { PiSuitcaseSimple } from 'react-icons/pi'
import { Button } from '../../../../components/Button/Button'
import axios from 'axios'
import { useEffect } from 'react'
import { createAddress, updateAddress } from '../../../../utils/requests/address'
import { toast } from 'react-toastify'
import { useAuth } from '../../../../hooks/AuthProvider/AuthProvider'

export type AddressFormProps = {
  id?: number
  update?: boolean
  zipCode?: string
  street?: string
  number?: string
  district?: string
  city?: string
  tag?: string
  updateAddresses?: () => void
}

export function AddressForm(props: AddressFormProps) {
  const { id, zipCode, street, number, district, city, tag, update, updateAddresses } = props
  const { register, watch, setValue } = useForm({ mode: 'all' })
  const { user } = useAuth()

  useEffect(() => {
    zipCode && setValue('zipCode', zipCode)
    street && setValue('street', street)
    number && setValue('number', number)
    district && setValue('district', district)
    city && setValue('city', city)
    tag && setValue('tag', tag)
  }, [])

  const tagLabelStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: designTokens.spacing.tiny,
    padding: designTokens.spacing.small,
    borderRadius: designTokens.borderRadius.medium,
    border: `1px solid ${designTokens.color.border}`,
    fontSize: designTokens.font.size.smallMedium,
    cursor: 'pointer'
  } as React.CSSProperties

  const selectedTagLabelStyle = {
    ...tagLabelStyle,
    backgroundColor: designTokens.color.secondary,
    color: 'white'
  } as React.CSSProperties

  const handleKeyDownzipCode = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(event.key === 'Backspace' || event.key === 'ArrowLeft'
      || event.key === 'ArrowRight' || (event.key >= '0' && event.key <= '9'))
    ) {
      event.preventDefault()
    }
  }

  const handleChangeZipCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedZipCode = maskZipCode(event.target.value)
    setValue('zipCode', maskedZipCode)

    if (maskedZipCode.length === 9) {
      const zipCode = maskedZipCode.replace('-', '')
      axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then(response => {
          const { logradouro, bairro, localidade } = response.data
          setValue('street', logradouro)
          setValue('district', bairro)
          setValue('city', localidade)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  const maskZipCode = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d{1,3})/, '$1-$2')
      .replace(/(\d{5}-\d{3}).*/, '$1')
  }

  const handleSendAddress = () => {
    if (!user) return
    const data = {
      zipCode: watch('zipCode'),
      street: watch('street'),
      number: watch('number'),
      district: watch('district'),
      city: watch('city'),
      tag: watch('tag')
    }

    if (update) {
      if (id) {
        const notification = toast.loading('Atualizando endereço...')
        updateAddress(id, {
          cep: data.zipCode,
          rua: data.street,
          numero: data.number,
          bairro: data.district,
          cidade: data.city,
          tipoEndereco: data.tag,
          idUsuario: user?.id,
          usuarioId: user?.id
        }).then(() => {
          toast.update(notification, {
            render: 'Endereço atualizado com sucesso!',
            type: 'success',
            autoClose: 2000
          })
        }).catch(() => {
          toast.update(notification, {
            render: 'Erro ao atualizar endereço!',
            type: 'error',
            autoClose: 2000
          })
        }).finally(() => {
          setTimeout(() => {
            toast.dismiss(notification)
          }, 3000)
        })
      }
    } else {
      const notification = toast.loading('Adicionando endereço...')
      createAddress({
        cep: data.zipCode,
        rua: data.street,
        numero: data.number,
        bairro: data.district,
        cidade: data.city,
        idUsuario: user?.id,
        usuarioId: user?.id,
        tipoEndereco: data.tag || 'Outro'
      }).then(() => {
        toast.update(notification, {
          render: 'Endereço adicionado com sucesso!',
          type: 'success',
          autoClose: 2000
        })
      }).catch(() => {
        toast.update(notification, {
          render: 'Erro ao adicionar endereço!',
          type: 'error',
          autoClose: 2000
        })
      }).finally(() => {
        setTimeout(() => {
          toast.dismiss(notification)
        }, 3000)
      })
    }
    updateAddresses && updateAddresses()
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: `calc(100% - ${designTokens.spacing.mediumLarge} * 2)`,
      height: `calc(100% - ${designTokens.spacing.medium} * 2)`,
      padding: `${designTokens.spacing.medium} ${designTokens.spacing.mediumLarge}`,
      backgroundColor: 'white',
      borderRadius: designTokens.borderRadius.large,
      boxShadow: `0px 4px 13.9px 0px ${designTokens.color.boxShadow}`,
      gap: designTokens.spacing.medium,
    }}>
      <h1 style={{
        fontSize: designTokens.font.size.large,
        fontWeight: designTokens.font.weight.bold,
        margin: 0,
      }}>{update ? <>Atualizar Endereço</> : <>Adicionar Endereço</>}</h1>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: designTokens.spacing.tiny,
        justifyContent: 'space-between',
        flex: 1,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing.tiny
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <label htmlFor='zipCode' style={{
              fontSize: designTokens.font.size.smallMedium
            }}>CEP</label>
            <input
              type='text'
              id='zipCode'
              {...register('zipCode', { required: true, onChange: handleChangeZipCode })}
              style={{
                padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                borderRadius: designTokens.borderRadius.medium,
                border: `1px solid ${designTokens.color.border}`,
                outline: 'none',
                fontSize: designTokens.font.size.medium,
                height: '22px',
                width: `calc(30% - ${designTokens.spacing.mediumLarge} * 2)`,
              }}
              onKeyDown={handleKeyDownzipCode}
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: designTokens.spacing.medium,
              width: `calc(70% - ${designTokens.spacing.medium})`,
            }}>
              <label htmlFor='street' style={{
                fontSize: designTokens.font.size.smallMedium
              }}>Rua</label>
              <input
                type='text'
                id='street'
                {...register('street', { required: true })}
                style={{
                  padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                  borderRadius: designTokens.borderRadius.medium,
                  border: `1px solid ${designTokens.color.border}`,
                  outline: 'none',
                  fontSize: designTokens.font.size.medium,
                  height: '22px',
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '30%',
            }}>
              <label htmlFor='number' style={{
                fontSize: designTokens.font.size.smallMedium
              }}>Número</label>
              <input
                type='text'
                id='number'
                {...register('number', { required: true })}
                style={{
                  padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                  borderRadius: designTokens.borderRadius.medium,
                  border: `1px solid ${designTokens.color.border}`,
                  outline: 'none',
                  fontSize: designTokens.font.size.medium,
                  height: '22px',
                }}
              />
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: designTokens.spacing.medium,
              width: `calc(50% - ${designTokens.spacing.medium})`,
            }}>
              <label htmlFor='district' style={{
                fontSize: designTokens.font.size.smallMedium
              }}>Bairro</label>
              <input
                type='text'
                id='district'
                {...register('district', { required: true })}
                style={{
                  padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                  borderRadius: designTokens.borderRadius.medium,
                  border: `1px solid ${designTokens.color.border}`,
                  outline: 'none',
                  fontSize: designTokens.font.size.medium,
                  height: '22px',
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
            }}>
              <label htmlFor='city' style={{
                fontSize: designTokens.font.size.smallMedium
              }}>Cidade</label>
              <input
                type='text'
                id='city'
                {...register('city', { required: true })}
                style={{
                  padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                  borderRadius: designTokens.borderRadius.medium,
                  border: `1px solid ${designTokens.color.border}`,
                  outline: 'none',
                  fontSize: designTokens.font.size.medium,
                  height: '22px',
                }}
              />
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing.tiny
        }}>
          <label style={{
            fontSize: designTokens.font.size.smallMedium
          }}>Etiqueta (opcional)</label>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: designTokens.spacing.small

          }}>
            <input
              id='home'
              type='radio'
              style={{ display: 'none' }}
              value='Casa'
              {...register('tag', { required: true })}
            />
            <input
              id='partner'
              type='radio'
              style={{ display: 'none' }}
              value='Parceiro(a)'
              {...register('tag', { required: true })}
            />
            <input
              id='work'
              type='radio'
              style={{ display: 'none' }}
              value='Trabalho'
              {...register('tag', { required: true })}
            />
            <input
              id='college'
              type='radio'
              style={{ display: 'none' }}
              value='Faculdade'
              {...register('tag', { required: true })}
            />
            <input
              id='other'
              type='radio'
              style={{ display: 'none' }}
              value='Outro'
              {...register('tag', { required: true })}
            />

            <label htmlFor='home' style={watch('tag') === 'Casa' ? selectedTagLabelStyle : tagLabelStyle}>
              <BiHomeAlt2 size={'18px'} style={{ marginTop: '-2px' }} /> Casa
            </label>
            <label htmlFor='partner' style={watch('tag') === 'Parceiro(a)' ? selectedTagLabelStyle : tagLabelStyle}>
              <BiHomeHeart size={'18px'} style={{ marginTop: '-2px' }} /> Parceiro(a)
            </label>
            <label htmlFor='work' style={watch('tag') === 'Trabalho' ? selectedTagLabelStyle : tagLabelStyle}>
              <PiSuitcaseSimple size={'18px'} /> Trabalho
            </label>
            <label htmlFor='college' style={watch('tag') === 'Faculdade' ? selectedTagLabelStyle : tagLabelStyle}>
              <IoSchoolOutline size={'18px'} /> Faculdade
            </label>
            <label htmlFor='other' style={watch('tag') === 'Outro' ? selectedTagLabelStyle : tagLabelStyle}>
              Outro
            </label>
          </div>
        </div>
        <div style={{
          marginTop: designTokens.spacing.medium,
          display: 'flex',
          width: '100%',
        }}>
          <Button label={update ? 'Atualizar' : 'Adicionar'} type='primary' onClick={handleSendAddress} />
        </div>
      </form>
    </div>
  )
}
