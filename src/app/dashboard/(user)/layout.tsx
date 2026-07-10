import { Suspense, type ReactNode } from "react";
import { Navbar } from "@/components/layout/NavBar";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-earth">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      {children}
    </div>
  );
}