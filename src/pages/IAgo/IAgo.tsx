import { useForm } from "react-hook-form"
import { Input } from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import { getIAResponse } from "../../utils/requests/iago"
import { useState } from "react"
import { designTokens } from "design-tokens"
import { IAgoText } from "./components/IAgoText/IAgo"
import { toast } from "react-toastify"

export function IAgo() {
  const [response, setResponse] = useState<string>('')
  const { register, watch } = useForm({ mode: 'onSubmit' })

  const handleClick = () => {
    const notification = toast.loading('Carregando...', { autoClose: false })
    getIAResponse(watch('prompt')).then(response => {
      toast.update(notification, {
        render: 'Resposta carregada',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      setResponse(response.data.response)
    }).catch(error => {
      toast.update(notification, {
        render: 'Erro ao carregar resposta',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
      console.error('Erro ao fazer requisição', error)
    }).finally(() => {
      setTimeout(() => {
        toast.dismiss(notification)
      }, 3000)
    })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: '60px',
      width: `calc(100% - 60px - (${designTokens.spacing.large} *2))`,
      gap: designTokens.spacing.medium,
      padding: `${designTokens.spacing.medium} ${designTokens.spacing.large}`,
    }}>
      <h1 style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,
      }}>IAgo
      <span style={{
        backgroundColor: designTokens.color.selected,
        marginLeft: designTokens.spacing.small,
        padding: `0 ${designTokens.spacing.tiny}`,
        color: 'white',
        fontSize: designTokens.font.size.small
      }}>
        BETA
      </span>
      </h1>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        gap: designTokens.spacing.medium,
      }}>
        <Input label="Pergunte algo para o IAgo" register={{
          ...register('prompt', {
            required: 'Campo obrigatório',
          })
        }} />
        <div>
          <Button label="Enviar" onClick={handleClick} type="solid" />
        </div>
      </div>
      <IAgoText text={response} />
    </div>
  )
}
