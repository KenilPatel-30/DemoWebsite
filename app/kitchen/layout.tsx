import { ReactNode } from "react";
import Link from "next/link";
import { ChefHat } from "lucide-react";

export const metadata = {
  title: "KDS | Kitchen Display System",
};

export default function KitchenLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full bg-paper text-ink overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-sand border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
            <ChefHat className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-widest text-primary uppercase">Kitchen Display System</h1>
        </div>
        <Link href="/" className="text-sm text-ink/50 hover:text-ink transition-colors">
          Exit KDS
        </Link>
      </header>

      {/* Main Content (Scrollable horizontally for Kanban) */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden bg-coffee">
        <div className="h-full p-6 inline-flex min-w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
