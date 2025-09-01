"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

/** ======== THEME (edit here) ======== */
const THEME = {
  brand: "BATTEX",
  primary: "#5B21E6", // morado Battex del deck (ajústalo si tienes el hex exacto)
  gradient: "from-[#5B21E6] via-[#7C3AED] to-[#A78BFA]",
  logo: "/logo-battex.png", // coloca tu logo en /public
  email: "contacto@battex.cl",
  phone: "+56 9 8231 3188",
};

/** Reusable section shell */
function Section({ id, title, children }: { id?: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {title && <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>}
        <div className={title ? "mt-6" : ""}>{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl" style={{ background: THEME.primary }} />
            <span className="font-semibold text-lg">{THEME.brand}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#problemas" className="hover:text-slate-900">Problemas</a>
            <a href="#como" className="hover:text-slate-900">¿Cómo funciona?</a>
            <a href="#modelo" className="hover:text-slate-900">Modelo Battex</a>
            <a href="#equipo" className="hover:text-slate-900">Equipo</a>
            <a href="#contacto" className="hover:text-slate-900">Contacto</a>
            <Button className="rounded-2xl" style={{ backgroundColor: THEME.primary }}>Solicitar asesoría</Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 -z-10 opacity-10 bg-gradient-to-br ${THEME.gradient}`} />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <img src={THEME.logo} alt="Battex" className="h-10 w-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1]">
              Expertos en soluciones energéticas
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Nuestro objetivo es ayudar a <b>industrias</b> a <b>eficientar su consumo eléctrico</b>.
            </p>
            <div className="mt-8 flex w-full max-w-md gap-3">
              <Input placeholder="tu@empresa.com" className="h-12 rounded-2xl" />
              <Button className="h-12 rounded-2xl px-6" style={{ backgroundColor: THEME.primary }}>
                Contáctanos
              </Button>
            </div>
            <p className="mt-3 text-xs text-slate-500">Sin compromiso. Respuesta en 24–48h.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
            <Card className="rounded-3xl shadow-xl">
              <CardContent className="p-6">
                <div className="aspect-video w-full rounded-2xl border border-slate-200 bg-white grid place-items-center">
                  <div className="text-center p-6">
                    <div className="text-5xl">🔋</div>
                    <p className="mt-3 text-sm text-slate-500">Agrega aquí una imagen/diagrama de tu solución.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Problemas → Propuesta de valor (del slide) */}
      <Section id="problemas" title="Problemas que resolvemos">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-semibold">Tarifas eléctricas en aumento</h3>
              <p className="mt-2 text-sm text-slate-700">
                Disminución del cobro por <b>“Potencia de Punta”</b> y <b>arbitraje de precios</b> mediante almacenamiento.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-semibold">Cortes de suministro más frecuentes</h3>
              <p className="mt-2 text-sm text-slate-700">
                <b>Batería como respaldo eléctrico</b> para continuidad operacional.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ¿Cómo funciona Battex? */}
      <Section id="como" title="¿Cómo funciona Battex?">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "1.", t: "Instalamos la batería en tus instalaciones." },
            { n: "2.", t: "Operamos la batería para evitar consumo cuando la electricidad es cara (carga/descarga óptima)." },
            { n: "3.", t: "Damos respaldo inmediato ante cortes y complementamos grupos electrógenos para bajar costos y emisiones." },
          ].map((step) => (
            <Card key={step.n} className="rounded-2xl border border-slate-200">
              <CardContent className="p-6">
                <div className="text-2xl font-black" style={{ color: THEME.primary }}>{step.n}</div>
                <p className="mt-3 text-sm text-slate-700">{step.t}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Modelo Battex */}
      <Section id="modelo" title="Modelo Battex">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { h: "Autofinanciado", d: "Operación óptima con IA para máximo ahorro con menor inversión." },
            { h: "Co-financiado", d: "Compartimos ahorros por un período; reduces CAPEX inicial." },
            { h: "100% financiamiento", d: "Sin inversión inicial; Battex recupera vía ahorros por años limitados." },
          ].map((m) => (
            <Card key={m.h} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="font-semibold">{m.h}</div>
                <p className="mt-2 text-sm text-slate-700">{m.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-sm text-slate-500">
          Operación remota y esquemas de carga/descarga que no afectan la operación normal de tu planta.
        </div>
      </Section>

      {/* Equipo */}
      <Section id="equipo" title="Equipo">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: "Maximiliano ZaÑartu",
              r: "Co-founder. Ing. civil industrial eléctrico PUC, MBA IESE. +10 años en distribución, transmisión y generación.",
              e: "mzanartu@battex.cl",
            },
            {
              n: "Juan Luis Vial",
              r: "Co-founder. Ing. civil industrial eléctrico PUC, MBA Green Energies & Sustainable Business. +10 años en regulación y mercados eléctricos.",
              e: "jvial@battex.cl",
            },
            {
              n: "Javier Calvo",
              r: "Co-founder. Ing. civil mecánico PUC, Master Sustainable Energy Systems. +10 años en sistemas de energía térmica.",
              e: "—",
            },
          ].map((p) => (
            <Card key={p.n} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="font-semibold">{p.n}</div>
                <p className="mt-2 text-sm text-slate-700">{p.r}</p>
                {p.e !== "—" && <p className="mt-2 text-xs text-slate-500">{p.e}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA / Contacto */}
      <Section id="contacto">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 text-center shadow-sm">
          <h3 className="text-2xl md:text-3xl font-bold">Contáctanos para evaluar tu solución y bajar tus costos eléctricos</h3>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full max-w-md">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="tu@empresa.com" className="pl-9 h-12 rounded-2xl" />
            </div>
            <Button size="lg" className="rounded-2xl" style={{ backgroundColor: THEME.primary }}>
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

