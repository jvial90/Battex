"use client";
import React from "react";

type Props = {
  to: `#${string}`;
  duration?: number; // ms
  offset?: number;   // px header offset
  className?: string;
  children: React.ReactNode;
};

export default function SmoothLink({ to, duration = 1200, offset = 16, className, children }: Props) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        const id = to.slice(1);
        const el = document.getElementById(id);
        if (!el) return;

        e.preventDefault();

        const startY = window.pageYOffset;
        const targetY = el.getBoundingClientRect().top + startY - offset;
        const diff = targetY - startY;

        let start: number | null = null;
        const easeInOut = (t: number) => 0.5 * (1 - Math.cos(Math.PI * t)); // smooth

        const step = (ts: number) => {
          if (start === null) start = ts;
          const t = Math.min(1, (ts - start) / duration);
          window.scrollTo(0, startY + diff * easeInOut(t));
          if (t < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      }}
    >
      {children}
    </a>
  );
}