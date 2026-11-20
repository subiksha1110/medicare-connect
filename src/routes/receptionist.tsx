import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, CalendarDays, CircleHelp, Send, ShieldAlert, Stethoscope } from "lucide-react";

import { ClinicShell } from "@/components/clinic-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/receptionist")({
  head: () => ({
    meta: [
      { title: "AI receptionist | MediCare AI" },
      { name: "description", content: "Try the MediCare AI receptionist demo for appointment and hospital navigation help." },
      { property: "og:title", content: "AI receptionist | MediCare AI" },
      { property: "og:description", content: "A sample receptionist chat for appointment and portal questions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Receptionist,
});

type ChatMessage = { id: number; role: "assistant" | "user"; text: string };

const suggestedQuestions = ["How do I book a visit?", "How can I find a doctor?"];

function Receptionist() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hello! I can help you find your way around this portal, browse sample doctors, or start a demo appointment. What can I help with?",
    },
  ]);

  function sendMessage(value: string) {
    const text = value.trim();
    if (!text) return;
    const lower = text.toLowerCase();
    let response = "I can help with booking steps, doctor specialties, and finding your way around this portal. I can't provide medical advice.";
    if (lower.includes("emergency")) {
      response = "If someone may be in immediate danger, contact your local emergency services or go to the nearest emergency department.";
    } else if (lower.includes("book") || lower.includes("appointment") || lower.includes("visit")) {
      response = "You can choose a sample doctor, visit type, date, and time on the appointment page. The demo does not save or send a booking.";
    } else if (lower.includes("doctor") || lower.includes("specialty") || lower.includes("speciality")) {
      response = "Open Find a doctor to browse the sample care team by name or specialty. The profiles and availability shown are for demonstration only.";
    } else if (lower.includes("hour") || lower.includes("address") || lower.includes("location") || lower.includes("direction")) {
      response = "This sample portal doesn't include a real clinic address or opening hours yet. Please contact your hospital directly for current details.";
    }
    const nextId = Date.now();
    setMessages((current) => [...current, { id: nextId, role: "user", text }, { id: nextId + 1, role: "assistant", text: response }]);
    setDraft("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(draft);
  }

  return (
    <ClinicShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <p className="text-sm font-medium text-primary">Reception</p>
          <h1 className="mt-2 text-3xl font-bold">How can we help?</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Ask the receptionist demo about appointments or finding your way around the portal.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
          <section className="flex min-h-[34rem] flex-col overflow-hidden rounded-lg border bg-card" aria-label="Receptionist chat">
            <div className="flex items-center gap-3 border-b px-5 py-4">
              <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground"><Bot className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold">MediCare AI receptionist</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Demo mode · Sample replies</p>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">Online</span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-muted/40 p-4 sm:p-6" aria-live="polite">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p className={`max-w-[88%] rounded-lg px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-primary text-primary-foreground" : "border bg-card text-foreground"}`}>
                    {message.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <Button key={question} type="button" variant="outline" size="sm" onClick={() => sendMessage(question)}>
                    {question}
                  </Button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Type a question..."
                  aria-label="Type a question for the receptionist"
                  autoComplete="off"
                  className="h-11"
                />
                <Button type="submit" size="icon" className="size-11 shrink-0" aria-label="Send message" title="Send message">
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-lg border bg-card p-5">
              <div className="flex items-center gap-2"><CircleHelp className="size-4 text-primary" /><h2 className="font-semibold">I can help with</h2></div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" /> Starting an appointment</li>
                <li className="flex items-center gap-2"><Stethoscope className="size-4 text-primary" /> Finding a specialty</li>
                <li className="flex items-center gap-2"><CircleHelp className="size-4 text-primary" /> Using this portal</li>
              </ul>
              <Button asChild variant="outline" className="mt-5 w-full"><Link to="/appointments">Start booking</Link></Button>
            </section>

            <section className="rounded-lg border bg-muted p-5">
              <div className="flex items-center gap-2"><ShieldAlert className="size-4 text-secondary-foreground" /><h2 className="font-semibold">Important</h2></div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                This demo uses preset replies. It does not diagnose, recommend treatment, or replace a healthcare professional.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </ClinicShell>
  );
}