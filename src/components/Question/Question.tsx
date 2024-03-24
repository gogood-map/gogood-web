import { designTokens } from 'design-tokens'
import { FocusEvent, useState } from 'react'
import styled from 'styled-components'

export type QuestionProps = {
    title: string
    placeholder?: string
    type: 'FreeText' | 'SingleChoice' | 'MultipleChoice'
    inputType?: 'text' | 'email' | 'password' | 'number'
    value?: string | string[]
    error?: boolean
    helperText?: string
    required?: boolean
    options?: {
        label: string
        openField: boolean
    }[]
    onChange: (value: string | string[]) => void
    onBlur: (event: FocusEvent<HTMLInputElement>) => void
}

export function Question(props: QuestionProps) {
    const { title, placeholder, type, value, error, helperText, required, options, onChange, onBlur } = props
    const [currentValue, setCurrentValue] = useState(value)

    const RatioInput = styled.input.attrs({ type: 'radio' })`
        appearance: none;
        accent-color: ${designTokens.color.primary};
        border-radius: 50%;
        border: 1px solid ${designTokens.color.border};
        width: ${designTokens.spacing.medium};
        height: ${designTokens.spacing.medium};

        &:checked {
            background-color: ${designTokens.color.primary};
        }
    `

    const [wasTouched, setWasTouched] = useState(false)

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }}>
            <div style={{
                color: designTokens.color.text,
                fontSize: designTokens.font.size.medium,
                marginBottom: designTokens.spacing.tiny,
            }}>
                {title}
                {required && (
                    <span>*</span>
                )}
            </div>
            {type === 'FreeText' && (
                <>
                    <input
                        style={{
                            padding: `${designTokens.spacing.small} ${designTokens.spacing.medium}`,
                            borderRadius: designTokens.borderRadius.medium,
                            border: `1px solid ${designTokens.color.secondary}`,
                            outline: 'none',
                            fontSize: designTokens.font.size.medium,
                            height: '35px'
                        }}
                        type='text'
                        placeholder={placeholder}
                        value={currentValue}
                        onChange={(event) => {
                            setCurrentValue(event.target.value)
                            onChange(event.target.value)
                        }}
                        onBlur={onBlur}
                        onFocus={() => setWasTouched(true)}
                    />
                    {wasTouched && error && <span style={{
                        fontSize: designTokens.font.size.small,
                        color: error ? 'red' : designTokens.color.text,
                    }}>{helperText}</span>}
                </>
            )}
            {type === 'SingleChoice' && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: designTokens.spacing.tiny,
                    marginTop: designTokens.spacing.small,
                }}>
                    {options?.map((option, index) => (
                        <label key={index} style={{
                            display: 'flex',
                            gap: designTokens.spacing.medium,
                            alignItems: 'center',
                            color: designTokens.color.text,
                        }}>
                            <RatioInput
                                type='radio'
                                value={option.label}
                                checked={currentValue === option.label}
                                onChange={() => {
                                    setCurrentValue(option.label)
                                    onChange(option.label)
                                }}
                                onBlur={onBlur}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
            {type === 'MultipleChoice' && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: designTokens.spacing.tiny,
                    marginTop: designTokens.spacing.small,
                }}>
                    {options?.map((option, index) => (
                        <label key={index} style={{
                            display: 'flex',
                            gap: designTokens.spacing.medium,
                            alignItems: 'center',
                            color: designTokens.color.text,
                        }}>
                            <input style={{
                                accentColor: designTokens.color.primary,
                                borderRadius: designTokens.borderRadius.small,
                                border: `1px solid ${designTokens.color.border}`,
                                width: designTokens.spacing.medium,
                                height: designTokens.spacing.medium,
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                                type='checkbox' 
                                value={option.label} 
                                checked={currentValue?.includes(option.label)}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        setCurrentValue([...(currentValue as string[]), option.label])
                                        onChange([...(currentValue as string[]), option.label])
                                    } else {
                                        setCurrentValue((currentValue as string[]).filter((value) => value !== option.label))
                                        onChange((currentValue as string[]).filter((value) => value !== option.label))
                                    }
                                }}
                                onBlur={onBlur}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}



        </div>
    )
}