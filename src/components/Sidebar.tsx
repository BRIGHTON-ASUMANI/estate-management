'use client';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home as HomeIcon,
  Building2,
  Key,
  Users,
  BarChart,
  Settings,
  HelpCircle,
} from "lucide-react";

const Sidebar = ({ role }: { role: string }) => {
  const router = useRouter();

  const sidebarItems = [
    { label: "Overview", icon: <HomeIcon className="mr-3 h-4 w-4" />, to: "/" },
    { label: "Properties", icon: <Building2 className="mr-3 h-4 w-4" />, to: "/properties" },
    { label: role === "landlord" ? "Leases" : "My Leases", icon: <Key className="mr-3 h-4 w-4" />, to: "/leases" },
    { label: "Tenants", icon: <Users className="mr-3 h-4 w-4" />, to: "/tenants" },
    { label: "Analytics", icon: <BarChart className="mr-3 h-4 w-4" />, to: "/analytics" },
  ];

  const handleNavigation = (to: string) => {
    router.push(to); // Navigates programmatically
  };

  return (
    <div className="w-72 p-6 space-y-6 bg-blue-950 h-screen border-r border-amber-200/10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-amber-100">Estate Navigator</h2>
        <p className="text-amber-200/60 text-sm mt-1">Property Management</p>
      </div>

      <div className="space-y-1">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-amber-100/80 hover:text-amber-100 hover:bg-blue-900/50"
            onClick={() => handleNavigation(item.to)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </div>

      <div className="pt-6 space-y-1">
        <div className="text-amber-200/40 text-xs font-medium px-3 mb-2">Settings</div>
        <Button
          variant="ghost"
          className="w-full justify-start text-amber-100/80 hover:text-amber-100 hover:bg-blue-900/50"
        >
          <Settings className="mr-3 h-4 w-4" />
          Preferences
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-amber-100/80 hover:text-amber-100 hover:bg-blue-900/50"
        >
          <HelpCircle className="mr-3 h-4 w-4" />
          Support
        </Button>

      </div>
      {/* <div className="pt-6 space-y-1">
        <LogoutButton/>
      </div> */}
    </div>
  );
};

export default Sidebar;
