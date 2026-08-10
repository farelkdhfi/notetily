export interface PreviewNote {
  id: string
  title: string
  content: string
  is_favorite: boolean
  is_archived: boolean
  folder_id: string | null
  updated_at: string
  created_at: string
}

export interface PreviewFolder {
  id: string
  name: string
}

export const previewFolders: PreviewFolder[] = [
  { id: "folder-personal", name: "Personal" },
  { id: "folder-work", name: "Work" },
  { id: "folder-ideas", name: "Ideas" },
]

export const previewNotes: PreviewNote[] = [
  {
    id: "preview-1",
    title: "Ideas for the weekend",
    content: `<p>Sometimes the best weekends are the ones without a complicated plan.</p><p>Go somewhere new. Read a book. Take a long walk. Put the phone away for a while and let the mind wander.</p><p><strong>Things worth doing:</strong></p><ul><li>Visit a new coffee shop</li><li>Finish the book I'm reading</li><li>Take some photos</li></ul>`,
    is_favorite: true,
    is_archived: false,
    folder_id: "folder-personal",
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "preview-2",
    title: "Project ideas",
    content: `<p>Build something simple, useful, and beautiful. Focus on one core problem instead of trying to do everything at once.</p><p><em>Keep the scope small for the first version.</em></p>`,
    is_favorite: false,
    is_archived: false,
    folder_id: "folder-work",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "preview-3",
    title: "Books to read",
    content: `<p>The Creative Act — Rick Rubin</p><p>Deep Work — Cal Newport</p><blockquote>"Simplicity is the ultimate sophistication."</blockquote>`,
    is_favorite: true,
    is_archived: false,
    folder_id: "folder-ideas",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "preview-4",
    title: "Things to remember",
    content: `<p>Keep things simple. Say no to distractions. Protect your focus time.</p>`,
    is_favorite: false,
    is_archived: false,
    folder_id: null,
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
]