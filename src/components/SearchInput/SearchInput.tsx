import { designTokens } from 'design-tokens'
import { IoSearchSharp } from 'react-icons/io5'

export function SearchInput() {
  return (
    <div style={{
      display: 'flex',
      width: '35%',
      minWidth: '200px',
      alignItems: 'center',
      backgroundColor: 'white',
      border: `1px solid ${designTokens.color.border}`,
      borderRadius: designTokens.borderRadius.medium,
      padding: designTokens.spacing.small,
    }}>
      <IoSearchSharp size={20} style={{
        color: designTokens.color.gray,
      }} />
      <input style={{
        border: 'none',
        outline: 'none',
        marginLeft: designTokens.spacing.small,
        width: '100%',
      }} />
    </div>
  )
}
