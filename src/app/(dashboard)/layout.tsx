import FirstSidebar from "@/features/notes/components/first-sidebar";
import QuickCapture from "@/features/notes/components/quick-capture";
import SecondSidebar from "@/features/notes/components/second-sidebar";
import { ReactNode, Suspense } from "react";

export default function NotesLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-white">

            <Suspense fallback={null}>
                {/* Sidebar 1 */}
                <FirstSidebar />

                {/* Sidebar 2 - Notes List button */}
                <SecondSidebar />
            </Suspense>

            {/* Main Content - isi notes */}
            <main className="flex-1 p-10">
                {children}
            </main>

            <QuickCapture />
        </div>
    );
}