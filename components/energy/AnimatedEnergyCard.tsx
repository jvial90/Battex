"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

export default function AnimatedEnergyCard({
  width = 860,
  height = 460,
  durationSec = 5,
  caption = "Perfil de 24h con carga (arriba) y descarga (abajo) de la batería.",
}: {
  width?: number;
  height?: number;
  durationSec?: number;
  caption?: string;
}) {
  const { baseLoad, batt } = useMemo(() => {
    const slots = 96;
    const base: number[] = [];
    const b: number[] = [];

    for (let i = 0; i <= slots; i++) {
      const t = i / slots;
      const hour = t * 24;

      const night = 0.22 + 0.06 * Math.cos((t + 0.1) * Math.PI * 2);
      const noonBump = 0.55 * Math.exp(-Math.pow((t - 0.52) / 0.16, 2));
      const evening = 0.18 + 0.28 * Math.max(0, Math.sin((t - 0.62) * Math.PI));
      const baseVal = night + noonBump + evening;
      base.push(baseVal);

      let val = 0;
      if (hour >= 8 && hour <= 15) {
        val = 0.25 * Math.sin(((hour - 8) / 7) * Math.PI);
      } else if (hour >= 18 && hour <= 22) {
        val = -0.35 * Math.sin(((hour - 18) / 4) * Math.PI);
      }
      b.push(val);
    }
    return { baseLoad: base, batt: b };
  }, []);

  const pad = 40;
  const w = width;
  const h = height;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;

  // Dynamic Y scale with headroom so charge curve never clips
  const maxVal = Math.max(...baseLoad.map((v, i) => v + Math.max(0, batt[i])));
  const minVal = Math.min(...baseLoad.map((v, i) => v + Math.min(0, batt[i])));
  const scaleMax = maxVal * 1.1;
  const scaleMin = Math.min(0, minVal * 1.05);
  const range = scaleMax - scaleMin;

  const yScale = (v: number) => {
    const norm = (v - scaleMin) / range;
    return pad + innerH - norm * innerH;
  };

  const buildLine = (arr: number[]) => {
    const step = innerW / (arr.length - 1);
    let d = "";
    for (let i = 0; i < arr.length; i++) {
      const x = pad + i * step;
      const y = yScale(arr[i]);
      d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    return d;
  };

  const buildAreaBetween = (top: number[], bottom: number[]) => {
    const step = innerW / (top.length - 1);
    let d = "";
    for (let i = 0; i < top.length; i++) {
      const x = pad + i * step;
      const y = yScale(top[i]);
      d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    for (let i = bottom.length - 1; i >= 0; i--) {
      const x = pad + i * step;
      const y = yScale(bottom[i]);
      d += ` L ${x} ${y}`;
    }
    d += " Z";
    return d;
  };

  const baseAreaPath = useMemo(() => buildAreaBetween(baseLoad, new Array(baseLoad.length).fill(scaleMin)), [baseLoad]);
  const baseLinePath = useMemo(() => buildLine(baseLoad), [baseLoad]);

  const chargeAreaPath = useMemo(() => {
    const top = baseLoad.map((v, i) => v + Math.max(0, batt[i]));
    const bottom = baseLoad;
    return buildAreaBetween(top, bottom);
  }, [baseLoad, batt]);

  const dischargeAreaPath = useMemo(() => {
    const top = baseLoad;
    const bottom = baseLoad.map((v, i) => v + Math.min(0, batt[i]));
    return buildAreaBetween(top, bottom);
  }, [baseLoad, batt]);

  const maskId = "mask-24h-reveal";
  const ticks = [0, 4, 8, 12, 16, 20, 24];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="rounded-3xl shadow-2xl bg-white/60 backdrop-blur p-5">
        <div
          className="rounded-2xl p-5 md:p-8 relative"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.95), rgba(99,102,241,0.90))",
          }}
        >
          {/* Battex logo top-left */}

<Image
  src="/logo-battex-bn.png"
  alt="Battex logo"
  width={160}   // set an explicit width
  height={40}   // and height for optimization
  className="absolute top-4 left-6 h-5 w-auto"
/>
        
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block">
            <g transform={`translate(${pad}, ${pad - 6})`}>
              <g transform="translate(0, 24)">
                <LegendSwatch label="Carga ↑" fill="rgba(255,255,255,0.32)" stroke="#FFFFFF" />
                <g transform="translate(120, 0)">
                  <LegendSwatch label="Descarga ↓" fill="rgba(0,0,0,0.20)" stroke="#FFFFFF" />
                </g>
              </g>
            </g>

            {Array.from({ length: 5 }).map((_, i) => {
              const y = pad + (i + 1) * (innerH / 6);
              return (
                <line key={`h-${i}`} x1={pad} x2={pad + innerW} y1={y} y2={y} stroke="rgba(255,255,255,0.16)" />
              );
            })}
            {ticks.map((t, i) => {
              const x = pad + (t / 24) * innerW;
              return (
                <g key={`v-${i}`}>
                  <line x1={x} x2={x} y1={pad} y2={pad + innerH} stroke="rgba(255,255,255,0.12)" />
                  <text x={x} y={h - 2} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)">{t}h</text>
                </g>
              );
            })}

            <mask id={maskId} maskUnits="userSpaceOnUse">
              <motion.rect
                x={pad}
                y={pad}
                height={innerH}
                rx={14}
                initial={{ width: 0 }}
                animate={{ width: innerW }}
                transition={{ duration: durationSec, ease: "linear", repeat: Infinity }}
                fill="#fff"
              />
            </mask>

            <path d={dischargeAreaPath} fill="rgba(0,0,0,0.28)" mask={`url(#${maskId})`} />
            <path d={baseAreaPath} fill="rgba(255,255,255,0.18)" mask={`url(#${maskId})`} />
            <path d={chargeAreaPath} fill="rgba(255,255,255,0.35)" mask={`url(#${maskId})`} />
            <path d={baseLinePath} stroke="#ffffff" strokeWidth={3} fill="none" mask={`url(#${maskId})`} />

            <motion.g
              initial={{ x: 0 }}
              animate={{ x: innerW }}
              transition={{ duration: durationSec, ease: "linear", repeat: Infinity }}
            >
              <line x1={pad} x2={pad} y1={pad} y2={pad + innerH} stroke="#FFF" strokeOpacity={0.9} strokeWidth={2} />
            </motion.g>
          </svg>

          <div className="absolute top-2 right-2 flex items-center gap-2">
            <BatteryIconVertical durationSec={durationSec} />
          </div>
        </div>

       
      </div>
    </div>
  );
}

function LegendSwatch({ label, fill, stroke }: { label: string; fill: string; stroke: string }) {
  return (
    <g>
      <rect x={0} y={-20} width={30} height={20} rx={3} style={{ fill, stroke, strokeWidth: 2, opacity: 1 }} />
      <text x={34} y={-3} fontSize="20" fill="#fff">{label}</text>
    </g>
  );
}



// === Vertical Battery Icon (purple bars, synced windows) ===
function BatteryIconVertical({ durationSec }: { durationSec: number }) {
  const W = 56; // doubled width
  const H = 108;
  const stroke = "#ffffff";
  const purple = "#A78BFA";
  const pad = 4;
  const innerW = W - 2 * pad;
  const innerH = H - 2 * pad;

  const times = [0, 8 / 24, 15 / 24, 18 / 24, 22 / 24, 1];
  const levels = [0, 0, 1, 1, 0, 0];

  const barCount = 6;
  const barGap = 3;
  const barH = (innerH - barGap * (barCount - 1)) / barCount;

  const yKeyframes = levels.map((L) => 6 + pad + innerH * (1 - L));
  const hKeyframes = levels.map((L) => innerH * L);

  return (
    <svg width={W + 14} height={H + 18} viewBox={`0 0 ${W + 14} ${H + 18}`}>
      <rect x={(W - 14) / 2} y={0} width={14} height={8} rx={2} fill={stroke} />
      <rect x={0} y={6} width={W} height={H} rx={5} stroke={stroke} strokeWidth={3} fill="none" />
      <clipPath id="soc-clip">
        <motion.rect
          x={pad}
          initial={{ y: 6 + pad + innerH, height: 0 }}
          animate={{ y: yKeyframes, height: hKeyframes }}
          transition={{ duration: durationSec, ease: "linear", times, repeat: Infinity }}
          width={innerW}
          rx={2}
        />
      </clipPath>
      <g clipPath="url(#soc-clip)">
        {Array.from({ length: barCount }).map((_, i) => {
          const y = 6 + pad + innerH - (i + 1) * barH - i * barGap;
          return <rect key={i} x={pad} y={y} width={innerW} height={barH} rx={2} fill={purple} />;
        })}
      </g>
      {Array.from({ length: barCount }).map((_, i) => {
        const y = 6 + pad + innerH - (i + 1) * barH - i * barGap;
        return <rect key={`o-${i}`} x={pad} y={y} width={innerW} height={barH} rx={2} fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth={2} />;
      })}
    </svg>
  );
}


