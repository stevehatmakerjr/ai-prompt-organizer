import React from 'react'

export default function TagFilter({ allTags, selected, onChange }){
  const toggle = (t)=>{
    if(selected.includes(t)) onChange(selected.filter(x=>x!==t))
    else onChange([...selected, t])
  }
  if(allTags.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map(t => (
        <button key={t} className={`px-2 py-1 border rounded text-xs ${selected.includes(t) ? '' : ''}`} onClick={()=>toggle(t)}>
          {t}{selected.includes(t) ? ' ✓' : ''}
        </button>
      ))}
    </div>
  )
}