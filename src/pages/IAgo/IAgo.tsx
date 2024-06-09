import { useForm } from "react-hook-form"
import { Input } from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import { getIAResponse } from "../../utils/requests/iago"
import { useState } from "react"
import { designTokens } from "design-tokens"

export function IAgo() {
  const [response, setResponse] = useState<string>('')
  const { register, watch } = useForm({ mode: 'onSubmit' })

  function generateHtmlFromText(text: string): string {
    const sections = text.split(/(?=##)/);

    return sections.map(section => {
      const [title, ...contentLines] = section.split('\n').filter(line => line.trim() !== '');


      // considera que pode ter negrito no título
      const titleHtml = `<h2>${title.replace('**', '<strong>').replace('**', '</strong>').trim()}</h2>`;

      const ordenedListItens: number[] = []

      const contentLinesHtml = contentLines.map((line, index) => {
        if (/^\d+\.\s/.test(line)) {
          ordenedListItens.push(index);
          return `<li>${line.replace(/^\d+\.\s/, '').replace('**', '<strong>').replace('**', '</strong>').trim()}</li>`;
        } else if (/^\*\s/.test(line)) {
          return `<li>${line.replace('**', '<strong>').replace('**', '</strong>').replace(/^\*\s/, '').trim()}</li>`;
        } else if (line.startsWith('**')) {
          return `<strong>${line.replace('**', '').replace('**', '').trim()}</strong>`;
        }

        // considera que todo o texto pode conter negrito
        return `<p>${line.replace('**', '<strong>').replace('**', '</strong>').trim()}</p>`;
      });

      console.log(contentLinesHtml);

      let wrappedContentHtml = contentLinesHtml.join('');
      wrappedContentHtml = wrappedContentHtml.replace(/(<li>.*?<\/li>)+/g, match => {
        const isOrderedList = ordenedListItens.includes(contentLinesHtml.indexOf(match.split('</li>')[0] + '</li>'));
        return isOrderedList ? `<ol>${match}</ol>` : `<ul>${match}</ul>`;
      });

      return `<section>${titleHtml}${wrappedContentHtml}</section>`;
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
      width: `calc(100% - 60px - (${designTokens.spacing.large} *2))`,
      gap: designTokens.spacing.medium,
      padding: `${designTokens.spacing.medium} ${designTokens.spacing.large}`,
    }}>
      <h1 style={{
        margin: 0,
      }}>IAgo</h1>
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
      <div style={{

      }} dangerouslySetInnerHTML={{ __html: response }}>
      </div>
    </div>
  )
}
