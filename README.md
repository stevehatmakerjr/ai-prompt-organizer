# AI Prompt Organizer

A lightweight, fork‑friendly web app (React + Tailwind) for collecting, tagging, searching, importing, and exporting AI prompts in **Markdown** or **JSON**. Data is stored **locally** in your browser (LocalStorage).

## Features
- Add / edit / delete prompts (title, prompt, tags)
- Search + multi‑tag filtering
- Import from JSON; export to JSON / Markdown
- Dark / Light theme
- No backend, no signup — **privacy by default**

## Tech
- React (Vite) + TailwindCSS
- LocalStorage for persistence
- Zero external services

## Quick Start
```bash
# install
npm install

# dev server
npm run dev

# production build
npm run build
npm run preview
```

## JSON Schema
```json
[
  {
    "id": "uuid-or-number",
    "title": "Short name",
    "prompt": "Your reusable instruction text",
    "tags": ["tag1", "tag2"]
  }
]
```

## Import
Go to **Import** and select a `.json` file formatted like above. Imported prompts will **merge** with your current library (duplicate `id`s are re‑keyed).

## Export
Choose **Export → JSON** or **Export → Markdown** to download your library.

## Privacy
This app stores all data **on your device** using LocalStorage. No analytics or 3rd‑party calls.

## Contributing
PRs welcome! Some ideas:
- Prompt versioning
- Folders/collections
- Cloud sync (optional adapters)
- Keyboard shortcuts
- Shareable links

## License
MIT — do anything, just keep the notice.
