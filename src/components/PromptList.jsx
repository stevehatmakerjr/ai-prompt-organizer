import React from 'react'
import { Link } from 'react-router-dom'

export default function PromptList({ items, onDelete }){
  if(items.length === 0){
    return <p className="text-sm opacity-70">No prompts found. Try adding one or clearing filters.</p>
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map(item => (
        <article key={item.id} className="border rounded p-4 flex flex-col gap-2">
          <header className="flex items-center gap-2">
            <h3 className="font-semibold flex-1">{item.title}</h3>
            <Link className="text-sm underline" to={`/edit/${item.id}`}>Edit</Link>
            <button className="text-sm underline" onClick={()=>onDelete(item.id)}>Delete</button>
          </header>
          <p className="text-sm whitespace-pre-wrap">{item.prompt}</p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {item.tags.map(t => <span key={t} className="text-xs border px-2 py-0.5 rounded">{t}</span>)}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}