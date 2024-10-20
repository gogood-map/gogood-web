import { designTokens } from 'design-tokens'
import { UseFormRegisterReturn } from 'react-hook-form'

export type InputProps = {
  label: string
  type?: 'text' | 'password' | 'email' | 'date'
  register: UseFormRegisterReturn<string>
  value?: string
  disabled?: boolean
}

export function Input(props: InputProps) {
  const { label, type, register, value, disabled } = props

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}>
      <label htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        {...register}
        defaultValue={value}
        disabled={disabled}
        type={type || 'text'}
        style={{
          padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
          borderRadius: designTokens.borderRadius.medium,
          border: `1px solid ${designTokens.color.border}`,
          outline: 'none',
          fontSize: designTokens.font.size.medium,
          height: '24px',
        }}
      />
    </div>
  )
}
