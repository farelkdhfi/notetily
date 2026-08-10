import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"

export default function PreviewBanner() {
  return (
    <div className="flex shrink-0 items-center justify-center gap-3 bg-neutral-900 px-4 py-2.5 text-white">
      <span className="flex items-center gap-1.5 text-xs font-medium">
        <Sparkles size={13} strokeWidth={2} />
        You're viewing a preview with sample notes
      </span>

      <Link
        href="/signup"
        className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-900 transition hover:bg-white/90"
      >
        Sign up to start writing
        <ArrowRight size={12} strokeWidth={2.5} />
      </Link>
    </div>
  )
}