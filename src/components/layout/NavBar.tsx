"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Leaf, Search, Menu, X, Bell, User } from "lucide-react";

import { ROUTES } from "@/lib/constants";
import { cx } from "@/lib/cx";

const SEARCH_DEBOUNCE_MS = 200;

const navLinks = [
  { name: "Dashboard", path: ROUTES.dashboard
   },
  { name: "Centres", path: ROUTES.centres },
  { name: "Recycle", path: ROUTES.register },
  { name: "My Impact", path: ROUTES.wallet },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = React.useState(() => searchParams.get("q") ?? "");

  React.useEffect(() => {
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const initials = React.useMemo(() => {
    if (!user) return null;

    const firstName = user.firstName?.trim();
    const lastName = user.lastName?.trim();
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }

    const fullName = user.fullName?.trim();
    if (fullName) {
      const parts = fullName.split(/\s+/).filter(Boolean);
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      if (parts.length === 1) {
        return parts[0][0].toUpperCase();
      }
    }

    if (firstName) {
      return firstName[0].toUpperCase();
    }

    return null;
  }, [user]);

  return (
    <nav className="sticky top-0 z-[9999] w-full bg-earth/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href={ROUTES.home} className="flex items-center space-x-2 group">
            <div
              className={cx(
                "p-2.5 rounded-xl transition-colors duration-300",
                "bg-[rgb(var(--accent))]/30",
                "group-hover:bg-[rgb(var(--secondary))]/25"
              )}
            >
              <Leaf className="h-6 w-6 text-forest" />
            </div>

            <span className="font-bold text-xl text-bark tracking-tight group-hover:text-forest transition-colors">
              EcoRewards
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cx(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-mint/50 text-forest"
                      : "text-bark-light hover:text-forest hover:bg-earth-warm"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Search & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bark-light group-focus-within:text-forest transition-colors" />
              <input
                type="text"
                placeholder="Find recycling..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cx(
                  "pl-10 pr-4 py-2.5 w-56 text-sm rounded-2xl border border-border",
                  "bg-white/80 backdrop-blur-sm shadow-sm",
                  "focus:bg-white focus:border-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--accent))]/40",
                  "outline-none transition-all"
                )}
              />
            </div>

            <button
              className={cx(
                "p-2.5 rounded-xl transition-colors relative",
                "text-bark-light hover:text-forest hover:bg-[rgb(var(--accent))]/20"
              )}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-leaf rounded-full border border-white" />
            </button>

            <div
              className={cx(
                "h-10 w-10 rounded-xl flex items-center justify-center font-medium cursor-pointer",
                "bg-forest text-white shadow-md shadow-[rgb(var(--primary))]/20",
                "hover:opacity-95 transition-opacity"
              )}
              aria-label="Profile"
            >
              {!isLoaded ? (
                <div
                  className="h-5 w-5 rounded-full bg-white/30 animate-pulse"
                  aria-hidden="true"
                />
              ) : initials ? (
                initials
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="p-2 rounded-xl text-bark hover:bg-earth-warm"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-earth/95 backdrop-blur-md border-t border-border absolute w-full shadow-lg rounded-b-2xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => {
              const active = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cx(
                    "block px-4 py-3 rounded-xl text-base font-medium",
                    active ? "bg-mint/50 text-forest" : "text-bark hover:bg-earth-warm"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}