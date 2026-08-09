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