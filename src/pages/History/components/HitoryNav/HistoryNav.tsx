import { designTokens } from 'design-tokens'
import { RiFilter3Line } from 'react-icons/ri'
import { SearchInput } from '../../../../components/SearchInput/SearchInput'

export function HistoryNav() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: designTokens.spacing.medium,
      borderBottom: `1px solid ${designTokens.color.border}`,
      marginLeft: '60px',
      height: '40px',
    }}>
      <h2 style={{
        fontSize: designTokens.font.size.large,
        fontWeight: designTokens.font.weight.semiBold,
      }}>Histórico</h2>

      <SearchInput />

      <button style={{
        backgroundColor: designTokens.color.background,
        border: 'none',
        padding: 0,
        cursor: 'pointer',
      }}>
        <RiFilter3Line size={'28px'} />
      </button>
    </nav>
  )
}
