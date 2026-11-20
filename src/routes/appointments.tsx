import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Check, Clock3, ShieldCheck, Stethoscope } from "lucide-react";
import { z } from "zod";

import { ClinicShell } from "@/components/clinic-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { appointmentTimes, doctors, formatAppointmentDate, sampleAppointment, visitTypes } from "@/lib/clinic-data";

export const Route = createFileRoute("/appointments")({
  validateSearch: z.object({ doctorId: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Book an appointment | MediCare AI" },
      { name: "description", content: "Choose a sample doctor, appointment date, and time in the MediCare AI booking demo." },
      { property: "og:title", content: "Book an appointment | MediCare AI" },
      { property: "og:description", content: "Explore the sample appointment booking flow in the MediCare AI patient portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Appointments,
});

function Appointments() {
  const navigate = useNavigate({ from: "/appointments" });
  const search = Route.useSearch();
  const initialDoctor = doctors.find((doctor) => doctor.id === search.doctorId);
  const [doctorId, setDoctorId] = useState(initialDoctor?.id ?? doctors[0]?.id ?? "");
  const [visitType, setVisitType] = useState<string>(visitTypes[0] ?? "General consultation");
  const [date, setDate] = useState<string>(sampleAppointment.date);
  const [time, setTime] = useState<string>(appointmentTimes[1] ?? "10:30 AM");
  const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedDoctor || !time || !date) return;
    void navigate({
      to: "/appointment-confirmation",
      search: { doctorId, date, time, visitType },
    });
  }

  return (
    <ClinicShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <p className="text-sm font-medium text-primary">Appointments</p>
          <h1 className="mt-2 text-3xl font-bold">Plan your next visit</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Pick a doctor and a time that works for you. This demo does not send or save appointment details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 rounded-lg border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3 border-b pb-5">
              <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground"><CalendarDays className="size-5" /></span>
              <div>
                <h2 className="font-semibold">Appointment details</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Choose a provider, date, and time.</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Patient name" htmlFor="patient-name">
                <Input id="patient-name" name="patientName" placeholder="Your name" autoComplete="name" required />
              </Field>
              <Field label="Email address" htmlFor="patient-email">
                <Input id="patient-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              </Field>
              <Field label="Choose a doctor" htmlFor="doctor-select" className="sm:col-span-2">
                <Select value={doctorId} onValueChange={setDoctorId}>
                  <SelectTrigger id="doctor-select" aria-label="Choose a doctor" className="h-11">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>{doctor.name} · {doctor.specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Visit type" htmlFor="visit-type" className="sm:col-span-2">
                <Select value={visitType} onValueChange={setVisitType}>
                  <SelectTrigger id="visit-type" aria-label="Visit type" className="h-11">
                    <SelectValue placeholder="Choose visit type" />
                  </SelectTrigger>
                  <SelectContent>
                    {visitTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Preferred date" htmlFor="appointment-date" className="sm:col-span-2">
                <Input
                  id="appointment-date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  className="h-11"
                />
              </Field>
            </div>

            <fieldset>
              <legend className="text-sm font-medium">Available times</legend>
              <p className="mb-3 mt-1 text-xs text-muted-foreground">All times are sample availability.</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {appointmentTimes.map((slot) => {
                  const isSelected = time === slot;
                  return (
                    <Button
                      key={slot}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      aria-pressed={isSelected}
                      onClick={() => setTime(slot)}
                      className="h-11 justify-center"
                    >
                      {isSelected && <Check className="size-4" />}
                      {slot}
                    </Button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex items-start gap-2 rounded-md bg-muted px-3 py-3 text-xs leading-5 text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-secondary-foreground" />
              <p>Prototype only: your entries are not saved or sent. Use sample details to explore the flow.</p>
            </div>
          </div>

          <aside className="flex flex-col rounded-lg border bg-card p-5 sm:p-7" aria-label="Appointment summary">
            <div className="flex items-center gap-3 border-b pb-5">
              <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-secondary-foreground"><Stethoscope className="size-5" /></span>
              <div>
                <h2 className="font-semibold">Visit summary</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Review your choices</p>
              </div>
            </div>
            <dl className="mt-5 space-y-5 text-sm">
              <SummaryItem label="Doctor" value={selectedDoctor?.name ?? "Select a doctor"} detail={selectedDoctor?.specialty ?? ""} />
              <SummaryItem label="Visit type" value={visitType} />
              <SummaryItem label="Date" value={formatAppointmentDate(date)} />
              <SummaryItem label="Time" value={time} icon={<Clock3 className="size-4" />} />
            </dl>
            <div className="mt-auto pt-8">
              <Button type="submit" size="lg" className="w-full">Continue to confirmation</Button>
              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">No real booking is created by this preview.</p>
            </div>
          </aside>
        </form>
      </div>
    </ClinicShell>
  );
}

function Field({ label, htmlFor, className, children }: { label: string; htmlFor: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

function SummaryItem({ label, value, detail, icon }: { label: string; value: string; detail?: string; icon?: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 flex items-center gap-2 font-medium">{icon}{value}</dd>
      {detail && <p className="mt-1 text-xs text-muted-foreground">{detail}</p>}
    </div>
  );
}