import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import PromptList from './components/PromptList.jsx'
import PromptForm from './components/PromptForm.jsx'
import ExportButton from './components/ExportButton.jsx'
import ImportButton from './components/ImportButton.jsx'
import TagFilter from './components/TagFilter.jsx'
import SearchBar from './components/SearchBar.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Footer from './components/Footer.jsx'
import Privacy from './components/Privacy.jsx'
import Terms from './components/Terms.jsx'

import { loadPrompts, savePrompts, samplePrompts } from './utils/storage.js'

function Layout({ children }){
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="font-semibold tracking-tight text-lg">AI Prompt Organizer</Link>
          <nav className="ml-auto flex items-center gap-3 text-sm">
            <Link className="hover:underline" to="/">Library</Link>
            <Link className="hover:underline" to="/add">Add</Link>
            <Link className="hover:underline" to="/about">About</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default function App(){
  const [prompts, setPrompts] = useState([])
  const [query, setQuery] = useState('')
  const [activeTags, setActiveTags] = useState([])

  useEffect(() => {
    const data = loadPrompts()
    if(!data || data.length === 0){
      savePrompts(samplePrompts)
      setPrompts(samplePrompts)
    } else {
      setPrompts(data)
    }
  }, [])

  const allTags = Array.from(new Set(prompts.flatMap(p => p.tags || []))).sort()

  const filtered = prompts.filter(p => {
    const matchesText = (p.title + ' ' + p.prompt).toLowerCase().includes(query.toLowerCase())
    const matchesTags = activeTags.length === 0 || (p.tags || []).some(t => activeTags.includes(t))
    return matchesText && matchesTags
  })

  const onSave = (newPrompt) => {
    let updated
    if(newPrompt.id){
      updated = prompts.map(p => p.id === newPrompt.id ? newPrompt : p)
    } else {
      const id = crypto.randomUUID()
      updated = [{...newPrompt, id}, ...prompts]
    }
    setPrompts(updated)
    savePrompts(updated)
  }

  const onDelete = (id) => {
    const updated = prompts.filter(p => p.id !== id)
    setPrompts(updated)
    savePrompts(updated)
  }

  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <SearchBar value={query} onChange={setQuery} />
            <TagFilter allTags={allTags} selected={activeTags} onChange={setActiveTags} />
            <ExportButton prompts={filtered} />
            <ImportButton onImport={(incoming)=>{
              const merged = [...prompts]
              for(const item of incoming){
                // re-key duplicates
                const exists = merged.find(p => p.id === item.id)
                const safeItem = exists ? { ...item, id: crypto.randomUUID() } : item
                merged.push(safeItem)
              }
              setPrompts(merged)
              savePrompts(merged)
            }} />
            <Link to="/add" className="ml-auto px-3 py-2 border rounded text-sm">+ Add Prompt</Link>
          </div>
          <PromptList items={filtered} onDelete={onDelete} />
        </Layout>
      } />
      <Route path="/add" element={<Layout><PromptForm onSave={onSave} /></Layout>} />
      <Route path="/edit/:id" element={<Layout><PromptForm prompts={prompts} onSave={onSave} /></Layout>} />
      <Route path="/about" element={<Layout>
        <div className="prose dark:prose-invert max-w-none">
          <h1>About</h1>
          <p>AI Prompt Organizer is a simple, privacy‑first tool to manage your favorite prompts. All data stays on your device using LocalStorage.</p>
          <ul>
            <li>No accounts. No servers. No tracking.</li>
            <li>Export to JSON or Markdown for backups or sharing.</li>
            <li>Open source under the MIT License.</li>
          </ul>
          <p><a href="https://github.com/" target="_blank" rel="noreferrer">View on GitHub</a> (replace with your repo link).</p>
        </div>
      </Layout>} />
      <Route path="/legal/privacy" element={<Layout><Privacy /></Layout>} />
      <Route path="/legal/terms" element={<Layout><Terms /></Layout>} />
      <Route path="*" element={<Layout><p>Not found.</p></Layout>} />
    </Routes>
  )
}