export type IAgoTextProps = {
  text?: string
}

export function IAgoText(props: IAgoTextProps) {
  const { text } = props

  const generateHtmlFromText = (text: string) => {
    let html = text;

    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>');
    html = html.replace(/\*(.*?)\*/gim, '<i>$1</i>');
    html = html.replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    html = html.replace(/\n$/gim, '<br />');
    html = html.replace(/^\n/gim, '<p>');
    html = html.replace(/^\*\s(.*$)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\n<ul>/gim, '\n');
    html = html.replace(/^\d+\.\s(.*$)/gim, '<ol><li>$1</li></ol>');
    html = html.replace(/<\/ol>\n<ol>/gim, '\n');

    return html.trim();
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: text ? generateHtmlFromText(text) : "" }} />
  )
}
