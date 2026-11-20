import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, Stethoscope } from "lucide-react";

import { ClinicShell } from "@/components/clinic-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { doctors } from "@/lib/clinic-data";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Find a doctor | MediCare AI" },
      { name: "description", content: "Browse sample doctors and specialties in the MediCare AI patient portal." },
      { property: "og:title", content: "Find a doctor | MediCare AI" },
      { property: "og:description", content: "Explore a sample directory of doctors and specialties." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Doctors,
});

function Doctors() {
  const [query, setQuery] = useState("");
  const filteredDoctors = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return doctors;
    return doctors.filter((doctor) => `${doctor.name} ${doctor.specialty} ${doctor.credentials}`.toLowerCase().includes(search));
  }, [query]);

  return (
    <ClinicShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Care team</p>
            <h1 className="mt-2 text-3xl font-bold">Meet your doctors</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Browse our sample directory by name or specialty. Profiles and availability are for demonstration only.
            </p>
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search doctors or specialties"
              aria-label="Search doctors or specialties"
              className="h-11 pl-9"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-y py-3 text-sm">
          <p className="font-medium">{filteredDoctors.length} sample {filteredDoctors.length === 1 ? "doctor" : "doctors"}</p>
          <span className="text-xs text-muted-foreground">Availability may not reflect real schedules</span>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredDoctors.map((doctor, index) => (
              <article key={doctor.id} className="flex min-h-64 flex-col rounded-lg border bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex size-14 items-center justify-center rounded-full text-sm font-semibold ${index % 3 === 0 ? "bg-accent text-accent-foreground" : index % 3 === 1 ? "bg-secondary text-secondary-foreground" : "bg-muted text-foreground"}`}>
                    {doctor.initials}
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">Sample profile</span>
                </div>
                <h2 className="mt-5 text-lg font-semibold">{doctor.name}</h2>
                <p className="mt-1 text-sm font-medium text-primary">{doctor.specialty}</p>
                <p className="mt-1 text-xs text-muted-foreground">{doctor.credentials}</p>
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <Stethoscope className="size-4" />
                  Sample availability: {doctor.availability}
                </div>
                <Button asChild variant="outline" className="mt-auto w-full">
                  <Link to="/appointments" search={{ doctorId: doctor.id }}>Book a visit <ArrowUpRight className="size-4" /></Link>
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed bg-card px-5 py-14 text-center">
            <Search className="mx-auto size-7 text-muted-foreground" />
            <h2 className="mt-3 font-semibold">No matching doctors</h2>
            <p className="mt-1 text-sm text-muted-foreground">Try a different name or specialty.</p>
          </div>
        )}
      </div>
    </ClinicShell>
  );
}