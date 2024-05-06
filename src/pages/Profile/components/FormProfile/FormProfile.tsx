import { designTokens } from 'design-tokens'
import { RiAccountCircleLine } from 'react-icons/ri'

export const FormProfile = () => {
  const textInputStyle = {
    padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
    borderRadius: designTokens.borderRadius.medium,
    border: `1px solid ${designTokens.color.border}`,
    outline: 'none',
    fontSize: designTokens.font.size.medium,
    height: '25px',
  }
  const selectInputStyle = {
    padding: `${designTokens.spacing.small} 0px ${designTokens.spacing.small} ${designTokens.spacing.medium}`,
    borderRadius: designTokens.borderRadius.medium,
    border: `1px solid ${designTokens.color.border}`,
    outline: 'none',
    fontSize: designTokens.font.size.medium,
    height: '42.6px',
  }
  const groupLabelInputStyle = {
    display: 'flex',
    flexDirection: 'column',
  }


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      boxShadow: `0px 4px 13.9px 0px ${designTokens.color.boxShadow}`,
      width: `calc(100% - ${designTokens.spacing.large} * 3)`,
      height: `calc(100% - ${designTokens.spacing.large} * 2)`,
      marginRight: designTokens.spacing.large,
      padding: designTokens.spacing.large,
      borderRadius: designTokens.borderRadius.large
    }}>
      <span style={{
        fontFamily: designTokens.font.family,
        fontSize: designTokens.font.size.large,
        fontWeight: designTokens.font.weight.medium,
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }}><RiAccountCircleLine size={40} /> Detalhes da Conta</span>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px 24px',
          gap: 22
        }}
      >
        <section>
          <div style={{
            width: 100,
            height: 100,
            backgroundSize: 'cover',
            borderRadius: 100,
            backgroundImage: 'url(https://pbs.twimg.com/profile_images/1681409436441620480/TLxv4-aY_400x400.jpg)'
          }}></div>
        </section>

        <section style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <div style={groupLabelInputStyle as React.CSSProperties}>
            <label style={{ flexDirection: 'column' }}>Nome</label>
            <input placeholder='Manoel Gomes' style={textInputStyle} type='text' />
          </div>

          <div style={groupLabelInputStyle as React.CSSProperties}>
            <label>Endereço</label>
            <input placeholder='Rua Manoel Gomes' style={textInputStyle} type='text' />
          </div>

          <div style={groupLabelInputStyle as React.CSSProperties}>
            <label>Gênero</label>
            <select style={selectInputStyle}>
              <option style={{ fontSize: 16 }} value='F'>Feminino</option>
              <option style={{ fontSize: 16 }} value='M'>Masculino</option>
              <option style={{ fontSize: 16 }} value='O'>Outros</option>
              <option style={{ fontSize: 16 }} value='O'>Prefiro não dizer</option>
            </select>
          </div>

          <div style={groupLabelInputStyle as React.CSSProperties}>
            <label>Data de Nascimento</label>
            <input placeholder='02/11/1969' style={textInputStyle} type='date' />
          </div>


          <button style={{
            width: 140,
            height: 50,
            fontFamily: designTokens.font.family,
            fontWeight: designTokens.font.weight.semiBold,
            cursor: 'pointer',
            border: 'none',
            color: designTokens.color.white,
            backgroundColor: 'rgba(191, 191, 191, 1)',
            alignSelf: 'flex-end',
            borderRadius: designTokens.borderRadius.large
          }}>
            Salvar
          </button>
        </section>
      </form>
    </div>
  )
}
