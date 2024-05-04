import { designTokens } from 'design-tokens'
import { useForm } from 'react-hook-form'
import { BiHomeAlt2, BiHomeHeart } from 'react-icons/bi'
import { PiSuitcaseSimple } from 'react-icons/pi'

export function AddressForm() {
  const { register, watch } = useForm()

  const tagLabelStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: designTokens.spacing.tiny,
    padding: designTokens.spacing.small,
    borderRadius: designTokens.borderRadius.medium,
    border: `1px solid ${designTokens.color.border}`,
    cursor: 'pointer'
  } as React.CSSProperties

  const selectedTagLabelStyle = {
    ...tagLabelStyle,
    backgroundColor: designTokens.color.secondary,
    color: 'white'
  } as React.CSSProperties

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: `calc(100% - ${designTokens.spacing.medium} * 2)`,
      height: `calc(100% - ${designTokens.spacing.medium} * 2)`,
      padding: designTokens.spacing.medium,
      backgroundColor: 'white',
      borderRadius: designTokens.borderRadius.large,
      boxShadow: `0px 4px 13.9px 0px ${designTokens.color.boxShadow}`,
    }}>
      <h1 style={{
        fontSize: designTokens.font.size.large,
        fontWeight: designTokens.font.weight.bold,
        margin: 0,
        marginLeft: designTokens.spacing.small
      }}>Adicionar endereços</h1>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: designTokens.spacing.medium,
        flex: 1,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing.tiny
        }}>
          <label htmlFor='address'>Endereço</label>
          <input
            type='text'
            id='address'
            {...register('address', { required: true })}
            style={{
              padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
              borderRadius: designTokens.borderRadius.medium,
              border: `1px solid ${designTokens.color.border}`,
              outline: 'none',
              fontSize: designTokens.font.size.medium,
              height: '25px',
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing.tiny
        }}>
          <label>Etiqueta (opcional)</label>
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
              id='work'
              type='radio'
              style={{ display: 'none' }}
              value='work'
              {...register('tag', { required: true })}
            />
            <input
              id='partner'
              type='radio'
              style={{ display: 'none' }}
              value='partner'
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
          </div>
        </div>
      </form>
    </div>
  )
}
