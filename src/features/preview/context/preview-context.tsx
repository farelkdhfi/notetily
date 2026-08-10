"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type NoteFilter = "all" | "favorite" | "archived"

interface PreviewContextValue {
  filter: NoteFilter
  folderId: string | null
  selectedNoteId: string | null
  setFilter: (filter: NoteFilter) => void
  setFolderId: (folderId: string | null) => void
  setSelectedNoteId: (noteId: string | null) => void
}

const PreviewContext = createContext<PreviewContextValue | null>(null)

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<NoteFilter>("all")
  const [folderId, setFolderId] = useState<string | null>(null)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

  return (
    <PreviewContext.Provider
      value={{
        filter,
        folderId,
        selectedNoteId,
        setFilter,
        setFolderId,
        setSelectedNoteId,
      }}
    >
      {children}
    </PreviewContext.Provider>
  )
}

export function usePreviewContext() {
  const context = useContext(PreviewContext)
  if (!context) {
    throw new Error("usePreviewContext must be used within PreviewProvider")
  }
  return context
}