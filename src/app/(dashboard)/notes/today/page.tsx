// app/notes/today/page.tsx
"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Sparkles, FileQuestion, Clock, ArrowRight, CalendarClock } from "lucide-react"

import { getAllNotesForHealth } from "@/lib/api/notes"
import { stripHtml } from "@/lib/utils/strip-html"
import { formatNoteDate } from "@/lib/utils/format-date"
import { detectReminders } from "@/lib/utils/detect-reminders"

interface NoteItem {
  id: string
  title: string
  content: string
  updated_at: string
  created_at: string
  is_archived?: boolean
}

const STALE_MONTHS = 6
const RECENT_LIMIT = 5
const REMINDER_SCAN_DAYS = 7

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export default function DailyFocusPage() {
  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ["notes", "health"],
    queryFn: getAllNotesForHealth,
  })

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl animate-pulse space-y-6">
        <div className="h-8 w-64 rounded bg-gray-100" />
        <div className="space-y-2">
          <div className="h-20 rounded-2xl bg-gray-50" />
          <div className="h-20 rounded-2xl bg-gray-50" />
        </div>
      </div>
    )
  }

  if (isError || !notes) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            Something went wrong
          </p>
          <p className="mt-1 text-sm text-gray-400">
            We couldn't load your notes.
          </p>
        </div>
      </div>
    )
  }

  const activeNotes = (notes as NoteItem[]).filter((n) => !n.is_archived)

  // Reminders: cuma scan notes yang di-update 7 hari terakhir
  const scanCutoff = new Date()
  scanCutoff.setDate(scanCutoff.getDate() - REMINDER_SCAN_DAYS)

  const recentNotesForScan = activeNotes.filter((note) => {
    const updatedAt = new Date(note.updated_at ?? note.created_at)
    return updatedAt >= scanCutoff
  })

  const reminders = detectReminders(recentNotesForScan)

  // Draft: title kosong/Untitled DAN content kosong
  const draftNotes = activeNotes.filter((note) => {
    const title = note.title.trim().toLowerCase()
    const isEmptyTitle = title === "" || title === "untitled"
    const isEmptyContent = stripHtml(note.content).trim() === ""
    return isEmptyTitle && isEmptyContent
  })

  // Stale: belum disentuh 6 bulan
  const staleDate = new Date()
  staleDate.setMonth(staleDate.getMonth() - STALE_MONTHS)

  const staleNotes = activeNotes.filter((note) => {
    const updatedAt = new Date(note.updated_at ?? note.created_at)
    return updatedAt < staleDate
  })

  const needsAttention = [
    ...draftNotes.map((n) => ({ note: n, reason: "draft" as const })),
    ...staleNotes.map((n) => ({ note: n, reason: "stale" as const })),
  ].slice(0, 6)

  const recentlyUpdated = [...activeNotes]
    .sort(
      (a, b) =>
        new Date(b.updated_at ?? b.created_at).getTime() -
        new Date(a.updated_at ?? a.created_at).getTime()
    )
    .slice(0, RECENT_LIMIT)

  return (
    <div className="mx-auto w-full max-w-3xl">

      {/* Header */}
      <div className="mb-10">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
          {getGreeting()}
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Today's Focus
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          {needsAttention.length > 0
            ? `${needsAttention.length} note${needsAttention.length > 1 ? "s" : ""} need attention`
            : "You're all caught up."}
        </p>
      </div>

      {/* Detected reminders */}
      {reminders.length > 0 && (
        <div className="mb-10">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
            <CalendarClock size={12} strokeWidth={2} />
            Detected reminders
          </p>

          <div className="space-y-2">
            {reminders.map((reminder, i) => (
              <Link
                key={`${reminder.noteId}-${i}`}
                href={`/notes/${reminder.noteId}`}
                className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-amber-50/40 px-5 py-4 transition hover:border-amber-200 hover:bg-amber-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <CalendarClock size={17} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {reminder.noteTitle}
                    </p>
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      {reminder.label}
                    </span>
                  </div>
                  <p className="truncate text-xs text-gray-500">
                    "...{reminder.matchedText}..."
                  </p>
                </div>

                <ArrowRight size={15} strokeWidth={1.8} className="shrink-0 text-amber-300" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Needs attention */}
      {needsAttention.length > 0 && (
        <div className="mb-10">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
            <Sparkles size={12} strokeWidth={2} />
            Needs attention
          </p>

          <div className="space-y-2">
            {needsAttention.map(({ note, reason }) => (
              <Link
                key={note.id}
                href={`/notes/${note.id}`}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 transition hover:border-gray-300 hover:bg-gray-50/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                  {reason === "draft" ? (
                    <FileQuestion size={17} strokeWidth={1.8} />
                  ) : (
                    <Clock size={17} strokeWidth={1.8} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {note.title || "Untitled"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {reason === "draft"
                      ? "Empty draft — finish writing it"
                      : `Not touched since ${formatNoteDate(note.updated_at ?? note.created_at)}`}
                  </p>
                </div>

                <ArrowRight size={15} strokeWidth={1.8} className="shrink-0 text-gray-300" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recently updated */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
          Recently updated
        </p>

        {recentlyUpdated.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-8 text-center">
            <p className="text-sm text-gray-400">
              No notes yet. Start writing to see them here.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {recentlyUpdated.map((note) => {
              const preview = stripHtml(note.content)

              return (
                <Link
                  key={note.id}
                  href={`/notes/${note.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {note.title || "Untitled"}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {preview || "No additional text"}
                    </p>
                  </div>

                  <span className="shrink-0 text-[11px] text-gray-400">
                    {formatNoteDate(note.updated_at ?? note.created_at)}
                  </span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}