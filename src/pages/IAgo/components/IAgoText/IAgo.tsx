import ReactMarkdown from 'react-markdown'

export type IAgoTextProps = {
  text?: string
}

export function IAgoText(props: IAgoTextProps) {
  const { text } = props

  return (
    <div>
      {text ? <ReactMarkdown>{text}</ReactMarkdown> : ''}
    </div>
  )
}