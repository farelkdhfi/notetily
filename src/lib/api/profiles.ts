import { createClient } from "../supabase/client";

export interface UpdateProfileInput {
    full_name: string
    avatar_url?: string | null
}

export async function uploadAvatar(file: File, userId: string) {
  const supabase = createClient()

  const fileExt = file.name.split('.').pop()
  const filePath = `${userId}.${fileExt}`

  const { error } = await supabase.storage
    .from('avatar-images')
    .upload(filePath, file, {
      upsert: true,
    })

  if (error) throw error

  const { data } = supabase.storage
    .from('avatar-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}

export async function getProfile() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('User belum login')
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (error) {
        throw error
    }
    return data
}

export async function updateProfile(
  fullName: string,
  avatar: File | null
) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User belum login')
  }

  let avatarUrl: string | undefined

  if (avatar) {
    avatarUrl = await uploadAvatar(avatar, user.id)
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      ...(avatarUrl && { avatar_url: avatarUrl }),
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)
    .select()
    .single()

  if (error) throw error

  return data
}

export async function getEmailUser() {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
        throw error
    }

    return user?.email
}