import { stripHtml } from "./strip-html"

export interface NoteHealthItem {
  id: string
  title: string
  content: string
  folder_id: string | null
  updated_at: string
  created_at: string
}

export interface NotesHealthReport {
  total: number
  untitled: NoteHealthItem[]
  duplicates: NoteHealthItem[]
  withoutFolder: NoteHealthItem[]
  stale: NoteHealthItem[]
  veryShort: NoteHealthItem[]
}

const STALE_MONTHS = 6
const SHORT_CONTENT_THRESHOLD = 20

export function analyzeNotesHealth(
  notes: NoteHealthItem[]
): NotesHealthReport {
  const untitled = notes.filter((note) => {
    const title = note.title.trim().toLowerCase()
    return title === "" || title === "untitled"
  })

  // Duplicate: title sama persis (case-insensitive, trimmed), dan title-nya gak kosong
  const titleGroups = new Map<string, NoteHealthItem[]>()

  for (const note of notes) {
    const key = note.title.trim().toLowerCase()
    if (key === "" || key === "untitled") continue

    const group = titleGroups.get(key) ?? []
    group.push(note)
    titleGroups.set(key, group)
  }

  const duplicates = Array.from(titleGroups.values())
    .filter((group) => group.length > 1)
    .flat()

  const withoutFolder = notes.filter((note) => !note.folder_id)

  const staleDate = new Date()
  staleDate.setMonth(staleDate.getMonth() - STALE_MONTHS)

  const stale = notes.filter((note) => {
    const updatedAt = new Date(note.updated_at ?? note.created_at)
    return updatedAt < staleDate
  })

  const veryShort = notes.filter((note) => {
    const plainText = stripHtml(note.content)
    return plainText.length > 0 && plainText.length < SHORT_CONTENT_THRESHOLD
  })

  return {
    total: notes.length,
    untitled,
    duplicates,
    withoutFolder,
    stale,
    veryShort,
  }
}