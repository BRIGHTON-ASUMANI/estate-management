import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Suspense } from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Bell, 
  Home as HomeIcon, 
  BarChart, 
  Folder, 
  HelpCircle 
} from "lucide-react"
import { LogoutButton } from '@/components/Logout'

// Sidebar Component
function Sidebar() {
  return (
    <div className="border-r w-64 p-4 space-y-2">
      <div className="mb-6 px-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <Button variant="ghost" className="w-full justify-start">
        <HomeIcon className="mr-2 h-4 w-4" />
        Home
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <BarChart className="mr-2 h-4 w-4" />
        Analytics
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <Folder className="mr-2 h-4 w-4" />
        Projects
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <HelpCircle className="mr-2 h-4 w-4" />
        Help
      </Button>
    </div>
  )
}

// Server component for fetching user data
async function UserGreeting() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/login')
  }
  
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-xl font-semibold">
                  Hello, {data.user.email}
                </p>
                <div className="flex justify-between items-center">
                  <span>Logged in successfully</span>
                  <LogoutButton />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Quick Actions */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="flex flex-col h-24 justify-center">
                  <Settings className="h-6 w-6 mb-2" />
                  Settings
                </Button>
                <Button variant="outline" className="flex flex-col h-24 justify-center">
                  <Bell className="h-6 w-6 mb-2" />
                  Notifications
                </Button>
                <Button variant="outline" className="flex flex-col h-24 justify-center">
                  <User className="h-6 w-6 mb-2" />
                  Account
                </Button>
                <Button variant="outline" className="flex flex-col h-24 justify-center">
                  Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Client-side loading state
function UserGreetingFallback() {
  return (
    <div className="flex">
      <div className="border-r w-64 p-4"></div>
      <div className="flex-1 flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="flex justify-center items-center p-6">
            <p className="text-lg text-muted-foreground">Loading user data...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<UserGreetingFallback />}>
      <UserGreeting />
    </Suspense>
  )
}