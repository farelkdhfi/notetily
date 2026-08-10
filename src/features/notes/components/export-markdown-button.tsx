"use client"

import { FileDown } from "lucide-react"
import { downloadMarkdown } from "@/lib/utils/export-note"

interface ExportMarkdownButtonProps {
  title: string
  content: string
}

export default function ExportMarkdownButton({
  title,
  content,
}: ExportMarkdownButtonProps) {
  const handleExport = () => {
    downloadMarkdown(title, content)
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
    >
      <FileDown size={15} strokeWidth={1.8} className="shrink-0 text-gray-400" />
      <span className="font-medium">Export as Markdown</span>
    </button>
  )
}