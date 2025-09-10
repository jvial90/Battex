"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

type Slide = {
  id: string;
  title: string;     // shown in the mini menu (tabs)
  heading: string;   // large title in the slide
  body: string;      // body copy in the slide
  image: string;     // path inside /public (e.g., "/solutions/sol-1.jpg")
  alt?: string;
};

const SLIDES: Slide[] = [
  {
    id: "Peak Shaving",
    title: "BATTEX Peak Shaving",
    heading: "Gestión de consumo en horas punta",
    body:
      "Cargamos y descargamos en las horas correctas con nuestro software AI. " +
      "Control remoto y simple -> déjalo en nuestras manos.",
    image: "/solutions/sol-1.jpg", // put your file in /public/solutions/sol-1.jpg
    alt: "",
  },
  {
    id: "Reducción PPA",
    title: "BATTEX PPA Reduction",
    heading: "Baja tu costo de PPA",
    body:
      "Te apoyamos en estructurar un PPA que refleje los beneficios de tener tu batería. " +
      "Reduce costos reduciendo tu consumo nocturno",
    image: "/solutions/sol-2.jpg",
    alt: "",
  },
  {
    id: "Respaldo",
    title: "BATTEX Back Up",
    heading: "Dale confiabilidad a tu suministro",
    body:
      "Que tu operación no sufra más con los cortes de suministro. " +
      "Te otorgamos un servicio diseñado para cuidar tus equipos más críticos",
    image: "/solutions/sol-3.jpg",
    alt: "",
  },
  {
    id: "Gx Diesel",
    title: "BATTEX Less Diesel",
    heading: "- diesel = + ahorro y - emisiones",
    body:
      "Un software diseñado para optimizar y simplificar tu operación de generadores. " +
      "Complementado con baterías cuando sea necesario",
    image: "/solutions/sol-4.jpg",
    alt: "",
  },
];

export default function SolutionsCarousel({ autoMs = 5000 }: { autoMs?: number }) {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // auto-advance every 5s (or autoMs), unless paused
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), autoMs);
    return () => clearInterval(t);
  }, [paused, autoMs]);

  const current = SLIDES[idx];

  const goto = (i: number) => {
    setIdx(i);
    setPaused(true); // stop auto-advance when user chooses a slide
  };

  return (
    <div className="space-y-5">
      {/* mini menu / tabs */}
      <div className="flex flex-wrap gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goto(i)}
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors border
              ${i === idx
                ? "bg-[#5B21E6] text-white border-transparent"
                : "bg-white/80 text-slate-700 border-slate-200 hover:bg-white"
              }`}
          >
            {s.title}
          </button>
        ))}
        <button
          onClick={() => setPaused((p) => !p)}
          className="ml-auto rounded-full px-3.5 py-1.5 text-sm border border-slate-200 bg-white/80 text-slate-700 hover:bg-white"
          title={paused ? "Reanudar" : "Pausar"}
        >
          {paused ? "▶ Reanudar" : "⏸ Pausar"}
        </button>
      </div>

      {/* slide */}
      <div
        className="grid md:grid-cols-2 gap-6 items-center rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Image */}
        <div className="relative w-full h-[220px] md:h-[320px] rounded-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0.0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.alt ?? current.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`txt-${current.id}`}
              initial={{ opacity: 0.0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-bold">{current.heading}</h3>
              <p className="mt-3 text-sm md:text-base text-slate-700">{current.body}</p>

              {/* pager */}
              <div className="mt-5 flex items-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Ir a slide ${i + 1}`}
                    onClick={() => goto(i)}
                    className={`h-2.5 w-2.5 rounded-full transition
                      ${i === idx ? "bg-[#5B21E6]" : "bg-slate-300 hover:bg-slate-400"}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
