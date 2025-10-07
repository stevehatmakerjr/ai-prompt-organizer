import React from 'react'

export default function SearchBar({ value, onChange }){
  return (
    <input
      className="border rounded px-3 py-2 text-sm bg-transparent"
      placeholder="Search prompts..."
      value={value}
      onChange={e=>onChange(e.target.value)}
    />
  )
}