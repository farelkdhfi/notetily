import { createClient } from "../supabase/client";

type NoteFilter = 'all' | 'favorite' | 'archived'

export async function getNotes(
    filter: NoteFilter = 'all',
    folderId?: string
) {
    const supabase = createClient()

    let query = supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

    // Filter status
    if (filter === 'favorite') {
        query = query.eq('is_favorite', true)
    }

    if (filter === 'archived') {
        query = query.eq('is_archived', true)
    }

    // Filter folder
    if (folderId) {
        query = query.eq('folder_id', folderId)
    }

    const { data, error } = await query

    if (error) {
        throw error
    }

    return data
}

interface CreateNotesType {
    title: string
    content: string
}

export async function getNoteById(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        throw error
    }

    return data
}

export async function createNotes(values: CreateNotesType) {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('User is not authenticated')
    }

    const { data, error } = await supabase
        .from('notes')
        .insert({
            user_id: user.id,
            ...values,
        })
        .select()
        .single()

    if (error) {
        throw error
    }

    return data
}

export async function toggleFavorite(is_favorite: boolean, noteId: string) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('notes')
        .update({ is_favorite: is_favorite })
        .eq('id', noteId)
        .select()
        .single()

    if (error) {
        throw error
    }

    return data
}


export async function toggleArchive(is_archived: boolean, noteId: string) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('notes')
        .update({ is_archived: is_archived })
        .eq('id', noteId)
        .select()
        .single()

    if (error) {
        throw error
    }

    return data
}

export async function addNoteToFolder(noteId: string, folderId: string) {
    const supabase = createClient()

    const { data, error } = await supabase

        .from('notes')
        .update({
            folder_id: folderId
        })
        .eq('id', noteId)
        .select()
        .single()

    console.log('NOTE ID:', noteId)
    console.log('FOLDER ID:', folderId)
    console.log('DATA:', data)
    console.log('ERROR:', error)

    if (error) {
        throw error
    }

    return data
}

export async function deleteNote(id: string) {
    const supabase = createClient()

    const { error } = await supabase
        .from('notes')
        .delete()
        .select()
        .eq('id', id)
        .single()

    if (error) {
        throw error
    }
}