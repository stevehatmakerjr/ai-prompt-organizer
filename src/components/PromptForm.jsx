import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PromptForm({ prompts = [], onSave }){
  const { id } = useParams()
  const nav = useNavigate()
  const editing = Boolean(id)
  const existing = prompts.find(p => p.id === id)

  const [title, setTitle] = useState(existing?.title || '')
  const [prompt, setPrompt] = useState(existing?.prompt || '')
  const [tags, setTags] = useState((existing?.tags || []).join(', '))

  useEffect(()=>{
    if(editing && !existing){
      // if direct load w/o state, show blank (user can navigate back)
    }
  }, [editing, existing])

  return (
    <form className="max-w-2xl space-y-4" onSubmit={(e)=>{
      e.preventDefault()
      const cleanedTags = tags.split(',').map(t => t.trim()).filter(Boolean)
      const payload = editing ? { ...existing, title, prompt, tags: cleanedTags } : { title, prompt, tags: cleanedTags }
      onSave(payload)
      nav('/')
    }}>
      <h2 className="text-xl font-semibold">{editing ? 'Edit Prompt' : 'Add Prompt'}</h2>
      <div className="space-y-1">
        <label className="text-sm">Title</label>
        <input className="w-full border rounded px-3 py-2 bg-transparent" value={title} onChange={e=>setTitle(e.target.value)} required />
      </div>
      <div className="space-y-1">
        <label className="text-sm">Prompt</label>
        <textarea className="w-full border rounded px-3 py-2 bg-transparent min-h-[160px]" value={prompt} onChange={e=>setPrompt(e.target.value)} required />
      </div>
      <div className="space-y-1">
        <label className="text-sm">Tags (comma‑separated)</label>
        <input className="w-full border rounded px-3 py-2 bg-transparent" value={tags} onChange={e=>setTags(e.target.value)} placeholder="chatgpt, writing, code" />
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-2 border rounded" type="submit">{editing ? 'Save Changes' : 'Add Prompt'}</button>
        <button className="px-3 py-2 border rounded" type="button" onClick={()=>nav(-1)}>Cancel</button>
      </div>
    </form>
  )
}