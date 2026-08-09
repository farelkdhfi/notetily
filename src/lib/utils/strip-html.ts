export function stripHtml(html: string): string {
  if (typeof window === "undefined") {
    // Fallback super sederhana untuk server-side render (jarang kepakai di sini
    // karena NoteButton "use client", tapi aman untuk jaga-jaga)
    return html.replace(/<[^>]*>/g, "")
  }

  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.body.textContent?.trim() ?? ""
}