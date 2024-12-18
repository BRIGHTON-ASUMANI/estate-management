'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Sign up the user
  const { data: authData, error: signUpError } = await supabase.auth.signUp(data)
  
  if (signUpError) {
    console.error('Signup error:', signUpError)
    redirect('/error')
  }

  if (authData.user) {
    try {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (!existingProfile) {
        // Create new profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email: authData.user.email,
              full_name: '',              // Can be updated later
              role: 'tenant',             // Default role
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              phone_number: '',           // Can be updated later
              address: '',                // Can be updated later
              is_active: true,
              preferences: {},            // Empty object for future preferences
            }
          ])

        if (profileError) {
          console.error('Error creating profile:', profileError)
          // You might want to delete the user if profile creation fails
          await supabase.auth.admin.deleteUser(authData.user.id)
          redirect('/error')
        }
      }
    } catch (error) {
      console.error('Profile creation error:', error)
      redirect('/error')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Logout error:', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}