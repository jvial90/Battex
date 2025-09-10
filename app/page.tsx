"use client";

import ModelSteps from "@/components/model/ModelSteps";
import SolutionsCarousel from "@/components/solutions/SolutionsCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import React from "react";
import AnimatedEnergyCard from "../components/energy/AnimatedEnergyCard";
import SmoothLink from "../components/SmoothLink";
import "./globals.css";



// Detect when we've scrolled past the hero
function useHeaderMode(sentinelId = "after-hero", headerH = 64) {
  const [mode, setMode] = React.useState<"hero" | "content">("hero");
  React.useEffect(() => {
    const el = document.getElementById(sentinelId);
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setMode(entry.isIntersecting ? "content" : "hero"),
      { rootMargin: `-${headerH}px 0px 0px 0px`, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sentinelId, headerH]);
  return mode;
}



/** ======== THEME (edit here) ======== */
const THEME = {
  brand: "BATTEX",
  primary: "#5B21E6", // morado Battex
  gradient: "from-[#5B21E6] via-[#7C3AED] to-[#A78BFA]",
  logo: "/logo-battex.png", // coloca tu logo en /public
  email: "mzanartu@battex.cl",
  phone: "+56 9 8231 3188",
};


/** Reusable section shell */
function Section({
  id,
  title,
  children,            // may be undefined
  framed = false,
}: {
  id?: string;
  title?: string;
  children?: React.ReactNode;   // <-- make optional
  framed?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${framed ? "px-6 md:px-10 py-12" : "py-16 sm:py-20"}`}
    >
      {framed ? (
        <>
          {title && <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>}
          <div className={title ? "mt-6" : ""}>{children}</div>
        </>
      ) : (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {title && <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>}
          <div className={title ? "mt-6" : ""}>{children}</div>
        </div>
      )}
    </section>
  );
}

// Track which section is currently in view
function useActiveSection(ids: string[], headerOffset = 96) {
  const [activeId, setActiveId] = React.useState(ids[0] ?? "");

  React.useEffect(() => {
    if (!ids.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Prefer the *latest* section that became visible
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      {
        // account for sticky header and favor the section near the middle
        rootMargin: `-${headerOffset}px 0px -60% 0px`,
        threshold: [0.2, 0.4, 0.6],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [ids, headerOffset]);

  return activeId;
}



type TeamMember = {
  name: string;
  bio: string;
  email?: string | null;
  linkedin?: string | null;
};

const TEAM: TeamMember[] = [
  {
    name: "Maximiliano ZaÑartu",
    bio:
      "Co-founder. Ing. civil industrial eléctrico PUC, MBA IESE. +10 años en distribución, transmisión y generación.",
    email: "mzanartu@battex.cl",
    linkedin: "https://www.linkedin.com/in/maximiliano-zanartu/"
  },
  {
    name: "Juan Luis Vial",
    bio:
      "Co-founder. Ing. civil industrial eléctrico PUC, MBA Green Energies & Sustainable Business. +10 años en regulación y mercados eléctricos.",
    email: "jvial@battex.cl",
    linkedin: "https://www.linkedin.com/in/tu-perfil-juan/"
  },
  {
    name: "Javier Calvo",
    bio:
      "Co-founder. Ing. civil mecánico PUC, Master Sustainable Energy Systems. +10 años en sistemas de energía térmica.",
    email: null,
    linkedin: "https://www.linkedin.com/in/tu-perfil-javier/"
  }
];








// Home!!
export default function Home() {
   const headerMode = useHeaderMode("after-hero", 64); // "hero" | "content"

const SECTIONS = [
  { id: "soluciones", label: "Soluciones" },
  { id: "modelo",      label: "Modelo Battex" },
  { id: "equipo",    label: "Equipo" },
  { id: "contacto",  label: "Contacto" },
];

const activeId = useActiveSection(SECTIONS.map(s => s.id), 96);

// --- Google Forms submission state/handlers ---
const [leadEmail, setLeadEmail] = React.useState("");
const [submitting, setSubmitting] = React.useState(false);
const [submitted, setSubmitted] = React.useState(false);
const [ok, setOk] = React.useState<null | boolean>(null);

function handleGFormSubmit(e: React.FormEvent) {
  // The POST goes straight to Google; we just flag the UI
  setSubmitting(true);
  setOk(null);
  setSubmitted(true);
}

function handleIframeLoad() {
  // The hidden iframe loads once on mount and again after submit.
  // Only act after a submit.
  if (submitted) {
    setSubmitting(false);
    setOk(true);
    setLeadEmail("");
    setSubmitted(false);
  }
}
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      
      
      {/* Header */}
      <header
  className={`sticky top-0 z-40 backdrop-blur transition-[background-color,border-color,box-shadow] ${
    headerMode === "hero"
      ? "bg-transparent border-transparent shadow-none"
      : "bg-white/85 border-b border-slate-200/60 shadow-md"
  }`}
>
        <div className="mx-auto max-w-6xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
  
  {/* Purple box if needed */}
  {/*<div className="h-8 w-8 rounded-xl" style={{ background: THEME.primary }} /> */}

  {/* Actual logo next to it */}
  <Image
    src="/logo-battex.png"
    alt="Battex logo"
    width={100}   // tweak until it balances with the box
    height={24}
    className="h-6 w-auto"
    priority
  />
</div>

         <nav aria-label="Primary" className="hidden md:flex items-center">
  <div
    className="rounded-full bg-white/85 backdrop-blur px-6 py-2
               shadow-lg ring-1 ring-slate-200/60"
  >
    <ul className="flex items-center gap-6 text-[15px] font-semibold">
      {SECTIONS.map(({ id, label }) => (
        <li key={id}>
          <SmoothLink
            to={`#${id}`}
            duration={1500}
            aria-current={activeId === id ? "page" : undefined}
            className={[
              "px-3 py-2 rounded-full transition-colors",
              activeId === id
                ? "text-[#5B21E6] bg-white shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            ].join(" ")}
          >
            {label}
          </SmoothLink>
        </li>
      ))}

      {/* CTA inside the pill */}
      <li className="pl-2">
        <Button
          className="h-auto text-sm font-semibold rounded-full px-5 py-2
                     bg-gradient-to-r from-[#5B21E6] to-[#A78BFA]
                     text-white shadow-md hover:shadow-lg"
        >
          Solicitar asesoría
        </Button>
      </li>
    </ul>
  </div>
</nav>

        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
       {/* soft radial glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
         style={{ background: 'radial-gradient(50% 50% at 50% 50%, #A78BFA 0%, rgba(167,139,250,0) 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(50% 50% at 50% 50%, #5B21E6 0%, rgba(91,33,230,0) 70%)' }}
      />

        <div className={`absolute inset-0 -z-10 opacity-10 bg-gradient-to-br ${THEME.gradient}`} />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <img src={THEME.logo} alt="Battex" className="h-10 w-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1]">
              Súmate a la revolución de baterías apoyado por expertos
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Innovando para apoyar <b>industrias</b> a <b>eficientar su consumo eléctrico</b>.
            </p>
            
            {/* Hidden iframe keeps the page in place and lets us detect completion */}
<iframe
  name="gform_hidden_iframe"
  style={{ display: "none" }}
  onLoad={handleIframeLoad}
/>

{/* Form posts directly to Google Forms */}
<form
  action="https://docs.google.com/forms/d/e/1FAIpQLSdEkTW_520j7NSikTBe5Qd3DyI4VheM1BFT4id9UrB8-hA1SA/formResponse"
  method="POST"
  target="gform_hidden_iframe"
  onSubmit={handleGFormSubmit}
  className="mt-8 flex w-full max-w-md gap-3"
>
  {/* IMPORTANT: name MUST be entry.<ENTRY_ID> from your Google Form */}
  <Input
    type="email"
    name="entry.586447229"
    value={leadEmail}
    onChange={(e) => setLeadEmail(e.target.value)}
    placeholder="tu@empresa.com"
    className="h-12 rounded-2xl"
    required
  />

  <Button
    type="submit"
    disabled={submitting}
    className="rounded-2xl transition-colors
               bg-[#5B21E6]
               hover:bg-gradient-to-r hover:from-[#5B21E6] hover:to-[#A78BFA]
               text-white shadow-sm hover:shadow"
  >
    {submitting ? "Enviando…" : "Armemos tu proyecto"}
  </Button>
</form>

{/* Feedback message */}
{ok === true && (
  <p className="mt-3 text-xs text-green-600">
    ¡Gracias! Te contactaremos pronto.
  </p>
)}


            {/*<p className="mt-3 text-xs text-slate-500">Sin compromiso. Respuesta en 24–48h.</p>*/}

          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>

          <AnimatedEnergyCard durationSec={5} />


          </motion.div>
        </div>

      </section>

<div id="after-hero" className="h-px" aria-hidden="true" />

{/* Content sections (no outer rounded frame) */}

{/* Sección de soluciones - pasar fotos rápido*/}
<Section id="soluciones" title="Soluciones">
  <SolutionsCarousel autoMs={5000} />
</Section>



<Section id="modelo" title="Modelo Battex">
  <ModelSteps primary="#5B21E6" />
</Section>



<Section id="equipo" title="Equipo">
  <div className="grid md:grid-cols-3 gap-6">
    {TEAM.map((p) => (
      <Card key={p.name} className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold">{p.name}</div>
              <p className="mt-2 text-sm text-slate-700">{p.bio}</p>

              {/* email (optional) */}
              {p.email && p.email !== "—" && (
                <p className="mt-3 text-xs">
                  <a
                    href={`mailto:${p.email}`}
                    className="text-slate-500 hover:text-slate-700 underline"
                  >
                    {p.email}
                  </a>
                </p>
              )}
            </div>

            {/* LinkedIn icon button (optional) */}
            {p.linkedin && (
              <a
                href={p.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn profile of ${p.name}`}
                title="LinkedIn"
                className="shrink-0 inline-flex h-9 w-9 items-center justify-center
                           rounded-full border border-slate-200 text-slate-500
                           hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</Section>

<Section id="contacto">
  <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 text-center shadow-sm">
    <h3 className="text-2xl md:text-3xl font-bold">
      Contáctanos para diseñar una solución a tu medida 
    </h3>
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
      <div className="relative w-full max-w-md">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="tu@empresa.com" className="pl-9 h-12 rounded-2xl" />
      </div>
      <Button
        size="lg"
        className="rounded-2xl transition-colors bg-[#5B21E6] hover:bg-gradient-to-r hover:from-[#5B21E6] hover:to-[#A78BFA] text-white shadow-sm hover:shadow"
      >
        Enviar
      </Button>
    </div>
    <p className="mt-4 text-sm text-slate-600">
      También puedes escribirnos a <a className="underline" href={`mailto:${THEME.email}`}>{THEME.email}</a> o llamar al {THEME.phone}.
    </p>
  </div>
</Section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg" style={{ background: THEME.primary }} />
            <span>© {new Date().getFullYear()} {THEME.brand}. Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700">Privacidad</a>
            <a href="#" className="hover:text-slate-700">Términos</a>
            <a href="#" className="hover:text-slate-700">Seguridad</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

