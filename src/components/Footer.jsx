import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 py-6 text-sm flex flex-wrap gap-4">
        <span>&copy; 2025 AI Prompt Organizer</span>
        <span className="opacity-70">Local‑only storage. No tracking.</span>
        <div className="ml-auto flex gap-3">
          <Link to="/legal/privacy" className="hover:underline">Privacy</Link>
          <Link to="/legal/terms" className="hover:underline">Terms</Link>
          <a className="hover:underline" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  )
}