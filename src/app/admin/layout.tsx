import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-earth">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto h-screen">{children}</main>
    </div>
  );
}