import { createClient } from "../supabase/client";

export async function getFolder() {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('folders')
        .select('*')
        .order('created_at', {ascending: false})

        if (error) {
            throw error
        }

        return data
}

export interface CreateFolderInput {
  name: string
}

export async function createFolder({ name }: CreateFolderInput) {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const { data, error } = await supabase
    .from('folders')
    .insert({
      user_id: user.id,
      name,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function deleteFolder(id: string) {
  const supabase = createClient()

  // Jaga-jaga kalau ON DELETE SET NULL belum di-set di database,
  // kita null-kan folder_id secara manual dulu sebelum hapus foldernya.
  const { error: unlinkError } = await supabase
    .from('notes')
    .update({ folder_id: null })
    .eq('folder_id', id)

  if (unlinkError) {
    throw unlinkError
  }

  const { error } = await supabase
    .from('folders')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }
}