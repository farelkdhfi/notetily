"use client"

import { Suspense } from "react"
import NotesLandingPageContent from "./notes-landing-page-content"

export default function NotesLandingPage() {
  return (
    <Suspense fallback={null}>
      <NotesLandingPageContent />
    </Suspense>
  )
}