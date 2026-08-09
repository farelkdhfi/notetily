import React from 'react'
import NoteList from './note-list'

export default function SecondSidebar() {
    return (
        <aside className="w-[240px] shrink-0 bg-white border-r text-black border-gray-200 p-5">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Notes
                </h2>

                <span className="text-xs text-gray-400">
                    12 notes
                </span>
            </div>

            <div className="">
                {/* Notes button */}
                <NoteList />
            </div>
        </aside>
    )
}
