import { createClient } from '@/lib/supabase/client'
import { SignInFormValues, SignUpFormValues } from '@/lib/schemas/auth'

export async function signUp(values: SignUpFormValues) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  })

  if (error) throw error

  return data
}

export async function login(values: SignInFormValues) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })

  if (error) throw error

  return data
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) throw error
}