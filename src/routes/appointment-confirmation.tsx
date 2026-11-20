import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, CalendarDays, Check, Clock3, House, Stethoscope } from "lucide-react";

import { ClinicShell } from "@/components/clinic-shell";
import { Button } from "@/components/ui/button";
import { doctors, formatAppointmentDate, sampleAppointment } from "@/lib/clinic-data";

export const Route = createFileRoute("/appointment-confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({
    doctorId: typeof search["doctorId"] === "string" ? search["doctorId"] : undefined,
    date: typeof search["date"] === "string" ? search["date"] : undefined,
    time: typeof search["time"] === "string" ? search["time"] : undefined,
    visitType: typeof search["visitType"] === "string" ? search["visitType"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Appointment confirmation | MediCare AI" },
      { name: "description", content: "Review the sample appointment confirmation in the MediCare AI booking demo." },
      { property: "og:title", content: "Appointment confirmation | MediCare AI" },
      { property: "og:description", content: "Your sample appointment details in the MediCare AI patient portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppointmentConfirmation,
});

function AppointmentConfirmation() {
  const search = Route.useSearch();
  const doctor = doctors.find((item) => item.id === search.doctorId) ?? doctors.find((item) => item.id === sampleAppointment.doctorId);
  const date = search.date ?? sampleAppointment.date;
  const time = search.time ?? sampleAppointment.time;
  const visitType = search.visitType ?? sampleAppointment.visitType;

  return (
    <ClinicShell>
      <div className="mx-auto max-w-3xl py-3">
        <section className="overflow-hidden rounded-lg border bg-card">
          <div className="flex flex-col items-center border-b bg-accent px-5 py-10 text-center sm:px-8">
            <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground"><Check className="size-8" /></span>
            <p className="mt-5 text-sm font-medium text-accent-foreground">Appointment preview</p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Your demo visit is ready</h1>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Review the sample details below. This confirmation is for the prototype only; nothing was booked or sent.
            </p>
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex items-center gap-3 border-b pb-5">
              <span className="flex size-12 items-center justify-center rounded-lg bg-muted text-foreground"><CalendarCheck className="size-6" /></span>
              <div>
                <h2 className="font-semibold">Appointment summary</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Sample appointment · Not a real booking</p>
              </div>
            </div>
            <dl className="grid gap-x-8 gap-y-6 py-6 sm:grid-cols-2">
              <SummaryRow icon={<Stethoscope />} label="Doctor" value={doctor?.name ?? "Care team"} detail={doctor?.specialty ?? ""} />
              <SummaryRow icon={<CalendarDays />} label="Date" value={formatAppointmentDate(date)} detail={visitType} />
              <SummaryRow icon={<Clock3 />} label="Time" value={time} />
              <SummaryRow icon={<Check />} label="Status" value="Sample confirmation" detail="No patient details were saved" />
            </dl>
            <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row">
              <Button asChild className="flex-1"><Link to="/appointments">Book another demo visit</Link></Button>
              <Button asChild variant="outline" className="flex-1"><Link to="/"><House /> Return to overview</Link></Button>
            </div>
          </div>
        </section>
      </div>
    </ClinicShell>
  );
}

function SummaryRow({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail?: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-sm font-medium">{value}</dd>
        {detail && <p className="mt-1 text-xs text-muted-foreground">{detail}</p>}
      </div>
    </div>
  );
}