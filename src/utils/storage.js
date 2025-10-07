const KEY = 'ai_prompt_organizer_v1'

export function loadPrompts(){
  try{
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  }catch(e){
    console.error('Failed to load prompts', e)
    return []
  }
}

export function savePrompts(list){
  try{
    localStorage.setItem(KEY, JSON.stringify(list))
  }catch(e){
    console.error('Failed to save prompts', e)
  }
}

export const samplePrompts = [
  {
    id: crypto.randomUUID(),
    title: 'Summarize Transcript',
    prompt: 'Summarize the following transcript in under 200 words with 3 bullet takeaways.',
    tags: ['summarize','youtube','writing']
  },
  {
    id: crypto.randomUUID(),
    title: 'Bug Repro',
    prompt: 'Given this error log, list 3 likely root causes and a minimal reproduction plan.',
    tags: ['code','debug','planning']
  },
  {
    id: crypto.randomUUID(),
    title: 'Image Style Prompt',
    prompt: 'Create an illustration with bold silhouettes and high-contrast edges resembling a stylized loading‑screen aesthetic.',
    tags: ['image','style']
  }
]