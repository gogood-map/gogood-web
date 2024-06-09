import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { getIAResponse } from "../../utils/requests/iago";
import { useState } from "react";
import { designTokens } from "design-tokens";

export function IAgo() {
  const [response, setResponse] = useState<string>('')
  const { register, watch } = useForm({ mode: 'onSubmit' })

  function generateHtmlFromText(text: string): string {
    const sections = text.split(/(?=##)/);

    return sections.map(section => {
      const [title, ...contentLines] = section.split('\n').filter(line => line.trim() !== '');

      const titleHtml = `<h2>${title.replace('##', '').trim()}</h2>`;

      const contentHtml = contentLines.map(line => {
        if (line.startsWith('**')) {
          return `<strong>${line.replace('**', '').replace('**', '').trim()}</strong>`;
        }
        return `<p>${line.trim()}</p>`;
      }).join('');



      return `<section>${titleHtml}${contentHtml}</section>`;
    }).join('');
  }

  const handleClick = () => {
    getIAResponse(watch('prompt')).then(response => {
      const formatedResponse = generateHtmlFromText(response.data)
      setResponse(formatedResponse)
    }).catch(error => {
      console.error('Erro ao fazer requisição', error)
    })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: '60px',
      width: `calc(100% - 60px - (${designTokens.spacing.medium} *2))`,
      gap: designTokens.spacing.medium,
      padding: designTokens.spacing.medium,
    }}>
      <h1 style={{
        margin: 0,
      }}>IAgo</h1>
      <Input label="Prompt" register={{
        ...register('prompt', {
          required: 'Campo obrigatório',
        })
      }} />
      <Button label="Enviar" onClick={handleClick} type="solid" />
      <div style={{

      }} dangerouslySetInnerHTML={{ __html: response }}>
      </div>
    </div>
  )
}
