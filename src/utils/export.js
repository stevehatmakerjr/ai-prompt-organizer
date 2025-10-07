function download(filename, text){
  const blob = new Blob([text], {type: 'text/plain'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function toJSONDownload(prompts){
  download('prompts.json', JSON.stringify(prompts, null, 2))
}

export function toMarkdown(prompts){
  const lines = ['# AI Prompt Organizer Export','']
  for(const p of prompts){
    lines.push(`## ${p.title}`)
    const tagLine = (p.tags && p.tags.length) ? `**Tags:** ${p.tags.join(', ')}` : '**Tags:** —'
    lines.push(tagLine + '  ')
    lines.push('Prompt:  ')
    lines.push('> ' + (p.prompt || '').replace(/\n/g, '\n> '))
    lines.push('\n---\n')
  }
  download('prompts.md', lines.join('\n'))
}
