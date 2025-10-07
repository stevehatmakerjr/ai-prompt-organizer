import React from 'react'
import { toMarkdown, toJSONDownload } from '../utils/export.js'

export default function ExportButton({ prompts }){
  return (
    <div className="flex items-center gap-2">
      <button className="px-3 py-2 border rounded text-sm" onClick={()=>toJSONDownload(prompts)}>
        Export JSON
      </button>
      <button className="px-3 py-2 border rounded text-sm" onClick={()=>toMarkdown(prompts)}>
        Export Markdown
      </button>
    </div>
  )
}