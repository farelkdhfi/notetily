import FirstSidebar from "@/features/notes/components/first-sidebar";
import SecondSidebar from "@/features/notes/components/second-sidebar";
import { ReactNode, Suspense } from "react";

export default function NotesLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex min-h-screen">

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

        </div>
    );
}