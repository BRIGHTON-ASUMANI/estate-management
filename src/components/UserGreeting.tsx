import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LogoutButton } from "@/components/Logout";

const UserGreeting = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
    return null;
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        <div className="h-16 border-b border-amber-200/10 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4"></div>
          <div className="flex items-center space-x-4">
            <LogoutButton />
          </div>
        </div>

        <div className="p-8 space-y-8">
          <h1 className="text-2xl font-semibold text-amber-100">Welcome back, {data.user.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserGreeting;