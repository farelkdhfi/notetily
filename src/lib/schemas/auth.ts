import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>
export const signInSchema = signUpSchema // same shape, different name for clarity
export type SignInFormValues = z.infer<typeof signInSchema>