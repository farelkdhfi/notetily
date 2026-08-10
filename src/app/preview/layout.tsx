// app/preview/layout.tsx
import type { Metadata } from "next"
import PreviewBanner from "@/features/preview/components/preview-banner"
import PreviewSidebar from "@/features/preview/components/preview-sidebar"
import PreviewSecondSidebar from "@/features/preview/components/preview-second-sidebar"
import { PreviewProvider } from "@/features/preview/context/preview-context"

export const metadata: Metadata = {
  title: "Preview · Notetily",
}

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PreviewProvider>
      <div className="flex h-screen flex-col bg-[#f7f7f5]">
        <PreviewBanner />

        <div className="flex flex-1 overflow-hidden">
          <PreviewSidebar />
          <PreviewSecondSidebar />

          <main className="flex-1 overflow-y-auto bg-white px-8 py-10">
            {children}
          </main>
        </div>
      </div>
    </PreviewProvider>
  )
}