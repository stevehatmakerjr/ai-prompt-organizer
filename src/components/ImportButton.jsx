import React, { useRef } from 'react'

export default function ImportButton({ onImport }){
  const inputRef = useRef(null)
  const onFile = async (file) => {
    const text = await file.text()
    try{
      const data = JSON.parse(text)
      if(Array.isArray(data)){
        onImport(data)
      } else {
        alert('Invalid JSON format: expected an array.')
      }
    }catch(e){
      alert('Failed to parse JSON: ' + e.message)
    }
  }
  return (
    <div className="relative">
      <input ref={inputRef} type="file" accept=".json" className="hidden" onChange={e=>{
        const f = e.target.files?.[0]
        if(f) onFile(f)
        e.target.value = ''
      }} />
      <button className="px-3 py-2 border rounded text-sm" onClick={()=>inputRef.current?.click()}>
        Import JSON
      </button>
    </div>
  )
}