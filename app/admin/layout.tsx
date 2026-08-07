import { ReactNode } from "react";
import Link from "next/link";
import { Coffee, Settings, LayoutDashboard, UtensilsCrossed, Users, Receipt } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Belluno Cafe",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#0d0d0d] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#121212] flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-medium tracking-widest text-primary uppercase">Belluno Admin</h1>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <SidebarLink href="/admin" icon={LayoutDashboard}>Dashboard</SidebarLink>
          <SidebarLink href="/admin/menu" icon={UtensilsCrossed}>Menu Management</SidebarLink>
          <SidebarLink href="/admin/orders" icon={Receipt}>Order History</SidebarLink>
          <SidebarLink href="/admin/customers" icon={Users}>Customers</SidebarLink>
        </nav>

        <div className="p-4 border-t border-white/10">
          <SidebarLink href="/admin/settings" icon={Settings}>Settings</SidebarLink>
          <SidebarLink href="/" icon={Coffee}>Back to Cafe</SidebarLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}

function SidebarLink({ href, icon: Icon, children }: { href: string; icon: any; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{children}</span>
    </Link>
  );
}
