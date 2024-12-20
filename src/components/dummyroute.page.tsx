/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// "use client";

import { Suspense } from "react";
import UserGreetingFallback from "@/components/UserGreetingFallback";
import UserGreeting from "@/components/UserGreeting";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Search 
} from "lucide-react";
import { LogoutButton } from '@/components/Logout';

export default function Home() {
  // const [user, setUser] = useState<any>(null); // State for storing user data

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const supabase = await createClient();
  //       const { data } = await supabase.auth.getUser();
  //       setUser(data?.user);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // if (!user) {
  //   return <UserGreetingFallback />;
  // }

  return (
    <div className="p-6 space-y-6">
      {/* User Greeting with Suspense */}
      <Suspense fallback={<UserGreetingFallback />}>
        <UserGreeting />
      </Suspense>

      {/* Infosnacks Section */}
      <div className="flex-1 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        {/* Top Navigation */}
        <div className="h-16 border-b border-amber-200/10 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-amber-100/80 hover:text-amber-100">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-amber-100/80 hover:text-amber-100">
              <Bell className="h-5 w-5" />
            </Button>
            <LogoutButton />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-amber-100">Welcome back, {/*user.email*/}</h1>
            <p className="text-amber-200/60 mt-1">Here's what's happening with your properties today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {['Total Properties', 'Active Leases', 'Vacant Units', 'Maintenance Requests'].map((title, i) => (
              <Card key={i} className="bg-blue-900/40 border-amber-200/10">
                <CardContent className="p-6">
                  <div className="text-amber-200/60 text-sm">{title}</div>
                  <div className="text-2xl font-semibold text-amber-100 mt-2">{Math.floor(Math.random() * 100)}</div>
                  <div className="text-amber-200/40 text-sm mt-2">+2.5% from last month</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-blue-900/40 border-amber-200/10">
              <CardHeader>
                <CardTitle className="text-amber-100">Recent Activities</CardTitle>
                <CardDescription className="text-amber-200/60">Your latest property management updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Lease signed for Unit 204', 'Maintenance completed at Property B', 'New tenant application received'].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-blue-950/50">
                      <span className="text-amber-100/80">{activity}</span>
                      <span className="text-amber-200/40 text-sm">2h ago</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/40 border-amber-200/10">
              <CardHeader>
                <CardTitle className="text-amber-100">Quick Actions</CardTitle>
                <CardDescription className="text-amber-200/60">Common management tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Add New Property', 'Create Lease', 'Record Payment', 'Schedule Maintenance'].map((action, i) => (
                    <Button key={i} variant="outline" className="w-full justify-start text-amber-100 border-amber-200/20 hover:bg-blue-800 hover:text-amber-50">
                      {action}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
