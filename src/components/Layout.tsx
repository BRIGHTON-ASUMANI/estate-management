// components/Layout.tsx
import Sidebar from "./Sidebar";

const Layout = ({ children, role }: { children: React.ReactNode; role: string }) => (
  <div className="flex">
    <Sidebar role={role} />
    <main className="flex-grow p-6">{children}</main>
  </div>
);

export default Layout;
