"use client";
import React from "react";

type Props = {
  to: `#${string}`;
  duration?: number; // kept for API compatibility, unused
  offset?: number;   // px to subtract from top (header height)
  className?: string;
  "aria-current"?: React.AriaAttributes["aria-current"];
  children: React.ReactNode;
};

export default function SmoothLink({
  to,
  offset = 72,
  className,
  children,
  ...rest
}: Props) {
  return (
    <a
      href={to}
      className={className}
      {...rest}
      onClick={(e) => {
        const id = to.slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();

        const targetY =
          el.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top: targetY, behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}
