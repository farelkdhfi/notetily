export interface DetectedReminder {
  noteId: string
  noteTitle: string
  matchedText: string
  label: string
}

interface NoteForScan {
  id: string
  title: string
  content: string
}

const DAY_NAMES: Record<string, number> = {
  minggu: 0, sunday: 0,
  senin: 1, monday: 1,
  selasa: 2, tuesday: 2,
  rabu: 3, wednesday: 3,
  kamis: 4, thursday: 4,
  jumat: 5, friday: 5,
  sabtu: 6, saturday: 6,
}

// Regex kata kunci relatif (ID + EN)
const RELATIVE_PATTERNS: { pattern: RegExp; label: (m: RegExpMatchArray) => string }[] = [
  { pattern: /\bhari ini\b|\btoday\b/i, label: () => "Today" },
  { pattern: /\bbesok\b|\btomorrow\b/i, label: () => "Tomorrow" },
  { pattern: /\blusa\b/i, label: () => "In 2 days" },
  {
    pattern: /\b(senin|selasa|rabu|kamis|jumat|sabtu|minggu|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    label: (m) => {
      const day = m[1].toLowerCase()
      return `This ${day.charAt(0).toUpperCase()}${day.slice(1)}`
    },
  },
]

// Regex jam eksplisit: "jam 9", "jam 14.30", "9am", "14:30"
const TIME_PATTERN = /\b(?:jam\s*)?(\d{1,2})[:.]?(\d{2})?\s*(am|pm)?\b/gi

function extractTime(text: string, matchIndex: number): string | null {
  // Cari pola waktu dalam radius ~15 karakter dari kata kunci tanggal
  const nearby = text.slice(Math.max(0, matchIndex - 5), matchIndex + 25)
  const timeMatch = nearby.match(/\bjam\s*(\d{1,2})([:.]\d{2})?\b/i)

  if (!timeMatch) return null

  const hour = timeMatch[1]
  const minute = timeMatch[2] ? timeMatch[2].replace(/[:.]/, "") : "00"

  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`
}

export function detectReminders(notes: NoteForScan[]): DetectedReminder[] {
  const reminders: DetectedReminder[] = []

  for (const note of notes) {
    // Strip HTML tags sederhana biar regex jalan di teks polos
    const plainText = note.content.replace(/<[^>]*>/g, " ")

    for (const { pattern, label } of RELATIVE_PATTERNS) {
      const match = plainText.match(pattern)
      if (!match || match.index === undefined) continue

      const timeStr = extractTime(plainText, match.index)
      const finalLabel = timeStr ? `${label(match)} · ${timeStr}` : label(match)

      // Ambil sedikit konteks di sekitar match buat ditampilkan
      const contextStart = Math.max(0, match.index - 10)
      const contextEnd = Math.min(plainText.length, match.index + 40)
      const context = plainText.slice(contextStart, contextEnd).trim()

      reminders.push({
        noteId: note.id,
        noteTitle: note.title || "Untitled",
        matchedText: context,
        label: finalLabel,
      })

      // Satu note cukup satu reminder biar gak spam kalau ada banyak kata kunci
      break
    }
  }

  return reminders
}