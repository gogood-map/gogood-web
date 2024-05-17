import { designTokens } from 'design-tokens'
import { useForm } from 'react-hook-form'
import { BiHomeAlt2, BiHomeHeart } from 'react-icons/bi'
import { IoSchoolOutline } from 'react-icons/io5'
import { PiSuitcaseSimple } from 'react-icons/pi'
import { Button } from '../../../../components/Button/Button'
import { useState } from 'react'
import axios from 'axios'

export type AddressFormProps = {
  cep?: string
  street?: string
  number?: string
  district?: string
  city?: string
  tag?: string
}

export function AddressForm(props: AddressFormProps) {
  const { cep, street, number, district, city, tag } = props
  const { register, watch, setValue } = useForm()
  const [form, setForm] = useState({
    cep: cep || '',
    street: street || '',
    number: number || '',
    district: district || '',
    city: city || '',
    tag: tag || ''
  })

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

  const handleKeyDownCep = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(event.key === 'Backspace' || event.key === 'ArrowLeft'
      || event.key === 'ArrowRight' || (event.key >= '0' && event.key <= '9'))
    ) {
      event.preventDefault()
    }
  }

  const handleChangeCep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCep = maskCep(event.target.value)
    setForm({ ...form, cep: maskedCep })

    if (maskedCep.length === 9) {
      const cep = maskedCep.replace('-', '')
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
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

  const maskCep = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d{1,3})/, '$1-$2')
      .replace(/(\d{5}-\d{3}).*/, '$1')
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
      }}>Adicionar endereços</h1>
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
            <label htmlFor='cep' style={{
              fontSize: designTokens.font.size.smallMedium
            }}>CEP</label>
            <input
              type='text'
              id='cep'
              {...register('cep', { required: true, onChange: handleChangeCep })}
              style={{
                padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                borderRadius: designTokens.borderRadius.medium,
                border: `1px solid ${designTokens.color.border}`,
                outline: 'none',
                fontSize: designTokens.font.size.medium,
                height: '22px',
                width: `calc(30% - ${designTokens.spacing.mediumLarge} * 2)`,
              }}
              value={form.cep}
              onKeyDown={handleKeyDownCep}
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
                {...register('number', { required: true,  })}
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
          }} >Etiqueta (opcional)</label>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: designTokens.spacing.small

          }}>
            <input
              id='home'
              type='radio'
              style={{ display: 'none' }}
              value='home'
              {...register('tag', { required: true })}
            />
            <input
              id='partner'
              type='radio'
              style={{ display: 'none' }}
              value='partner'
              {...register('tag', { required: true })}
            />
            <input
              id='work'
              type='radio'
              style={{ display: 'none' }}
              value='work'
              {...register('tag', { required: true })}
            />
            <input
              id='school'
              type='radio'
              style={{ display: 'none' }}
              value='school'
              {...register('tag', { required: true })}
            />
            <input
              id='other'
              type='radio'
              style={{ display: 'none' }}
              value='other'
              {...register('tag', { required: true })}
            />

            <label htmlFor='home' style={watch('tag') === 'home' ? selectedTagLabelStyle : tagLabelStyle}>
              <BiHomeAlt2 size={'18px'} style={{ marginTop: '-2px' }} /> Casa
            </label>
            <label htmlFor='partner' style={watch('tag') === 'partner' ? selectedTagLabelStyle : tagLabelStyle}>
              <BiHomeHeart size={'18px'} style={{ marginTop: '-2px' }} /> Parceiro(a)
            </label>
            <label htmlFor='work' style={watch('tag') === 'work' ? selectedTagLabelStyle : tagLabelStyle}>
              <PiSuitcaseSimple size={'18px'} /> Trabalho
            </label>
            <label htmlFor='school' style={watch('tag') === 'school' ? selectedTagLabelStyle : tagLabelStyle}>
              <IoSchoolOutline size={'18px'} /> Faculdade
            </label>
            <label htmlFor='other' style={watch('tag') === 'other' ? selectedTagLabelStyle : tagLabelStyle}>
              Outro
            </label>
          </div>
        </div>
        <div style={{
          marginTop: designTokens.spacing.medium,
          display: 'flex',
          width: '100%',
        }}>
          <Button label='Adicionar' type='primary' onClick={() => {
            console.table(
              {
                cep: watch('cep'),
                street: watch('street'),
                number: watch('number'),
                district: watch('district'),
                city: watch('city'),
                tag: watch('tag')
              }
            )
          }} />
        </div>
      </form>
    </div>
  )
}
