"use client";

import { motion } from "framer-motion";
import { ArrowRight, BatteryCharging, Brain, TrendingUp } from "lucide-react";
import React from "react";

type Step = {
  key: "design" | "finance" | "operation";
  num: string;
  title: string;
  body: string;
};

const DEFAULT_STEPS: Step[] = [
  {
    key: "design",
    num: "01",
    title: "Diseño Proyecto BESS",
    body: "Analizamos tu consumo eléctrico, dimensionamos el sistema y diseñamos el proyecto a tu medida con equipos de calidad.",
  },
  {
    key: "finance",
    num: "02",
    title: "Soluciones de Financiamiento",
    body: "Auto-financiado, co-financiado o 100% financiado: estructuramos la solución financiera que mejor se adapta a tus requisitos.",
  },
  {
    key: "operation",
    num: "03",
    title: "Operación Inteligente y Mantenimiento",
    body: "Operamos el sistema de forma óptima con inteligencia artificial para maximizar tus ahorros eléctricos y asegurar la continuidad operacional.",
  },
];

export default function ModelSteps({
  items = DEFAULT_STEPS,
  primary = "#5B21E6",
}: {
  items?: Step[];
  primary?: string;
}) {
  const [paused, setPaused] = React.useState(false);

  const elements: React.ReactNode[] = [];

  items.forEach((s, i) => {
    elements.push(
      <motion.div
        key={s.key}
        onHoverStart={() => setPaused(true)}
        onHoverEnd={() => setPaused(false)}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col"
      >
        {/* Card header with gradient + icon + watermark number */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{
            background: `linear-gradient(135deg, ${primary}18 0%, ${primary}08 100%)`,
          }}
        >
          <motion.div
            aria-hidden="true"
            className="h-14 w-14 rounded-2xl grid place-items-center shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${primary}33 0%, ${primary}18 100%)`,
              border: `1.5px solid ${primary}44`,
            }}
            animate={
              paused
                ? { scale: 1, opacity: 1 }
                : { scale: [1, 1.07, 1], opacity: [0.92, 1, 0.92] }
            }
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              repeat: paused ? 0 : Infinity,
              delay: i * 0.2,
            }}
          >
            {s.key === "design" && (
              <BatteryCharging size={28} strokeWidth={1.7} style={{ color: primary }} />
            )}
            {s.key === "finance" && (
              <TrendingUp size={28} strokeWidth={1.7} style={{ color: primary }} />
            )}
            {s.key === "operation" && (
              <Brain size={28} strokeWidth={1.7} style={{ color: primary }} />
            )}
          </motion.div>

          {/* Watermark number */}
          <span
            className="text-5xl font-black leading-none select-none"
            style={{ color: `${primary}22` }}
          >
            {s.num}
          </span>
        </div>

        {/* Card body */}
        <div className="px-6 py-5 flex-1 flex flex-col">
          <div
            className="h-0.5 w-10 rounded-full mb-4"
            style={{ background: primary }}
          />
          <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.body}</p>
        </div>
      </motion.div>
    );

    if (i < items.length - 1) {
      elements.push(
        <div
          key={`arrow-${i}`}
          className="hidden md:flex items-center justify-center self-center pb-6"
        >
          <ArrowRight className="h-5 w-5 text-slate-300" />
        </div>
      );
    }
  });

  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
      {elements}
    </div>
  );
}

