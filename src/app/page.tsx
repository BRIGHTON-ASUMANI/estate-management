import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Suspense } from 'react'
import { LogoutButton } from '@/components/Logout'

// Server component for fetching user data
async function UserGreeting() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/login')
  }
  
  return (
    <div>
      <p>Hello {data.user.email}</p>
      <LogoutButton />
    </div>
  )
}

// Client-side loading state
function UserGreetingFallback() {
  return <p>Loading...</p>
}

export default function Home() {
  return (
    <Suspense fallback={<UserGreetingFallback />}>
      <UserGreeting />
    </Suspense>
  )
}