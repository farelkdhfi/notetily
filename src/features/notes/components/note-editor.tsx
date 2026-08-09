"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect } from "react"

import EditorToolbar from "./editor-toolbar"

interface NoteEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function NoteEditor({
  content,
  onChange,
  placeholder = "Start writing...",
}: NoteEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-200/60 rounded-sm px-0.5",
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-gray-300 before:float-left before:pointer-events-none before:h-0",
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none text-[17px] leading-8 text-gray-600 [&_strong]:text-gray-900 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_blockquote]:text-gray-500 [&_blockquote]:italic",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Sinkronisasi kalau `content` berubah dari luar (misal saat load note beda)
  // Sesudah (fix):
useEffect(() => {
  if (editor && content !== editor.getHTML()) {
    editor.commands.setContent(content, { emitUpdate: false })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [content])

  return (
    <div className="space-y-4">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}