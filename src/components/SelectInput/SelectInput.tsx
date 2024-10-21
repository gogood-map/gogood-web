import { designTokens } from 'design-tokens'
import { UseFormRegisterReturn } from 'react-hook-form'

export type SelectInputProps = {
  label: string
  options: string[]
  register: UseFormRegisterReturn<string>
  value?: string
  disabled?: boolean
}

export function SelectInput(props: SelectInputProps) {
  const { label, options, register, value, disabled } = props

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <label htmlFor={label}>
        {label}
      </label>
      <select
        id={label}
        {...register}
        defaultValue={value}
        disabled={disabled}
        style={{
          padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
          borderRadius: designTokens.borderRadius.medium,
          border: `1px solid ${designTokens.color.border}`,
          outline: 'none',
          fontSize: designTokens.font.size.medium,
          height: '42px',
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
