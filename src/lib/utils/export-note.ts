import TurndownService from "turndown"

const turndownService = new TurndownService({
  headingStyle: "atx",       // # Heading, bukan Heading\n===
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
})

export function noteToMarkdown(title: string, contentHtml: string): string {
  const bodyMarkdown = turndownService.turndown(contentHtml || "")
  const heading = `# ${title || "Untitled"}`

  return `${heading}\n\n${bodyMarkdown}`
}

export function downloadMarkdown(title: string, contentHtml: string) {
  const markdown = noteToMarkdown(title, contentHtml)

  const safeFilename =
    (title || "untitled")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "untitled"

  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = `${safeFilename}.md`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}