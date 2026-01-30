"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
  User,
  LogOut,
} from "lucide-react";
import { cx } from "@/lib/cx";

type MenuItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = useMemo(
    () => [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
      { icon: FileText, label: "Submissions", href: "/admin/submissions" },
      { icon: Building2, label: "Centres", href: "/admin/centres" },
      { icon: Users, label: "Users", href: "/admin/users" },
      { icon: Settings, label: "Settings", href: "/admin/settings" },
    ],
    []
  );

  function isActive(href: string) {
    if (!pathname) return false;
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside
      className={cx(
        "h-screen sticky top-0 flex flex-col bg-[rgb(var(--background))]",
        "border-r border-[rgb(var(--border))]",
        "transition-[width] duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-[rgb(var(--border))]">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))] text-[rgb(var(--primary))]">
          <Leaf className="h-5 w-5" />
        </div>

        <span
          className={cx(
            "ml-3 font-bold text-lg text-[rgb(var(--foreground))] transition-all duration-200",
            collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
          )}
        >
          EcoAdmin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cx(
                "flex items-center px-3 py-3 rounded-2xl group relative",
                "transition-colors",
                active
                  ? "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/15"
                  : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
              )}
            >
              <item.icon
                className={cx(
                  "h-5 w-5 shrink-0 transition-colors",
                  active
                    ? "text-[rgb(var(--primary))]"
                    : "text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--foreground))]"
                )}
              />

              <span
                className={cx(
                  "ml-3 font-medium transition-all duration-200",
                  collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                )}
              >
                {item.label}
              </span>

              {/* Tooltip when collapsed */}
              {collapsed ? (
                <div
                  className={cx(
                    "absolute left-full ml-2 px-2 py-1 rounded-lg",
                    "bg-[rgb(var(--foreground))] text-[rgb(var(--background))] text-xs whitespace-nowrap",
                    "opacity-0 group-hover:opacity-100 transition-opacity",
                    "pointer-events-none z-50 shadow-sm"
                  )}
                >
                  {item.label}
                </div>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[rgb(var(--border))]">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className={cx(
            "flex items-center justify-center w-full p-2 rounded-2xl",
            "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]",
            "transition-colors border border-transparent hover:border-[rgb(var(--border))]"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>

        <div className={cx("mt-4 flex items-center px-2", collapsed && "justify-center")}>
          <div className="h-9 w-9 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))] flex items-center justify-center text-[rgb(var(--foreground))] shrink-0">
            <User className="h-4 w-4" />
          </div>

          <div
            className={cx(
              "ml-3 overflow-hidden transition-all duration-200",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            <p className="text-sm font-semibold text-[rgb(var(--foreground))] truncate">
              Admin User
            </p>

            <button
              type="button"
              className={cx(
                "mt-0.5 inline-flex items-center gap-1 text-xs",
                "text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
              )}
              onClick={() => {
                // TODO: connect logout (Clerk/NextAuth/custom) later
              }}
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}