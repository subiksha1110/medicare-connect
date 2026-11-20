import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Clock3, MessageCircle, Stethoscope } from "lucide-react";

import { ClinicShell } from "@/components/clinic-shell";
import { Button } from "@/components/ui/button";
import { doctors, formatAppointmentDate, sampleAppointment } from "@/lib/clinic-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediCare AI | Patient overview" },
      { name: "description", content: "Welcome to MediCare AI, a simple patient portal for browsing sample doctors and appointments." },
      { property: "og:title", content: "MediCare AI | Patient overview" },
      { property: "og:description", content: "A welcoming sample patient portal for appointments, doctors, and receptionist help." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const doctor = doctors.find((item) => item.id === sampleAppointment.doctorId);

  return (
    <ClinicShell>
      <div className="space-y-8">
        <section className="grid items-center gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10" aria-labelledby="welcome-title">
          <div className="py-2">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-secondary-foreground">
              <span className="size-2 rounded-full bg-secondary-foreground" />
              Your patient portal
            </span>
            <h1 id="welcome-title" className="mt-5 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
              Welcome to simpler, more thoughtful care.
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              Book a visit, meet your care team, or ask our receptionist demo for help getting started.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/appointments"><CalendarDays /> Book an appointment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/doctors"><Stethoscope /> Browse doctors</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Demo experience · No information is saved or sent</p>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-muted">
            <img
              src="/medicare-reception.jpg"
              alt="A receptionist welcoming a patient at a bright clinic front desk"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 via-foreground/35 to-transparent p-5 pt-14 text-background sm:p-6 sm:pt-20">
              <p className="text-sm font-semibold">Here for every next step</p>
              <p className="mt-1 text-xs text-background/85">Friendly support, right from the start.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3" aria-label="Clinic overview">
          <StatCard icon={<Stethoscope />} label="Care team" value={String(doctors.length).padStart(2, "0")} note="sample doctors" />
          <StatCard icon={<CalendarDays />} label="Next visit" value="Nov 24" note="sample appointment" />
          <StatCard icon={<MessageCircle />} label="Reception" value="Here to help" note="demo chat available" />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border bg-card p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Coming up</p>
                <h2 className="mt-2 text-xl font-semibold">Your next appointment</h2>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">Sample schedule</span>
            </div>
            <div className="mt-5 flex flex-col gap-5 border-t pt-5 sm:flex-row sm:items-center">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <CalendarDays className="size-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{doctor?.name ?? "Care team"}</p>
                <p className="mt-1 text-sm text-muted-foreground">{doctor?.specialty ?? "Primary care"} · {sampleAppointment.visitType}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-foreground">
                  <Clock3 className="size-4 text-muted-foreground" />
                  {formatAppointmentDate(sampleAppointment.date)} · {sampleAppointment.time}
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/appointments">View details <ArrowUpRight className="size-4" /></Link>
              </Button>
            </div>
            <p className="mt-5 border-t pt-4 text-xs leading-5 text-muted-foreground">
              This is sample appointment information for the prototype, not a real booking.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Quick help</p>
            <h2 className="mt-2 text-xl font-semibold">What would you like to do?</h2>
            <div className="mt-5 divide-y">
              <QuickLink to="/appointments" icon={<CalendarDays />} title="Plan a visit" description="Choose a doctor and a time" />
              <QuickLink to="/doctors" icon={<Stethoscope />} title="Meet the doctors" description="Explore sample specialties" />
              <QuickLink to="/receptionist" icon={<MessageCircle />} title="Ask the receptionist" description="Get help with the portal" />
            </div>
          </div>
        </section>
      </div>
    </ClinicShell>
  );
}

function StatCard({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) {
  return (
    <div className="flex min-h-28 items-center gap-4 rounded-lg border bg-card p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 truncate text-lg font-semibold">{value}</p>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}

function QuickLink({ to, icon, title, description }: { to: "/appointments" | "/doctors" | "/receptionist"; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 py-4 first:pt-3 last:pb-1 hover:text-primary">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}
