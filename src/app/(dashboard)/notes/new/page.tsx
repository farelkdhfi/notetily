"use client"

import { Suspense } from "react"
import NewNotePageContent from "./new-note-page-content"

export default function NewNotePage() {
  return (
    <Suspense fallback={null}>
      <NewNotePageContent />
    </Suspense>
  )
}