"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Star, Sparkles, Rocket, Shield, Zap, ArrowRight, Award, Leaf } from "lucide-react";

const BRAND = {
  name: "NovaFlow",
  tagline: "Launch faster. Scale smarter.",
  ctaPrimary: "Get Early Access",
  ctaSecondary: "Book a Demo",
  brandColor: "from-indigo-500 via-violet-500 to-fuchsia-500",
  highlight: "text-indigo-600",
};

const FEATURES = [
  { icon: <Zap className="h-6 w-6" />, title: "Blazing Setup", desc: "Spin up workflows in minutes with zero-code templates and delightful defaults." },
  { icon: <Shield className="h-6 w-6" />, title: "Enterprise-Grade", desc: "SSO, RBAC, and audit trails baked in. Security that scales with you." },
  { icon: <Rocket className="h-6 w-6" />, title: "Auto-Optimize", desc: "AI tunes performance and cost in real time—so you don’t have to." },
  { icon: <Leaf className="h-6 w-6" />, title: "Sustainable by Design", desc: "Lower compute, lower costs, lower footprint. Better for your margins and the planet." },
];

const LOGOS = ["Acme", "Blumr", "Helix", "Nimbus", "Orbit", "Polar"];

const PLANS = [
  { name: "Starter", price: "$0", cadence: "/mo", highlight: false, features: ["Up to 3 projects", "Community support", "Core automations"] },
  { name: "Growth", price: "$39", cadence: "/mo", highlight: true, features: ["Unlimited projects", "Priority support", "AI optimization"] },
  { name: "Scale", price: "Let's talk", cadence: "", highlight: false, features: ["SAML/SSO", "Dedicated success", "Custom SLAs"] },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-xl bg-gradient-to-br ${BRAND.brandColor}`}></div>
            <span className="font-semibold text-lg">{BRAND.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
            <Button variant="ghost" className="rounded-2xl">{BRAND.ctaSecondary}</Button>
            <Button className="rounded-2xl">{BRAND.ctaPrimary}</Button>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="menu">
              <span className="i-lucide-menu" />
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${BRAND.brandColor} opacity-10`} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm">
                <Sparkles className="h-4 w-4" /> New: Smart Runbooks
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                {BRAND.tagline} <span className={`${BRAND.highlight}`}>with {BRAND.name}</span>
              </h1>
              <p className="mt-5 text-lg text-slate-600 max-w-xl">
                Ship features in days, not months. {BRAND.name} automates your ops and optimizes costs—so your team can focus on what matters.
              </p>
              <form className="mt-8 flex w-full max-w-md gap-3">
                <Input placeholder="you@company.com" className="h-12 rounded-2xl" />
                <Button className="h-12 rounded-2xl px-6">{BRAND.ctaPrimary} <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </form>
              <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                <Check className="h-4 w-4" /> No credit card needed
                <Check className="h-4 w-4" /> 14-day free trial
                <Check className="h-4 w-4" /> Cancel anytime
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
              <div className="absolute -inset-4 -z-10 blur-3xl opacity-30 bg-gradient-to-r from-indigo-400 to-fuchsia-400 rounded-full" />
              <Card className="rounded-3xl shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Rocket className="h-5 w-5"/>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full rounded-2xl border border-slate-200 bg-white grid place-items-center">
                    <div className="text-center p-6">
                      <div className="text-5xl font-black tracking-tight">⚡</div>
                      <p className="mt-3 text-sm text-slate-500">Embed a short product video or screenshot carousel here.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

