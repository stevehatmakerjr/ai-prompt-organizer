import React, { useEffect, useState } from 'react'

export default function ThemeToggle(){
  const [dark, setDark] = useState(()=>{
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(()=>{
    const cls = document.documentElement.classList
    if(dark) cls.add('dark'); else cls.remove('dark')
  }, [dark])
  return (
    <button className="px-2 py-1 border rounded text-xs" onClick={()=>setDark(d => !d)}>
      {dark ? 'Light' : 'Dark'}
    </button>
  )
}