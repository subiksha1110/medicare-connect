import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronRight,
  HeartPulse,
  LayoutDashboard,
  MessageCircle,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Overview", mobileLabel: "Home", icon: LayoutDashboard },
  { to: "/appointments", label: "Appointments", mobileLabel: "Visits", icon: CalendarDays },
  { to: "/doctors", label: "Find a doctor", mobileLabel: "Doctors", icon: Stethoscope },
  { to: "/receptionist", label: "AI receptionist", mobileLabel: "Reception", icon: MessageCircle },
] as const;

export function ClinicShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const activePath = pathname === "/appointment-confirmation" ? "/appointments" : pathname;
  const activeItem = navItems.find((item) => item.to === activePath) ?? navItems[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-card px-4 py-6 lg:flex">
        <Link to="/" className="mb-10 flex items-center gap-3 px-2" aria-label="MediCare AI home">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartPulse className="size-6" />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-bold leading-tight">MediCare AI</span>
            <span className="mt-1 block text-xs text-muted-foreground">Patient portal</span>
          </span>
        </Link>

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Your care
        </p>
        <nav className="flex flex-col gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isActive ? "page" : undefined}
                className={`group flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-[18px] shrink-0" />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="ml-auto size-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-lg border bg-background p-4">
          <span className="mb-3 flex size-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
            <HeartPulse className="size-5" />
          </span>
          <p className="text-sm font-semibold">A little help goes a long way</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Need help finding your next step?
          </p>
          <Button asChild variant="ghost" size="sm" className="mt-2 -ml-3">
            <Link to="/receptionist">
              Talk to reception <ChevronRight className="size-4" />
            </Link>
          </Button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-2 lg:hidden" aria-label="MediCare AI home">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <HeartPulse className="size-5" />
              </span>
              <span className="text-sm font-bold">MediCare AI</span>
            </Link>
            <div className="hidden min-w-0 lg:block">
              <p className="truncate text-sm font-semibold">{activeItem.label}</p>
              <p className="text-xs text-muted-foreground">A simpler way to manage your care</p>
            </div>
            <Button asChild size="sm" className="ml-auto shrink-0">
              <Link to="/appointments">
                <CalendarDays className="size-4" />
                <span className="hidden sm:inline">Book an appointment</span>
                <span className="sm:hidden">Book visit</span>
              </Link>
            </Button>
          </div>
          <nav className="grid grid-cols-4 gap-1 border-t px-3 py-2 lg:hidden" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className={`flex min-h-10 min-w-0 items-center justify-center gap-1 rounded-md px-1 text-[11px] font-medium ${
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="size-4" />
                  <span className="truncate">{item.mobileLabel}</span>
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}