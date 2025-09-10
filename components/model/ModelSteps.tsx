"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

type Step = {
  key: "design" | "operation" | "finance";
  num: string;
  title: string;
  body: string;
};

const DEFAULT_STEPS: Step[] = [
  {
    key: "design",
    num: "1.",
    title: "Project design",
    body:
      "We design the project to your needs and manage the installation of the battery and associated systems.",
  },
  {
    key: "operation",
    num: "2.",
    title: "Smart operation",
    body:
      "We operate the battery optimally with our AI software to reduce Energy Price and Peak Power charges.",
  },
  {
    key: "finance",
    num: "3.",
    title: "Financing solutions",
    body:
      "Self-financed, co-financed, or 100% financed options to accelerate adoption with minimal CAPEX.",
  },
];

export default function ModelSteps({
  items = DEFAULT_STEPS,
  primary = "#5B21E6",
}: {
  items?: Step[];
  primary?: string;
}) {
  // used to pause icon pulse while any card is hovered (nice micro-interaction)
  const [paused, setPaused] = React.useState(false);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((s, i) => (
        <motion.div
          key={s.key}
          onHoverStart={() => setPaused(true)}
          onHoverEnd={() => setPaused(false)}
          whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(0,0,0,0.12)" }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="rounded-2xl"
        >
          <Card className="rounded-2xl border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              {/* Number + Icon */}
              <div className="flex items-start gap-4">
                <div className="text-3xl font-black" style={{ color: primary }}>
                  {s.num}
                </div>

                {/* Icon container with subtle pulse */}
                <motion.div
                  aria-hidden="true"
                  className="h-12 w-12 rounded-xl grid place-items-center ring-1"
                  style={{ background: `${primary}14`, borderColor: `${primary}33` }}
                  animate={
                    paused
                      ? { scale: 1, opacity: 1 }
                      : { scale: [1, 1.06, 1], opacity: [0.95, 1, 0.95] }
                  }
                  transition={{
                    duration: 2.1,
                    ease: "easeInOut",
                    repeat: paused ? 0 : Infinity,
                    delay: i * 0.15,
                  }}
                >
                  {s.key === "design" && <DesignIcon color={primary} />}
                  {s.key === "operation" && <OperationIcon color={primary} />}
                  {s.key === "finance" && <FinanceIcon color={primary} />}
                </motion.div>
              </div>

              {/* Text */}
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{s.body}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

/* ====== Minimal “AI-style” SVG icons ====== */

function DesignIcon({ color = "#5B21E6" }: { color?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" role="img">
      {/* compass/ruler */}
      <path d="M4 18h10M6 14l6-10M10 6l8 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="6" r="1.6" fill={color} />
    </svg>
  );
}

function OperationIcon({ color = "#5B21E6" }: { color?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" role="img">
      {/* gear */}
      <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1.8" />
      <path d="M12 2v2.2M12 19.8V22M4.2 12H2M22 12h-2.2M5 5l1.6 1.6M17.4 17.4 19 19M5 19l1.6-1.6M17.4 6.6 19 5"
            stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 8l.7 1.4L22 10l-1.3.6L20 12l-.7-1.4L18 10l1.3-.6L20 8Z" fill={color} />
    </svg>
  );
}

function FinanceIcon({ color = "#5B21E6" }: { color?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" role="img">
      {/* stacked coins */}
      <ellipse cx="9" cy="16" rx="4.5" ry="2.2" stroke={color} strokeWidth="1.6" />
      <path d="M13.5 16c0 1.2-2 2.2-4.5 2.2S4.5 17.2 4.5 16M13.5 13.8c0 1.2-2 2.2-4.5 2.2S4.5 15 4.5 13.8"
            stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* leaf for sustainable finance */}
      <path d="M18.5 11c1.8 0 3.5 1.4 3 3.4-.6 2.7-3.7 4-6.2 4.1 0-2.9.8-7.5 3.2-7.5Z"
            stroke={color} strokeWidth="1.6" fill={`${color}14`} />
      <path d="M16.2 17.5c.7-1.7 2.1-3.2 3.7-4.1" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
