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
        query = query.eq('is_favorite', true).eq('is_archived', false)
    } else if (filter === 'archived') {
        query = query.eq('is_archived', true)
    } else {
        // 'all' → semua notes yang BELUM di-archive
        query = query.eq('is_archived', false)
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

export async function getAllNotesForHealth() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('updated_at', { ascending: false })

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

interface UpdateNotesType {
  title?: string
  content?: string
}

export async function updateNotes(id: string, values: UpdateNotesType) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('notes')
    .update(values)
    .eq('id', id)
    .select()
    .single()

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


export interface RelatedNote {
  id: string
  title: string
  content: string
}

export async function getRelatedNotes(noteId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('note_relations')
    .select(`
      note_id_a,
      note_id_b,
      note_a:notes!note_relations_note_id_a_fkey(id, title, content),
      note_b:notes!note_relations_note_id_b_fkey(id, title, content)
    `)
    .or(`note_id_a.eq.${noteId},note_id_b.eq.${noteId}`)

  if (error) {
    throw error
  }

  // Ambil note "lawan" dari pasangan, bukan diri sendiri
  const related = data
    .map((relation) => {
      const isA = relation.note_id_a === noteId
      return isA ? relation.note_b : relation.note_a
    })
    .filter(Boolean) as unknown as RelatedNote[]

  return related
}

export async function addNoteRelation(noteIdA: string, noteIdB: string) {
  const supabase = createClient()

  // Normalisasi urutan biar konsisten sama constraint unique_pair
  const [a, b] = [noteIdA, noteIdB].sort()

  const { data, error } = await supabase
    .from('note_relations')
    .insert({ note_id_a: a, note_id_b: b })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function removeNoteRelation(noteIdA: string, noteIdB: string) {
  const supabase = createClient()

  const [a, b] = [noteIdA, noteIdB].sort()

  const { error } = await supabase
    .from('note_relations')
    .delete()
    .eq('note_id_a', a)
    .eq('note_id_b', b)

  if (error) {
    throw error
  }
}

export async function searchNotesByTitle(query: string, excludeId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('notes')
    .select('id, title, content')
    .ilike('title', `%${query}%`)
    .neq('id', excludeId)
    .limit(8)

  if (error) {
    throw error
  }

  return data
}

export async function getAllNoteRelations() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('note_relations')
    .select('note_id_a, note_id_b')

  if (error) {
    throw error
  }

  return data
}

export interface SearchResultNote {
  id: string
  title: string
  content: string
  is_favorite: boolean
  is_archived: boolean
  updated_at: string
  created_at: string
}

export async function searchNotes(query: string) {
  const supabase = createClient()

  if (!query.trim()) {
    return []
  }

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .order('updated_at', { ascending: false })
    .limit(20)

  if (error) {
    throw error
  }

  return data as SearchResultNote[]
}