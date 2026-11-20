export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  initials: string;
  availability: string;
};

export const doctors: Doctor[] = [
  {
    id: "maya-chen",
    name: "Dr. Maya Chen",
    specialty: "Primary care",
    credentials: "MD · Family medicine",
    initials: "MC",
    availability: "Today, 2:00–4:30 PM",
  },
  {
    id: "elias-park",
    name: "Dr. Elias Park",
    specialty: "Cardiology",
    credentials: "MD · Cardiovascular care",
    initials: "EP",
    availability: "Tomorrow, 9:00 AM–12:00 PM",
  },
  {
    id: "amara-okafor",
    name: "Dr. Amara Okafor",
    specialty: "Dermatology",
    credentials: "MD · Skin health",
    initials: "AO",
    availability: "Wed, 1:00–4:00 PM",
  },
  {
    id: "lucas-bennett",
    name: "Dr. Lucas Bennett",
    specialty: "Orthopedics",
    credentials: "MD · Bone and joint care",
    initials: "LB",
    availability: "Thu, 10:00 AM–1:00 PM",
  },
  {
    id: "priya-nair",
    name: "Dr. Priya Nair",
    specialty: "Women's health",
    credentials: "MD · Women's health",
    initials: "PN",
    availability: "Fri, 9:30 AM–12:30 PM",
  },
  {
    id: "mateo-rivera",
    name: "Dr. Mateo Rivera",
    specialty: "Neurology",
    credentials: "MD · Neurology",
    initials: "MR",
    availability: "Mon, 11:00 AM–2:00 PM",
  },
];

export const appointmentTimes = ["9:30 AM", "10:30 AM", "11:45 AM", "1:15 PM", "2:30 PM", "3:45 PM"];

export const visitTypes = ["General consultation", "Follow-up visit", "Wellness check"];

export const sampleAppointment = {
  patientLabel: "Sample patient",
  doctorId: "maya-chen",
  date: "2026-11-24",
  time: "10:30 AM",
  visitType: "General consultation",
  status: "Confirmed",
} as const;

export function formatAppointmentDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "Date to be selected";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}