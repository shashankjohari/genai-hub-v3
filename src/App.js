import { useState, useMemo, useRef, useEffect } from "react";

const PASSWORD = "AccentureAI@$rini2025";

// ── THEME ─────────────────────────────────────────────────────────────────
const TH = {
  light: {
    bg:"#F7F8FC",bgCard:"#FFFFFF",bgDeep:"#EEF0F8",bgMuted:"#F0F2FA",
    bd:"rgba(0,0,0,0.08)",bdStrong:"rgba(0,0,0,0.16)",
    tx1:"#0B0D1A",tx2:"#4A5070",tx3:"#8C92AE",tx4:"#BFC3D6",
    accent:"#006AFF",accentBg:"#EBF2FF",accentBd:"rgba(0,106,255,0.25)",
    green:"#0B7B5C",greenBg:"#E7F7F3",greenBd:"rgba(11,123,92,0.2)",
    blue:"#1A5CB0",blueBg:"#E8F0FC",blueBd:"rgba(26,92,176,0.2)",
    purple:"#5738A8",purpleBg:"#EEE9FC",purpleBd:"rgba(87,56,168,0.2)",
    amber:"#8C5E00",amberBg:"#FEF6E4",amberBd:"rgba(140,94,0,0.2)",
    red:"#B52020",redBg:"#FCEAEA",
    shadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.04)",
    shadowHover:"0 4px 20px rgba(0,0,0,0.10),0 1px 4px rgba(0,0,0,0.06)",
  },
  dark: {
    bg:"#090B12",bgCard:"#111420",bgDeep:"#0D1018",bgMuted:"#161A28",
    bd:"rgba(255,255,255,0.07)",bdStrong:"rgba(255,255,255,0.15)",
    tx1:"#EEF0F8",tx2:"#9AA0BE",tx3:"#5A6080",tx4:"#323650",
    accent:"#4B8FFF",accentBg:"rgba(75,143,255,0.12)",accentBd:"rgba(75,143,255,0.28)",
    green:"#3ECBA0",greenBg:"rgba(62,203,160,0.10)",greenBd:"rgba(62,203,160,0.22)",
    blue:"#6BADF5",blueBg:"rgba(107,173,245,0.10)",blueBd:"rgba(107,173,245,0.22)",
    purple:"#9E80F5",purpleBg:"rgba(158,128,245,0.10)",purpleBd:"rgba(158,128,245,0.22)",
    amber:"#F0B040",amberBg:"rgba(240,176,64,0.10)",amberBd:"rgba(240,176,64,0.22)",
    red:"#F07070",redBg:"rgba(240,112,112,0.10)",
    shadow:"0 1px 3px rgba(0,0,0,0.3),0 4px 16px rgba(0,0,0,0.2)",
    shadowHover:"0 4px 24px rgba(0,0,0,0.38)",
  }
};

// ── ICONS ─────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor", style: sx = {} }) => {
  const s = { width: size, height: size, display: "inline-block", flexShrink: 0, ...sx };
  const p = {
    home:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
    journey:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><circle cx="5" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><path d="M7 12h10M12 7v10"/><circle cx="12" cy="19" r="2"/></svg>,
    catalog:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    dashboard: <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><rect x="3" y="3" width="8" height="5" rx="1"/><rect x="13" y="3" width="8" height="9" rx="1"/><rect x="3" y="11" width="8" height="10" rx="1"/><rect x="13" y="15" width="8" height="6" rx="1"/></svg>,
    chat:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    search:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>,
    sun:       <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={s}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
    moon:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={s}><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>,
    upload:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    edit:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
    back:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><polyline points="15 18 9 12 15 6"/></svg>,
    add:       <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={s}><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
    video:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
    arrowUp:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={s}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
    arrowDn:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={s}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
    star:      <svg viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" style={s}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    bolt:      <svg viewBox="0 0 24 24" fill={color} stroke="none" style={s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    target:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={s}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill={color}/></svg>,
    cost:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></svg>,
    speed:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><path d="M12 2a10 10 0 11-7.07 2.93"/><polyline points="12 6 12 12 16 14"/></svg>,
    quality:   <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    agent:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><rect x="3" y="4" width="18" height="12" rx="2"/><circle cx="9" cy="10" r="1.5" fill={color}/><circle cx="15" cy="10" r="1.5" fill={color}/><path d="M8 16l-2 4M16 16l2 4M10 16h4"/></svg>,
    chart:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    roi:       <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    globe:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={s}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
    close:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" style={s}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    person:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><circle cx="12" cy="7" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    check:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={s}><polyline points="20 6 9 17 4 12"/></svg>,
    table:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="21"/></svg>,
    grid:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    send:      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    attach:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.41 17.41a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>,
    image:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5" fill={color} stroke="none"/><polyline points="21 15 16 10 5 21"/></svg>,
    play:      <svg viewBox="0 0 24 24" fill={color} stroke="none" style={s}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  };
  return p[name] || null;
};

// ── PHASE ICONS ───────────────────────────────────────────────────────────
const PhaseIcon = ({ phase, color, size = 28 }) => {
  const s = { width: size, height: size, display: "block" };
  if (phase === 0) return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <circle cx="12" cy="4" r="2" fill={color} stroke="none"/>
      <path d="M8 12l2-5h4l2 5"/>
      <path d="M7 22l3-6"/><path d="M17 22l-3-6"/>
      <path d="M5 14l3-2"/><path d="M19 14l-3-2"/>
    </svg>
  );
  if (phase === 1) return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <circle cx="12" cy="4" r="2" fill={color} stroke="none"/>
      <path d="M12 6v6l3 3"/><path d="M9 12l-2 2"/>
      <path d="M8 22l3-7"/><path d="M16 22l-3-7"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <rect x="7" y="3" width="10" height="9" rx="2" fill={color + "18"}/>
      <circle cx="10" cy="7.5" r="1" fill={color} stroke="none"/>
      <circle cx="14" cy="7.5" r="1" fill={color} stroke="none"/>
      <path d="M10 10h4"/><path d="M12 2v1"/><path d="M12 12v3"/>
      <path d="M8 22l2.5-7"/><path d="M16 22l-2.5-7"/><path d="M7 16h10"/>
    </svg>
  );
};

// ── PILLARS & HELPERS ─────────────────────────────────────────────────────
const PILLARS = [
  { id: "cost",    label: "Cost reduction",     iconName: "cost"    },
  { id: "speed",   label: "Speed & efficiency", iconName: "speed"   },
  { id: "quality", label: "Quality & accuracy", iconName: "quality" },
];

const PC = (t, id) => {
  if (id === "cost")    return { bg: t.greenBg,  bd: t.greenBd,  tx: t.green  };
  if (id === "speed")   return { bg: t.blueBg,   bd: t.blueBd,   tx: t.blue   };
  if (id === "quality") return { bg: t.purpleBg, bd: t.purpleBd, tx: t.purple };
  return { bg: t.accentBg, bd: t.accentBd, tx: t.accent };
};

const SC = (t, s) => {
  if (s === "Live")           return { bg: t.greenBg,  tx: t.green  };
  if (s === "In development") return { bg: t.blueBg,   tx: t.blue   };
  return                             { bg: t.purpleBg, tx: t.purple };
};

const SLabel = ({ t, children, color }) => (
  <div style={{ fontSize: 11, fontWeight: 600, color: color || t.tx3, letterSpacing: "0.1em", textTransform: "uppercase" }}>
    {children}
  </div>
);

// ── STATIC DATA ───────────────────────────────────────────────────────────
const METRICS = [
  { value: "~65%",  label: "Reduction in time-to-quote",     pillar: "speed"   },
  { value: "100%",  label: "Submissions assessed",            pillar: "quality" },
  { value: "55%",   label: "Increase in bound policies, NA", pillar: "speed"   },
  { value: "~$10M", label: "NB GWP uplift, Cyber",           pillar: "cost"    },
  { value: "94%",   label: "CSAT score (+9 pt uplift)",      pillar: "quality" },
  { value: "90",    label: "FTE productivity savings",       pillar: "cost",   icon: "person" },
];

const ROI_DATA = [
  { id: "cyber_uw", label: "Cyber UW assistant", gwp: "$9.3M", cost: "$4.4M", timeFrom: "3–5 days", timeTo: "<1 hr",   pct: 65, pillar: "speed"   },
  { id: "qgpt",     label: "Q-GPT",              gwp: "—",     cost: "$1.2M", timeFrom: "Manual",   timeTo: "Instant", pct: 75, pillar: "quality" },
  { id: "eventops", label: "EventOps agent",     gwp: "—",     cost: "$0.6M", timeFrom: "5 hrs",    timeTo: "0.5 hr",  pct: 90, pillar: "cost"    },
  { id: "capacity", label: "Smart capacity",     gwp: "—",     cost: "$0.4M", timeFrom: "90 hrs",   timeTo: "5 hrs",   pct: 94, pillar: "speed"   },
];

const BAR_DATA = [
  { label: "Cyber UW",  after: 35, desc: "Time-to-quote"  },
  { label: "EventOps",  after: 10, desc: "Diagnosis time" },
  { label: "Smart Cap", after: 6,  desc: "Manual effort"  },
  { label: "Q-GPT",     after: 25, desc: "Team effort"    },
];

const DEPLOYMENT = [
  { region: "North America", ucs: ["Cyber UW", "Q-GPT", "EventOps", "Smart Capacity"], status: "Live"           },
  { region: "Europe (EO)",   ucs: ["Cyber UW", "Q-GPT"],                               status: "Live"           },
  { region: "AusPac",        ucs: ["Property UW"],                                     status: "In development" },
  { region: "Asia",          ucs: ["Employee Comp UW"],                                status: "In development" },
];

const JOURNEY = [
  {
    phase: "2023", label: "GenAI incubation", sub: "Mobilization",
    milestones: [
      "AI operating model & enterprise strategy established across QBE",
      "Client account campaign launched to co-innovate and prioritise AI opportunities",
      "Executive GenAI curriculum and enterprise-wide awareness campaign delivered",
    ],
    highlights: [
      { tag: "Underwriting", icon: "quality", title: "Cyber UW assistant (NA)",  desc: "Streamline quote generation, enhance risk selection and accelerate speed-to-quote" },
      { tag: "Platform",     icon: "agent",   title: "Q-GPT launched",           desc: "Secure, persona-based enterprise AI within QBE network — 2,237 users across 912 teams" },
      { tag: "Technology",   icon: "speed",   title: "AIOps foundation",         desc: "Intelligent analysis, automation orchestration and proactive monitoring at scale" },
    ],
  },
  {
    phase: "2024–25", label: "Acceleration & scale", sub: "Innovation across the value chain",
    milestones: [
      "UW assistant extended to A&H, Workers Comp, Property across NA, EO, AusPac, Asia",
      "Claims strategy — automated FNOL and STP vs. critical claim classification",
      "Q-GPT advanced — persona-based, faster response, improved chunking",
    ],
    highlights: [
      { tag: "TDLC",       icon: "quality", title: "Quality engineering via GenWizard", desc: "Accelerate test execution and improve delivery quality across the TDLC" },
      { tag: "TDLC",       icon: "catalog", title: "Living knowledge base",             desc: "Centralised run-and-change knowledge base across all QBE workstreams" },
      { tag: "Technology", icon: "speed",   title: "Enhanced service management",       desc: "AI-assisted workflows driving efficient operations at scale" },
    ],
  },
  {
    phase: "2026+", label: "Optimize & evolve", sub: "Agentic network expansion",
    milestones: [
      "Data Product Identifier & Designer agents to accelerate Data & AI product adoption",
      "Agentic UW solution — minimise re-keying, prioritise submissions, optimise pricing",
      "Autonomous Ops agent and orchestration framework across run and change",
    ],
    highlights: [
      { tag: "Underwriting", icon: "agent", title: "Agentic underwriting",        desc: "AI experts in non-linear workflow evaluating complex risks and recommending optimal pricing" },
      { tag: "Technology",   icon: "agent", title: "Autonomous ops agent",        desc: "Full agent orchestration across service management with human-in-loop governance" },
      { tag: "Technology",   icon: "roi",   title: "Forward/reverse engineering", desc: "Accelerate application transformation using AI-powered code analysis and generation" },
    ],
  },
];

const INIT_UCS = [
  {
    id: "cyber_uw", domain: "business", pillar: "speed", status: "Live",
    title: "Cyber underwriting assistant", dept: "Underwriting", impact: "65% faster · 55% more bound",
    summary: "GenAI solution streamlining cyber insurance quote generation — automating submission intake, risk assessment and prioritisation to enhance risk selection and support rapid growth across geographies and lines of business.",
    outcomes: ["~65% reduction in time-to-quote", "100% submissions assessed — zero leakage", "55% increase in bound policies NA · 43% EO"],
    fromTime: "3–5 days", toTime: "<1 hr",
    fromSteps: ["Broker submits via email or portal", "Underwriter manually reviews documents", "Risk data keyed into system manually", "Judgment applied to price and assess", "Quote issued — avg. 3–5 days"],
    toSteps: [
      { l: "Broker submission received", a: false },
      { l: "AI extracts and structures risk data", a: true },
      { l: "Risk scoring agent assesses exposure vs. appetite", a: true },
      { l: "Quote recommendation with rationale generated", a: true },
      { l: "Underwriter reviews and issues quote", a: false },
    ],
    financial:   ["~$3.2M NB GWP uplift for NA Cyber (R1+R2)", "~$6.1M NB GWP uplift for EO Cyber (R1)", "Investment: $2.8M NA · $1.6M EO"],
    operational: ["~65% reduction in time-to-quote", "100% submissions assessed", "55% bound policies increase NA"],
    governance:  ["Consistent risk selection criteria across all submissions", "Full audit trail of AI vs. underwriter decisions", "Documented pricing rationale supporting regulatory compliance"],
    impactBadges: [{ l: "Time-to-quote", d: "down" }, { l: "Bound policies", d: "up" }, { l: "Submission throughput", d: "up" }, { l: "NB GWP revenue", d: "up" }],
  },
  {
    id: "qgpt", domain: "business", pillar: "quality", status: "Live",
    title: "Q-GPT", dept: "Enterprise AI platform", impact: "75% effort reduction",
    summary: "QBE's managed, secure interface to ChatGPT capabilities — delivering governed, persona-based AI across 2,237 users spanning 912 business teams with full audit trails and enterprise-grade data controls.",
    outcomes: ["75% effort reduction for Legal, Risk & Data Science", "2,237 active users across 912 teams", "Secure data estate — no public ChatGPT dependency"],
    fromTime: "Manual / unsecured", toTime: "Instant / governed",
    fromSteps: ["Employee uses public ChatGPT", "Sensitive documents uploaded to unsecured LLM", "No prompt standardisation or governance", "No audit trail", "Data privacy risk unmanaged"],
    toSteps: [
      { l: "Employee accesses Q-GPT — secure QBE interface", a: false },
      { l: "Azure GPT-4o ingests documents within QBE network", a: true },
      { l: "Persona-based experience surfaces role-relevant prompts", a: true },
      { l: "Curated prompt library ensures quality outputs", a: true },
      { l: "Audit trails and access controls enforced", a: false },
    ],
    financial:   ["75% effort reduction for Legal, Risk & Data Science", "Eliminates cost and risk of unsanctioned LLM usage"],
    operational: ["~2,237 users across 912 business teams", "Precise data insights from ingested documents"],
    governance:  ["Secure data estate — no public ChatGPT dependency", "Centralised model lifecycle management with audit trails"],
    impactBadges: [{ l: "Effort for Legal, Risk & DS", d: "down" }, { l: "Data security & compliance", d: "up" }, { l: "Enterprise AI adoption", d: "up" }, { l: "Response turnaround", d: "down" }],
  },
  {
    id: "eventops", domain: "technology", pillar: "cost", status: "Live",
    title: "EventOps agent", dept: "Technology ops", impact: "5 hrs → 0.5 hr",
    summary: "Agentic AI ingesting, deduplicating, correlating and root-cause-analysing events across monitoring platforms — cutting mean diagnosis time from 5 hours to 30 minutes and reducing P1/P2 escalations.",
    outcomes: ["90% reduction in diagnosis time", "20–30% cut in IT support cost", "Fewer P1/P2 escalations"],
    fromTime: "5 hrs", toTime: "0.5 hr",
    fromSteps: ["Alerts generated across multiple monitoring platforms", "Manual correlation to identify true events", "Manual diagnostic across Alert Center, Dynatrace", "Manual drill-down and RCA with limited automation", "Finalise RCA and execute corrective actions"],
    toSteps: [
      { l: "Events ingested from monitoring tools (idera, Dynatrace etc.)", a: false },
      { l: "Deduplication & categorisation agent removes duplicates", a: true },
      { l: "Correlation & clustering agent groups events into problems", a: true },
      { l: "RCA agent generates summaries and actionable insights", a: true },
      { l: "Core team confirms RCA and executes remediation", a: false },
    ],
    financial:   ["Improved engineering productivity via automated correlation/RCA", "Reduces downtime revenue impact by 10–20%", "Cuts IT support cost by 20–30%"],
    operational: ["Fewer P1/P2 escalations by preventing missed alerts", "Faster diagnosis and proactive risk management", "Cuts diagnosis time by 25–35%"],
    governance:  ["Standardised and repeatable incident investigation process", "Better accountability through centralised event intelligence"],
    impactBadges: [{ l: "Service availability", d: "up" }, { l: "Operation cost & MTTR", d: "down" }, { l: "Event correlation / KB articles", d: "up" }, { l: "Ticket volume", d: "down" }],
  },
  {
    id: "capacity", domain: "technology", pillar: "speed", status: "Live",
    title: "Smart capacity", dept: "Technology ops", impact: "90 hrs → 5 hrs",
    summary: "Agentic AI pulling raw capacity data from Storage, Backup and VMware, synthesising utilisation insights, forecasting consumption and auto-raising ServiceNow tickets — replacing 90 hours of manual effort with 5.",
    outcomes: ["94% reduction in manual effort", "Proactive forecasting replaces reactive firefighting", "Automated ServiceNow ticketing with owner assignment"],
    fromTime: "90 hrs", toTime: "5 hrs",
    fromSteps: ["RAW data extracted manually from Storage, Backup, VMware teams", "ServiceNow team manually collates into a single file", "Capacity team manually analyses usage and plans actions", "Team defines plan, actions assessment and publishes reports"],
    toSteps: [
      { l: "RAW capacity data pulled from Storage, Backup, VMware", a: false },
      { l: "Network Capacity Analyser collates data and derives % usage", a: true },
      { l: "Forecasting agent predicts consumption and sets action thresholds", a: true },
      { l: "Ticketing agent creates ServiceNow ticket and assigns owner", a: true },
      { l: "Capacity team actions ticket and publishes report", a: false },
    ],
    financial:   ["License cost optimisation and OpEx reduction", "Improved FTE productivity from reduced manual effort"],
    operational: ["Reduced availability risk and fewer outages", "Faster decision-making and issue visibility"],
    governance:  ["Chatbot-enabled self-service reporting", "Centralised visibility and auditability"],
    impactBadges: [{ l: "Efficiency & availability", d: "up" }, { l: "License & storage costs", d: "down" }, { l: "Risk mitigation", d: "up" }, { l: "Auditability", d: "up" }],
  },
  { id: "f1",  domain: "business",   pillar: "speed",   status: "In development", title: "Agentic knowledge search",         dept: "Underwriting",   impact: "Faster submission research",  summary: "AI agents interpret questions, decompose into sub-parts, execute parallel searches and produce cited grounded answers — reducing SME dependency and accelerating underwriter decisions.", outcomes: ["Faster submission research", "Reduced SME dependency"], fromTime: "", toTime: "", fromSteps: [], toSteps: [], financial: [], operational: [], governance: [], impactBadges: [] },
  { id: "f2",  domain: "business",   pillar: "cost",    status: "In development", title: "Bordereau processing pilot",        dept: "Claims",         impact: "Reduced manual processing",   summary: "AI to ingest, normalise, validate and transform incoming bordereaux files covering claims, premium, policy and DUA — eliminating manual intervention and improving data accuracy.", outcomes: ["Reduced manual processing", "Improved data accuracy"], fromTime: "", toTime: "", fromSteps: [], toSteps: [], financial: [], operational: [], governance: [], impactBadges: [] },
  { id: "f3",  domain: "business",   pillar: "speed",   status: "Roadmap",        title: "Invoice processing agent",          dept: "Claims",         impact: "Accelerated settlement",      summary: "Automate claims invoice processing using Q-GPT–powered agents for scalable claims modernisation across NA.", outcomes: ["Accelerated claims settlement", "Scalable modernisation"], fromTime: "", toTime: "", fromSteps: [], toSteps: [], financial: [], operational: [], governance: [], impactBadges: [] },
  { id: "f4",  domain: "business",   pillar: "quality", status: "Roadmap",        title: "Agentic UW — E&S property",        dept: "Underwriting",   impact: "Enhanced risk evaluation",    summary: "Agent-led underwriting with a network of AI experts in a non-linear workflow evaluating complex E&S Property risks.", outcomes: ["Enhanced risk evaluation", "Faster complex risk decisions"], fromTime: "", toTime: "", fromSteps: [], toSteps: [], financial: [], operational: [], governance: [], impactBadges: [] },
  { id: "f5",  domain: "business",   pillar: "quality", status: "Roadmap",        title: "Future of claims — NA",            dept: "Claims",         impact: "Transformed lifecycle",       summary: "Exploring how agentic AI transforms Demand Package Management, Litigation Management and key intervention points across NA claims.", outcomes: ["Transformed claims lifecycle", "Reduced litigation cost"], fromTime: "", toTime: "", fromSteps: [], toSteps: [], financial: [], operational: [], governance: [], impactBadges: [] },
  { id: "f6",  domain: "technology", pillar: "cost",    status: "In development", title: "Autonomous ops agent",             dept: "Technology ops", impact: "Reduced MTTR",                summary: "Troubleshooting agent diagnoses incidents by collecting health signals, correlating anomalies and routing through human-in-loop to remediation.", outcomes: ["Reduced MTTR", "Lower SME dependency"], fromTime: "", toTime: "", fromSteps: [], toSteps: [], financial: [], operational: [], governance: [], impactBadges: [] },
  { id: "f7",  domain: "technology", pillar: "speed",   status: "In development", title: "Reverse engineering — mainframe",  dept: "App development",impact: "Accelerated modernisation",    summary: "Analyses legacy code to extract application insights, generating knowledge documents that accelerate RCA and support modernisation programmes.", outcomes: ["Accelerated modernisation", "Reduced SME bottleneck"], fromTime: "", toTime: "", fromSteps: [], toSteps: [], financial: [], operational: [], governance: [], impactBadges: [] },
  { id: "f8",  domain: "technology", pillar: "speed",   status: "Roadmap",        title: "Reinsurance modernisation — ARAMIS",dept:"App development",impact: "Faster migration",             summary: "GenWizard automates data migration from legacy to Duck Creek by generating source-to-target mapping, SQL code and test cases.", outcomes: ["Faster migration", "Reduced manual mapping effort"], fromTime: "", toTime: "", fromSteps: [], toSteps: [], financial: [], operational: [], governance: [], impactBadges: [] },
  { id: "f9",  domain: "technology", pillar: "quality", status: "Roadmap",        title: "Evergreening agent",               dept: "Security",       impact: "Faster patch assessment",     summary: "Analyse change impact of security patching for code vulnerabilities across the application estate.", outcomes: ["Improved security posture", "Faster patch assessment"], fromTime: "", toTime: "", fromSteps: [], toSteps: [], financial: [], operational: [], governance: [], impactBadges: [] },
  { id: "f10", domain: "technology", pillar: "quality", status: "Roadmap",        title: "GitHub Copilot spec kit",          dept: "App development",impact: "Standardised delivery",        summary: "Standardises TDLC by embedding guardrails, requirements and test strategies into a structured AI-guided project workflow.", outcomes: ["Standardised delivery", "Embedded AI guardrails"], fromTime: "", toTime: "", fromSteps: [], toSteps: [], financial: [], operational: [], governance: [], impactBadges: [] },
];

// ── ROOT APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd]       = useState("");
  const [pwdErr, setPwdErr] = useState(false);
  const [dk, setDk]                   = useState(false);
  const [view, setView]               = useState("home");
  const [ucs, setUcs]                 = useState(INIT_UCS);
  const [selId, setSelId]             = useState(null);
  const [fDomain, setFD]              = useState("all");
  const [fPillar, setFP]              = useState(["all"]);
  const [fStatus, setFS]              = useState("all");
  const [search, setSearch]           = useState("");
  const [showAdmin, setAdmin]         = useState(false);
  const [editUC, setEditUC]           = useState(null);
  const [videos, setVideos]           = useState({});
  const [archs, setArchs]             = useState({});
  const [uploadId, setUploadId]       = useState(null);
  const [uploadType, setUploadType]   = useState("video");
  const [chatOpen, setChat]           = useState(false);
  const fileRef = useRef(null);

  const t = dk ? TH.dark : TH.light;

  const filtered = useMemo(() => {
    let r = ucs;
    if (fDomain !== "all") r = r.filter(u => u.domain === fDomain);
    const pillarActive = Array.isArray(fPillar) ? fPillar.filter(p => p !== "all") : (fPillar !== "all" ? [fPillar] : []);
    if (pillarActive.length) r = r.filter(u => pillarActive.includes(u.pillar));
    if (fStatus !== "all") r = r.filter(u => u.status === fStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(u => u.title.toLowerCase().includes(q) || u.dept.toLowerCase().includes(q) || u.summary.toLowerCase().includes(q));
    }
    return r;
  }, [ucs, fDomain, fPillar, fStatus, search]);

  if (!authed) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#090B12",fontFamily:"'Inter','Segoe UI',sans-serif"}}>
      <div style={{background:"#111420",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"52px 48px",width:400,textAlign:"center",boxShadow:"0 32px 80px rgba(0,0,0,0.6)"}}>
        <svg width="32" height="28" viewBox="0 0 100 88" style={{marginBottom:12}}><polygon points="50,4 96,84 4,84" fill="none" stroke="#4B8FFF" strokeWidth="9" strokeLinejoin="round"/><line x1="50" y1="30" x2="50" y2="58" stroke="#4B8FFF" strokeWidth="8" strokeLinecap="round"/><circle cx="50" cy="70" r="5" fill="#4B8FFF"/></svg>
        <div style={{fontSize:20,color:"#EEF0F8",marginBottom:5,fontWeight:700,fontFamily:"inherit"}}>QBE AI Command Centre</div>
        <div style={{fontSize:11,color:"#5A6080",fontFamily:"monospace",letterSpacing:"0.2em",marginBottom:36}}>RESTRICTED ACCESS</div>
        <input type="password" placeholder="Enter password" value={pwd}
          onChange={e=>{setPwd(e.target.value);setPwdErr(false);}}
          onKeyDown={e=>{if(e.key==="Enter"){if(pwd===PASSWORD){setAuthed(true);}else{setPwdErr(true);}}}}
          style={{width:"100%",background:"#0D1018",border:`1px solid ${pwdErr?"#F07070":"rgba(255,255,255,0.07)"}`,borderRadius:8,padding:"12px 16px",color:"#EEF0F8",fontSize:14,outline:"none",marginBottom:12,boxSizing:"border-box",fontFamily:"monospace",letterSpacing:"0.06em",transition:"border 0.2s"}}/>
        {pwdErr && <div style={{fontSize:12,color:"#F07070",marginBottom:12,fontFamily:"monospace"}}>Incorrect password</div>}
        <button onClick={()=>{if(pwd===PASSWORD){setAuthed(true);}else{setPwdErr(true);}}}
          style={{width:"100%",background:"#4B8FFF",border:"none",borderRadius:8,padding:"13px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:"0.1em",fontFamily:"monospace"}}>
          ENTER →
        </button>
      </div>
    </div>
  );

  const selUC = ucs.find(u => u.id === selId);
  const isCat = view === "catalog" || view === "detail";
  const go    = (v, id) => { setView(v); if (id !== undefined) setSelId(id); };

  const handleUpload     = (e, id) => { e.stopPropagation(); setUploadId(id); setUploadType("video"); fileRef.current.click(); };
  const handleArchUpload = (e, id) => { e.stopPropagation(); setUploadId(id); setUploadType("arch");  fileRef.current.click(); };

  const handleFile = e => {
    const f = e.target.files[0];
    if (!f || !uploadId) return;
    const id = uploadId;
    setUploadId(null);
    if (uploadType === "arch") setArchs(p => ({ ...p, [id]: { name: f.name, url: URL.createObjectURL(f), mime: f.type } }));
    else                       setVideos(p => ({ ...p, [id]: { name: f.name, url: URL.createObjectURL(f) } }));
    e.target.value = "";
  };

  const removeVideo = (e, id) => { e.stopPropagation(); setVideos(p => { const n = { ...p }; delete n[id]; return n; }); };
  const removeArch  = (e, id) => { e.stopPropagation(); setArchs(p  => { const n = { ...p }; delete n[id]; return n; }); };

  const saveUC = uc => {
    setUcs(prev => {
      const i = prev.findIndex(u => u.id === uc.id);
      if (i >= 0) { const n = [...prev]; n[i] = uc; return n; }
      return [...prev, uc];
    });
    setEditUC(null);
    setAdmin(false);
  };

  const deleteUC = id => {
    setUcs(prev => prev.filter(u => u.id !== id));
    setEditUC(null);
    setAdmin(false);
    if (selId === id) go("catalog");
  };

  const css = `
    @keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
    @keyframes pulse  { 0%,100% { opacity:1 } 50% { opacity:0.35 } }
    @keyframes ticker { 0% { transform:translateX(0) } 100% { transform:translateX(-50%) } }
    * { box-sizing:border-box; margin:0 }
    button,input,select,textarea { font-family:inherit; cursor:pointer }
    input,select,textarea { cursor:text }
    .fade { animation:fadeIn 0.3s ease both }
    .card { background:${t.bgCard}; border:1px solid ${t.bd}; border-radius:14px; transition:box-shadow 0.2s,border-color 0.2s,transform 0.2s }
    .card-hover:hover { box-shadow:${t.shadowHover}; border-color:${t.bdStrong}; transform:translateY(-2px); cursor:pointer }
    ::placeholder { color:${t.tx3} }
    ::-webkit-scrollbar { width:4px; height:4px }
    ::-webkit-scrollbar-track { background:transparent }
    ::-webkit-scrollbar-thumb { background:${t.tx4}; border-radius:2px }
    .tbtn { background:transparent; border:1px solid ${t.bd}; border-radius:20px; padding:5px 13px; font-size:12px; color:${t.tx2}; transition:all 0.15s }
    .tbtn:hover { border-color:${t.accent}; color:${t.accent} }
    .tbtn.on { background:${t.tx1}; color:${t.bg}; border-color:${t.tx1}; font-weight:500 }
  `;

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", background: t.bg, minHeight: "100vh", color: t.tx1, transition: "background 0.3s,color 0.3s" }}>
      <style>{css}</style>
      <Nav
        t={t} dk={dk} setDk={setDk} view={view} go={go} isCat={isCat}
        onAdmin={() => { setEditUC(null); setAdmin(true); }}
        search={search} setSearch={s => { setSearch(s); if (view !== "catalog") go("catalog"); }}
        chatOpen={chatOpen} setChat={setChat}
      />
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(16px,3vw,40px)" }}>
        {view === "home"      && <HomePage      t={t} dk={dk} ucs={ucs} videos={videos} archs={archs} onUpload={handleUpload} onArchUpload={handleArchUpload} go={go} setFP={setFP} />}
        {view === "journey"   && <JourneyPage   t={t} dk={dk} go={go} />}
        {view === "catalog"   && <CatalogPage   t={t} dk={dk} ucs={filtered} allUcs={ucs} videos={videos} archs={archs} onUpload={handleUpload} onArchUpload={handleArchUpload} search={search} setSearch={setSearch} fDomain={fDomain} setFD={setFD} fPillar={fPillar} setFP={setFP} fStatus={fStatus} setFS={setFS} go={go} onEdit={uc => { setEditUC(uc); setAdmin(true); }} />}
        {view === "detail"    && selUC && <DetailPage t={t} dk={dk} uc={selUC} videos={videos} archs={archs} onUpload={handleUpload} onArchUpload={handleArchUpload} onRemove={removeVideo} onRemoveArch={removeArch} go={go} onEdit={() => { setEditUC(selUC); setAdmin(true); }} />}
        {view === "dashboard" && <DashboardPage t={t} dk={dk} ucs={ucs} go={go} />}
        {view === "client"    && <ClientSpeaksPage t={t} dk={dk} />}
      </div>
      <Footer t={t} />
      {showAdmin && (
        <AdminModal
          t={t} uc={editUC} ucs={ucs} onSave={saveUC} onDelete={deleteUC}
          onClose={() => { setAdmin(false); setEditUC(null); }}
          videos={videos} archs={archs}
          onUpload={handleUpload} onArchUpload={handleArchUpload}
          onRemoveVideo={removeVideo} onRemoveArch={removeArch}
        />
      )}
      {chatOpen && <ChatPanel t={t} ucs={ucs} onClose={() => setChat(false)} />}
      <input ref={fileRef} type="file" accept="video/*,image/*,.pdf" style={{ display: "none" }} onChange={handleFile} />
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────
function Nav({ t, dk, setDk, view, go, isCat, onAdmin, search, setSearch, chatOpen, setChat }) {
  const [sf, setSf] = useState(false);

  const NL = (label, v, iconName, match) => {
    const active = match ? match() : view === v;
    return (
      <button
        onClick={() => go(v)}
        style={{ background: "none", border: "none", fontSize: 13, fontWeight: active ? 600 : 400, color: active ? t.accent : t.tx2, display: "flex", alignItems: "center", gap: 5, padding: "4px 2px", borderBottom: `2px solid ${active ? t.accent : "transparent"}`, transition: "color 0.15s" }}
      >
        <Icon name={iconName} size={14} color={active ? t.accent : t.tx3} />{label}
      </button>
    );
  };

  return (
    <nav style={{ background: t.bgCard, borderBottom: `1px solid ${t.bd}`, padding: "0 clamp(16px,3vw,40px)", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <QBEMark t={t} />
          <span style={{ fontSize: 17, fontWeight: 800, color: t.tx1, letterSpacing: "0.04em" }}>QBE</span>
        </div>
        <div style={{ width: 1, height: 20, background: t.bd, margin: "0 4px" }} />
        <span style={{ fontSize: 11, color: t.tx3, fontWeight: 500 }}>AI Command Centre</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {NL("Home",         "home",      "home")}
        {NL("Journey",      "journey",   "journey",   () => view === "journey")}
        {NL("Catalog",      "catalog",   "catalog",   () => isCat)}
        {NL("Impact",       "dashboard", "dashboard", () => view === "dashboard")}
        {NL("Client Speaks","client",    "chat",      () => view === "client")}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <span style={{ position: "absolute", left: 8, pointerEvents: "none" }}>
            <Icon name="search" size={12} color={t.tx3} />
          </span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSf(true)}
            onBlur={() => setSf(false)}
            placeholder="Search…"
            style={{ background: t.bgMuted, border: `1px solid ${sf ? t.accent : t.bd}`, borderRadius: 8, padding: "5px 26px 5px 26px", fontSize: 12, color: t.tx1, width: 140, transition: "all 0.2s", outline: "none" }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ position: "absolute", right: 7, background: "none", border: "none", color: t.tx3, fontSize: 11, padding: 0 }}>
              <Icon name="close" size={10} color={t.tx3} />
            </button>
          )}
        </div>
        <button
          onClick={() => setChat(o => !o)}
          style={{ background: chatOpen ? t.accentBg : "transparent", border: `1px solid ${chatOpen ? t.accentBd : t.bd}`, borderRadius: 8, padding: "5px 11px", fontSize: 12, color: chatOpen ? t.accent : t.tx2, display: "flex", alignItems: "center", gap: 5 }}
        >
          <Icon name="chat" size={13} color={chatOpen ? t.accent : t.tx3} />Ask AI
        </button>
        {isCat && (
          <button onClick={onAdmin} style={{ background: "transparent", border: `1px solid ${t.bd}`, borderRadius: 8, padding: "5px 11px", fontSize: 12, color: t.tx2, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="add" size={13} color={t.tx3} />Add / Edit
          </button>
        )}
        <button onClick={() => setDk(d => !d)} style={{ background: "transparent", border: `1px solid ${t.bd}`, borderRadius: 8, padding: "6px 9px", display: "flex", alignItems: "center" }}>
          <Icon name={dk ? "sun" : "moon"} size={14} color={t.tx2} />
        </button>
      </div>
    </nav>
  );
}

function QBEMark({ t }) {
  return (
    <svg width="22" height="20" viewBox="0 0 100 88">
      <polygon points="50,4 96,84 4,84" fill="none" stroke={t.accent} strokeWidth="9" strokeLinejoin="round" />
      <line x1="50" y1="30" x2="50" y2="58" stroke={t.accent} strokeWidth="8" strokeLinecap="round" />
      <circle cx="50" cy="70" r="5" fill={t.accent} />
    </svg>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────
function HomePage({ t, dk, ucs, videos, archs, onUpload, onArchUpload, go, setFP }) {
  const live = ucs.filter(u => u.status === "Live");

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Hero */}
      <div className="fade" style={{ padding: "clamp(36px,6vw,72px) 0 clamp(20px,3vw,40px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: t.tx3, letterSpacing: "0.08em" }}>QBE × Accenture</span>
          <span style={{ fontSize: 11, color: t.tx4 }}>·</span>
          <span style={{ fontSize: 11, color: t.accent, fontWeight: 600 }}>AI Value Realization</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 14, maxWidth: 680 }}>
          Enterprise AI at <span style={{ color: t.accent }}>QBE</span>
        </h1>
        <p style={{ fontSize: "clamp(14px,1.8vw,18px)", color: t.tx2, lineHeight: 1.5, maxWidth: 700, marginBottom: 28 }}>
          Generating measurable value across the insurance value chain and technology delivery — from underwriting to claims to autonomous ops.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => go("catalog")} style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="catalog" size={15} color="#fff" />Explore catalog
          </button>
          <button onClick={() => go("dashboard")} style={{ background: "transparent", color: t.accent, border: `1px solid ${t.accentBd}`, borderRadius: 10, padding: "11px 22px", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="dashboard" size={15} color={t.accent} />View impact
          </button>
          <button onClick={() => go("journey")} style={{ background: "transparent", color: t.tx2, border: `1px solid ${t.bd}`, borderRadius: 10, padding: "11px 22px", fontSize: 14, display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="journey" size={15} color={t.tx3} />AI journey
          </button>
        </div>
      </div>

      {/* Metrics Ticker */}
      <div style={{ overflow: "hidden", borderTop: `1px solid ${t.bd}`, borderBottom: `1px solid ${t.bd}`, marginBottom: 40, padding: "13px 0", background: t.bgMuted }}>
        <div style={{ display: "flex", width: "max-content", animation: "ticker 30s linear infinite" }}>
          {[...METRICS, ...METRICS].map((m, i) => {
            const c = PC(t, m.pillar);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 30px", borderRight: `1px solid ${t.bd}` }}>
                <Icon name={m.icon || (m.pillar === "speed" ? "speed" : m.pillar === "cost" ? "cost" : "quality")} size={15} color={c.tx} />
                <span style={{ fontSize: 20, fontWeight: 800, color: c.tx }}>{m.value}</span>
                <span style={{ fontSize: 12, color: t.tx2, maxWidth: 130, lineHeight: 1.4 }}>{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pillars */}
      <div style={{ marginBottom: 40 }} className="fade">
        <SLabel t={t}>Explore by value pillar</SLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 14 }}>
          {PILLARS.map(p => {
            const c = PC(t, p.id);
            const cnt = ucs.filter(u => u.pillar === p.id).length;
            return (
              <button key={p.id} className="card card-hover" onClick={() => { setFP([p.id]); go("catalog"); }} style={{ padding: "22px 20px", textAlign: "left", background: t.bgCard }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Icon name={p.iconName} size={18} color={c.tx} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{p.label}</div>
                <div style={{ fontSize: 12, color: t.tx3, marginBottom: 10 }}>{cnt} use cases</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.tx, display: "flex", alignItems: "center", gap: 4 }}>
                  Explore <Icon name="roi" size={12} color={c.tx} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live solutions */}
      <div className="fade">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <SLabel t={t}>Live solutions</SLabel>
          <button onClick={() => go("catalog")} style={{ background: "none", border: "none", fontSize: 12, color: t.accent, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            View all <Icon name="catalog" size={12} color={t.accent} />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
          {live.map((uc, i) => (
            <UCCard key={uc.id} uc={uc} t={t} dk={dk} hasVideo={!!videos[uc.id]} hasArch={!!archs[uc.id]} onUpload={onUpload} onArchUpload={onArchUpload} onClick={() => go("detail", uc.id)} idx={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── JOURNEY PAGE ──────────────────────────────────────────────────────────
function JourneyPage({ t, dk, go }) {
  const [active, setActive] = useState(0);
  const j   = JOURNEY[active];
  const phC = [t.green, t.blue, t.purple];
  const phB = dk
    ? ["rgba(62,203,160,0.1)", "rgba(107,173,245,0.1)", "rgba(158,128,245,0.1)"]
    : ["#E7F7F3", "#E8F0FC", "#EEE9FC"];

  return (
    <div style={{ padding: "28px 0 60px" }} className="fade">
      <button onClick={() => go("home")} style={{ background: t.bgCard, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, color: t.tx2, display: "flex", alignItems: "center", gap: 5, marginBottom: 24 }}>
        <Icon name="back" size={14} color={t.tx2} />Back
      </button>
      <div style={{ fontSize: 11, fontWeight: 600, color: t.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Enterprise AI journey</div>
      <h2 style={{ fontSize: "clamp(22px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 6 }}>From experimentation to exponential impact</h2>
      <p style={{ fontSize: 14, color: t.tx2, marginBottom: 32, maxWidth: 580, lineHeight: 1.65 }}>QBE's progression from early AI pilots to scalable, agentic solutions delivering measurable impact across the enterprise.</p>

      {/* Timeline selector */}
      <div className="card" style={{ padding: "22px clamp(14px,3vw,30px) 18px", marginBottom: 20 }}>
        <div style={{ position: "relative", height: 4, background: t.bgDeep, borderRadius: 2, margin: "0 8% 20px" }}>
          <div style={{ position: "absolute", top: 0, left: 0, height: "100%", borderRadius: 2, background: `linear-gradient(90deg,${t.green},${active >= 1 ? t.blue : t.green},${active >= 2 ? t.purple : t.green})`, width: active === 0 ? "0%" : active === 1 ? "50%" : "100%", transition: "width 0.6s cubic-bezier(.4,0,.2,1)" }} />
          {JOURNEY.map((_, i) => {
            const pos = i === 0 ? 0 : i === 1 ? 50 : 100;
            return (
              <div key={i} onClick={() => setActive(i)} style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%,-50%)", cursor: "pointer", zIndex: 2 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: i <= active ? phC[i] : t.bgDeep, border: `3px solid ${t.bgCard}`, transition: "all 0.4s", boxShadow: i <= active ? `0 0 0 3px ${phC[i]}33` : "none" }} />
              </div>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {JOURNEY.map((ph, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ background: active === i ? phB[i] : t.bgMuted, border: `1px solid ${active === i ? phC[i] + "55" : t.bd}`, borderRadius: 10, padding: "14px 14px 12px", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ marginBottom: 10 }}><PhaseIcon phase={i} color={phC[i]} size={28} /></div>
              <div style={{ fontSize: 11, fontWeight: 600, color: phC[i], marginBottom: 2 }}>{ph.phase}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.tx1, marginBottom: 2 }}>{ph.label}</div>
              <div style={{ fontSize: 11, color: t.tx3, fontStyle: "italic" }}>{ph.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Phase content */}
      <div key={active} className="fade">
        <div className="card" style={{ padding: "18px 22px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
            <Icon name="star" size={14} color={phC[active]} />
            <span style={{ fontSize: 11, fontWeight: 600, color: phC[active], letterSpacing: "0.1em", textTransform: "uppercase" }}>Strategic milestones</span>
          </div>
          {j.milestones.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < j.milestones.length - 1 ? 10 : 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: phB[active], color: phC[active], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: t.tx2, lineHeight: 1.6, paddingTop: 2 }}>{m}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 10, marginBottom: 28 }}>
          {j.highlights.map((h, i) => (
            <div key={i} className="card" style={{ padding: "15px 17px", borderLeft: `3px solid ${phC[active]}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ background: phB[active], padding: "2px 8px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name={h.icon} size={11} color={phC[active]} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: phC[active] }}>{h.tag}</span>
                </span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{h.title}</div>
              <div style={{ fontSize: 12, color: t.tx2, lineHeight: 1.5 }}>{h.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Talent banner */}
      <div style={{ background: `linear-gradient(135deg,${t.accent}ee,${t.blue}cc)`, borderRadius: 14, padding: "22px 26px", color: "#fff", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <Icon name="bolt" size={16} color="#fff" />
          <span style={{ fontSize: 15, fontWeight: 700 }}>AI-first talent transformation</span>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.92 }}>QBE and Accenture are embedding AI capability at every level of the organisation — from executive GenAI literacy programmes to hands-on delivery teams co-building agentic solutions. This ensures AI adoption is sustained, governed and commercially impactful at scale.</div>
      </div>

      {/* Cumulative metrics */}
      <SLabel t={t}>Cumulative impact</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10, marginTop: 12, marginBottom: 24 }}>
        {METRICS.map((m, i) => {
          const c = PC(t, m.pillar);
          return (
            <div key={i} className="card" style={{ padding: "14px 16px", textAlign: "center" }}>
              <Icon name={m.icon || (m.pillar === "speed" ? "speed" : m.pillar === "cost" ? "cost" : "quality")} size={16} color={c.tx} style={{ margin: "0 auto 6px" }} />
              <div style={{ fontSize: 22, fontWeight: 800, color: c.tx, marginBottom: 3 }}>{m.value}</div>
              <div style={{ fontSize: 11, color: t.tx2, lineHeight: 1.4 }}>{m.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── DASHBOARD PAGE ────────────────────────────────────────────────────────
function DashboardPage({ t, dk, ucs, go }) {
  const live    = ucs.filter(u => u.status === "Live").length;
  const inDev   = ucs.filter(u => u.status === "In development").length;
  const roadmap = ucs.filter(u => u.status === "Roadmap").length;

  // ROI table state — editable
  const [roiRows, setRoiRows]     = useState(ROI_DATA.map(r => ({ ...r })));
  const [editingRoi, setEditingRoi] = useState(null);

  const updateRoi = (id, k, v) => setRoiRows(p => p.map(r => r.id === id ? { ...r, [k]: v } : r));
  const addRoiRow = () => {
    const id = "roi_" + Date.now();
    setRoiRows(p => [...p, { id, label: "New solution", gwp: "—", cost: "—", timeFrom: "—", timeTo: "—", pct: 0, pillar: "speed" }]);
    setEditingRoi(id);
  };
  const removeRoiRow = id => { setRoiRows(p => p.filter(r => r.id !== id)); if (editingRoi === id) setEditingRoi(null); };

  // FTE table state — editable
  const [fteRows, setFteRows]       = useState([
    { id: 1, label: "Underwriting — submission triage",  fte: 35 },
    { id: 2, label: "Claims — FNOL & validation",        fte: 15 },
    { id: 3, label: "Technology ops — event triage/RCA", fte: 10 },
  ]);
  const [editingFte, setEditingFte] = useState(null);
  const totalFte = fteRows.reduce((s, r) => s + Number(r.fte || 0), 0);

  const addFteRow    = () => { const id = Date.now(); setFteRows(p => [...p, { id, label: "New area", fte: 0 }]); setEditingFte(id); };
  const removeFteRow = id => setFteRows(p => p.filter(r => r.id !== id));
  const updateFte    = (id, k, v) => setFteRows(p => p.map(r => r.id === id ? { ...r, [k]: v } : r));

  return (
    <div style={{ padding: "28px 0 60px" }} className="fade">
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
        <Icon name="dashboard" size={18} color={t.accent} />
        <span style={{ fontSize: 11, fontWeight: 600, color: t.accent, letterSpacing: "0.12em", textTransform: "uppercase" }}>Impact dashboard</span>
      </div>
      <h2 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 }}>AI value realization at QBE</h2>
      <p style={{ fontSize: 14, color: t.tx2, marginBottom: 28, maxWidth: 560, lineHeight: 1.6 }}>Aggregate impact across all live AI initiatives — measuring financial return, operational efficiency and portfolio maturity.</p>

      {/* Portfolio KPI cards */}
      <SLabel t={t}>Portfolio summary</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginTop: 12, marginBottom: 32 }}>
        {[
          { label: "Total use cases",   value: ucs.length, icon: "catalog",  color: t.accent },
          { label: "Live in production",value: live,        icon: "check",    color: t.green  },
          { label: "In development",    value: inDev,       icon: "bolt",     color: t.blue   },
          { label: "On roadmap",        value: roadmap,     icon: "journey",  color: t.purple },
          { label: "NB GWP uplift",     value: "~$10M",     icon: "cost",     color: t.green  },
          { label: "CSAT score",        value: "94%",       icon: "star",     color: t.amber  },
        ].map((k, i) => (
          <div key={i} className="card" style={{ padding: "16px 14px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><Icon name={k.icon} size={18} color={k.color} /></div>
            <div style={{ fontSize: 24, fontWeight: 800, color: k.color, marginBottom: 4 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: t.tx2, lineHeight: 1.4 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* ROI Breakdown — editable */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <SLabel t={t}>ROI breakdown — live solutions</SLabel>
        <button onClick={addRoiRow} style={{ background: t.bgMuted, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "5px 12px", fontSize: 12, color: t.tx2, display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name="add" size={13} color={t.tx3} />Add row
        </button>
      </div>
      <div style={{ marginBottom: 32, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: t.bgMuted }}>
              {["Solution", "Pillar", "Time: before", "Time: after", "Time saved %", "Financial return", "Investment", ""].map((h, i) => (
                <th key={i} style={{ padding: "10px 14px", textAlign: i === 0 ? "left" : "center", fontWeight: 600, color: t.tx2, fontSize: 11, whiteSpace: "nowrap", borderBottom: `1px solid ${t.bd}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roiRows.map(r => {
              const pc  = PC(t, r.pillar);
              const pil = PILLARS.find(p => p.id === r.pillar);
              const isEditing = editingRoi === r.id;
              const inpS = { padding: "4px 7px", border: `1px solid ${t.accent}`, borderRadius: 6, fontSize: 12, background: t.bgMuted, color: t.tx1, outline: "none", width: "100%" };

              return isEditing ? (
                <tr key={r.id} style={{ borderBottom: `1px solid ${t.bd}`, background: t.accentBg }}>
                  <td style={{ padding: "8px 10px" }}><input value={r.label}   onChange={e => updateRoi(r.id, "label",   e.target.value)}                       style={{ ...inpS, minWidth: 120 }} /></td>
                  <td style={{ padding: "8px 10px" }}>
                    <select value={r.pillar} onChange={e => updateRoi(r.id, "pillar", e.target.value)} style={{ ...inpS, minWidth: 90 }}>
                      {PILLARS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "8px 10px" }}><input value={r.timeFrom} onChange={e => updateRoi(r.id, "timeFrom", e.target.value)}                     style={{ ...inpS, minWidth: 70 }} /></td>
                  <td style={{ padding: "8px 10px" }}><input value={r.timeTo}   onChange={e => updateRoi(r.id, "timeTo",   e.target.value)}                     style={{ ...inpS, minWidth: 70 }} /></td>
                  <td style={{ padding: "8px 10px" }}><input type="number" min="0" max="100" value={r.pct} onChange={e => updateRoi(r.id, "pct", Number(e.target.value))} style={{ ...inpS, minWidth: 60 }} /></td>
                  <td style={{ padding: "8px 10px" }}><input value={r.gwp}      onChange={e => updateRoi(r.id, "gwp",      e.target.value)}                     style={{ ...inpS, minWidth: 70 }} /></td>
                  <td style={{ padding: "8px 10px" }}><input value={r.cost}     onChange={e => updateRoi(r.id, "cost",     e.target.value)}                     style={{ ...inpS, minWidth: 70 }} /></td>
                  <td style={{ padding: "8px 10px", textAlign: "center", whiteSpace: "nowrap" }}>
                    <button onClick={() => setEditingRoi(null)} style={{ background: t.green, border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#fff", fontWeight: 600, marginRight: 4 }}>Done</button>
                    <button onClick={() => removeRoiRow(r.id)} style={{ background: "none", border: `1px solid ${t.red}`, borderRadius: 6, padding: "4px 8px", fontSize: 11, color: t.red }}><Icon name="trash" size={11} color={t.red} /></button>
                  </td>
                </tr>
              ) : (
                <tr key={r.id} style={{ borderBottom: `1px solid ${t.bd}` }} onMouseEnter={e => e.currentTarget.style.background = t.bgMuted} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "12px 14px", fontWeight: 600 }}>{r.label}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <span style={{ background: pc.bg, color: pc.tx, fontSize: 10, fontWeight: 500, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
                      <Icon name={pil?.iconName || "star"} size={10} color={pc.tx} />{pil?.label}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", textAlign: "center", color: t.tx3, fontSize: 12 }}>{r.timeFrom}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center", color: t.green, fontWeight: 600, fontSize: 12 }}>{r.timeTo}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      <div style={{ width: 60, height: 6, borderRadius: 3, background: t.bgDeep, overflow: "hidden" }}>
                        <div style={{ width: `${r.pct}%`, height: "100%", background: t.green, borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 11, color: t.green, fontWeight: 600 }}>{r.pct}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 14px", textAlign: "center", fontWeight: 600, color: r.gwp === "—" ? t.tx3 : t.green }}>{r.gwp}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center", color: t.tx2 }}>{r.cost}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <button onClick={() => setEditingRoi(r.id)} style={{ background: "none", border: `1px solid ${t.bd}`, borderRadius: 6, padding: "3px 10px", fontSize: 10, color: t.tx3, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Icon name="edit" size={11} color={t.tx3} />Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FTE Savings */}
      <SLabel t={t}>FTE productivity savings</SLabel>
      <div className="card" style={{ padding: "18px 20px", marginTop: 12, marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: t.greenBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="person" size={22} color={t.green} />
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: t.green, lineHeight: 1 }}>{totalFte}</div>
              <div style={{ fontSize: 11, color: t.tx3, marginTop: 2 }}>total FTEs freed</div>
            </div>
          </div>
          <button onClick={addFteRow} style={{ background: t.bgMuted, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, color: t.tx2, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="add" size={13} color={t.tx3} />Add row
          </button>
        </div>
        <div style={{ borderTop: `1px solid ${t.bd}`, paddingTop: 12 }}>
          {fteRows.map((row, i) => {
            const pct       = totalFte > 0 ? Math.round((row.fte / totalFte) * 100) : 0;
            const isEditing = editingFte === row.id;
            return (
              <div key={row.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < fteRows.length - 1 ? 10 : 0 }}>
                {isEditing ? (
                  <>
                    <input value={row.label} onChange={e => updateFte(row.id, "label", e.target.value)}
                      style={{ flex: 1, padding: "5px 8px", border: `1px solid ${t.accent}`, borderRadius: 6, fontSize: 12, background: t.bgMuted, color: t.tx1, outline: "none" }} />
                    <input type="number" value={row.fte} onChange={e => updateFte(row.id, "fte", e.target.value)}
                      style={{ width: 64, padding: "5px 8px", border: `1px solid ${t.accent}`, borderRadius: 6, fontSize: 12, background: t.bgMuted, color: t.tx1, textAlign: "center", outline: "none" }} />
                    <button onClick={() => setEditingFte(null)} style={{ background: t.green, border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, color: "#fff", fontWeight: 600 }}>Done</button>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 12, color: t.tx2, flex: 1 }}>{row.label}</span>
                    <div style={{ width: 80, height: 6, borderRadius: 3, background: t.bgDeep, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: t.green, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: t.green, minWidth: 28, textAlign: "right" }}>{row.fte}</span>
                    <button onClick={() => setEditingFte(row.id)} style={{ background: "none", border: `1px solid ${t.bd}`, borderRadius: 6, padding: "3px 8px", fontSize: 10, color: t.tx3, display: "flex", alignItems: "center" }}>
                      <Icon name="edit" size={10} color={t.tx3} />
                    </button>
                    <button onClick={() => removeFteRow(row.id)} style={{ background: "none", border: "none", padding: "3px 4px", color: t.tx4, display: "flex", alignItems: "center" }}>
                      <Icon name="close" size={10} color={t.tx4} />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        {/* Bar chart */}
        <div className="card" style={{ padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
            <Icon name="chart" size={15} color={t.accent} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Effort reduction — before vs. after AI</span>
          </div>
          <p style={{ fontSize: 12, color: t.tx3, marginBottom: 16 }}>Normalised to 100% = pre-AI baseline</p>
          {BAR_DATA.map((d, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: t.tx2, fontWeight: 500 }}>{d.label}</span>
                <span style={{ fontSize: 11, color: t.tx3 }}>{d.desc}</span>
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <div style={{ flex: 1, height: 10, borderRadius: 5, background: t.bgDeep, overflow: "hidden" }}>
                  <div style={{ width: `${d.after}%`, height: "100%", background: t.green, borderRadius: 5 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: t.green, minWidth: 34, textAlign: "right" }}>{d.after}%</span>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: t.bgDeep, border: `1px solid ${t.bd}` }} />
              <span style={{ fontSize: 11, color: t.tx3 }}>Before (100%)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: t.green }} />
              <span style={{ fontSize: 11, color: t.tx3 }}>After AI</span>
            </div>
          </div>
        </div>

        {/* Donut chart */}
        <div className="card" style={{ padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
            <Icon name="target" size={15} color={t.accent} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Portfolio status</span>
          </div>
          <p style={{ fontSize: 12, color: t.tx3, marginBottom: 16 }}>{ucs.length} use cases across business & technology</p>
          <DonutChart t={t} live={live} inDev={inDev} roadmap={roadmap} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
            {[{ label: "Live", count: live, color: t.green }, { label: "In development", count: inDev, color: t.blue }, { label: "Roadmap", count: roadmap, color: t.purple }].map(s => (
              <div key={s.label} style={{ textAlign: "center", background: t.bgMuted, borderRadius: 8, padding: "10px 6px" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color, marginBottom: 2 }}>{s.count}</div>
                <div style={{ fontSize: 10, color: t.tx2, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pillar breakdown */}
      <SLabel t={t}>Use cases by value pillar</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 12, marginBottom: 32 }}>
        {PILLARS.map(p => {
          const c       = PC(t, p.id);
          const cnt     = ucs.filter(u => u.pillar === p.id).length;
          const liveCnt = ucs.filter(u => u.pillar === p.id && u.status === "Live").length;
          const pct     = Math.round((liveCnt / cnt) * 100) || 0;
          return (
            <div key={p.id} className="card" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={p.iconName} size={17} color={c.tx} />
                </div>
                <span style={{ fontSize: 22, fontWeight: 800, color: c.tx }}>{cnt}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: t.tx3, marginBottom: 10 }}>{liveCnt} live · {cnt - liveCnt} pipeline</div>
              <div style={{ height: 5, borderRadius: 3, background: t.bgDeep, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: c.tx, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 10, color: c.tx, marginTop: 4, fontWeight: 600 }}>{pct}% live</div>
            </div>
          );
        })}
      </div>

      {/* Deployment footprint */}
      <SLabel t={t}>Deployment footprint</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, marginTop: 12 }}>
        {DEPLOYMENT.map((d, i) => {
          const sc = SC(t, d.status);
          return (
            <div key={i} className="card" style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="globe" size={14} color={t.accent} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{d.region}</span>
                </div>
                <span style={{ background: sc.bg, color: sc.tx, fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                  {d.status === "Live" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.tx, animation: "pulse 2s infinite" }} />}
                  {d.status}
                </span>
              </div>
              {d.ucs.map((u, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4, fontSize: 12, color: t.tx2 }}>
                  <Icon name="check" size={11} color={d.status === "Live" ? t.green : t.blue} />{u}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── DONUT CHART ───────────────────────────────────────────────────────────
function DonutChart({ t, live, inDev, roadmap }) {
  const total = live + inDev + roadmap;
  const r     = 52, cx = 70, cy = 70, stroke = 20;
  const circ  = 2 * Math.PI * r;
  const segs  = [{ count: live, color: t.green }, { count: inDev, color: t.blue }, { count: roadmap, color: t.purple }];
  let off = 0;
  const rendered = segs.map(seg => {
    const pct  = seg.count / total;
    const dash = pct * circ;
    const s    = { ...seg, da: `${dash} ${circ - dash}`, do: -off * circ };
    off += pct;
    return s;
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={t.bgDeep} strokeWidth={stroke} />
        {rendered.map((s, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke} strokeDasharray={s.da} strokeDashoffset={s.do} transform={`rotate(-90 ${cx} ${cy})`} />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fill={t.tx1} fontSize="22" fontWeight="800">{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill={t.tx3} fontSize="10">total</text>
      </svg>
      <div style={{ flex: 1 }}>
        {[{ label: "Live", count: live, color: t.green }, { label: "In dev", count: inDev, color: t.blue }, { label: "Roadmap", count: roadmap, color: t.purple }].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: t.tx2, flex: 1 }}>{s.label}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CATALOG PAGE ──────────────────────────────────────────────────────────
function CatalogPage({ t, dk, ucs, allUcs, videos, archs, onUpload, onArchUpload, search, setSearch, fDomain, setFD, fPillar, setFP, fStatus, setFS, go, onEdit }) {
  const [tableMode, setTableMode] = useState(false);
  const [sort, setSort]           = useState({ key: "title", dir: 1 });

  const sorted     = useMemo(() => [...ucs].sort((a, b) => sort.dir * (a[sort.key] || "").toString().localeCompare((b[sort.key] || "").toString())), [ucs, sort]);
  const toggleSort = k => setSort(s => s.key === k ? { key: k, dir: -s.dir } : { key: k, dir: 1 });

  return (
    <div style={{ padding: "28px 0 60px" }} className="fade">
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 5 }}>Use case catalog</h2>
      <p style={{ fontSize: 14, color: t.tx2, marginBottom: 20 }}>All AI initiatives across QBE — filter by domain, pillar or status.</p>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: t.tx1, marginRight: 2 }}>Domain:</span>
        {[["all", "All"], ["business", "Business"], ["technology", "Technology"]].map(([v, l]) => (
          <button key={v} className={`tbtn${fDomain === v ? " on" : ""}`} onClick={() => setFD(v)}>{l}</button>
        ))}
        <div style={{ width: 1, height: 20, background: t.bd, margin: "0 8px" }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: t.tx1, marginRight: 2 }}>Pillar:</span>
        {[["all", "All"], ...PILLARS.map(p => [p.id, p.label])].map(([v, l]) => {
          const isAll  = v === "all";
          const active = isAll ? fPillar.length === 0 || fPillar[0] === "all" : Array.isArray(fPillar) && fPillar.includes(v);
          const handlePillar = () => {
            if (isAll) { setFP(["all"]); return; }
            const cur  = Array.isArray(fPillar) && fPillar[0] !== "all" ? fPillar : [];
            const next = cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v];
            setFP(next.length ? next : ["all"]);
          };
          return <button key={v} className={`tbtn${active ? " on" : ""}`} onClick={handlePillar}>{l}</button>;
        })}
        <div style={{ width: 1, height: 20, background: t.bd, margin: "0 8px" }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: t.tx1, marginRight: 2 }}>Status:</span>
        {["all", "Live", "In development", "Roadmap"].map(s => (
          <button key={s} className={`tbtn${fStatus === s ? " on" : ""}`} onClick={() => setFS(s)}>{s === "all" ? "All" : s}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={() => setTableMode(m => !m)} style={{ background: "transparent", border: `1px solid ${t.bd}`, borderRadius: 8, padding: "5px 10px", fontSize: 12, color: t.tx2, display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name={tableMode ? "grid" : "table"} size={13} color={t.tx3} />{tableMode ? "Cards" : "Table"}
        </button>
      </div>

      <div style={{ fontSize: 12, color: t.tx3, marginBottom: 14 }}>{ucs.length} of {allUcs.length} use cases</div>

      {ucs.length === 0 ? (
        <div className="card" style={{ padding: 44, textAlign: "center" }}>
          <Icon name="search" size={24} color={t.tx4} style={{ margin: "0 auto 10px" }} />
          <div style={{ fontSize: 14, color: t.tx3 }}>No use cases match the current filters.</div>
        </div>
      ) : tableMode ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.bd}` }}>
                {[["title", "Title"], ["dept", "Department"], ["status", "Status"], ["pillar", "Pillar"], ["impact", "Impact"]].map(([k, l]) => (
                  <th key={k} onClick={() => toggleSort(k)} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: t.tx2, cursor: "pointer", whiteSpace: "nowrap", userSelect: "none" }}>
                    {l} <span style={{ color: sort.key === k ? t.accent : t.tx4 }}>{sort.key === k ? (sort.dir > 0 ? "↑" : "↓") : "↕"}</span>
                  </th>
                ))}
                <th style={{ padding: "10px 14px" }}></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(uc => {
                const sc  = SC(t, uc.status);
                const pc  = PC(t, uc.pillar);
                const pil = PILLARS.find(p => p.id === uc.pillar);
                return (
                  <tr key={uc.id} onClick={() => go("detail", uc.id)} style={{ borderBottom: `1px solid ${t.bd}`, cursor: "pointer", transition: "background 0.15s" }} onMouseEnter={e => e.currentTarget.style.background = t.bgMuted} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "10px 14px", fontWeight: 500 }}>{uc.title}</td>
                    <td style={{ padding: "10px 14px", color: t.tx2 }}>{uc.dept}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ background: sc.bg, color: sc.tx, fontSize: 10, fontWeight: 500, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
                        {uc.status === "Live" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.tx, animation: "pulse 2s infinite" }} />}{uc.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ background: pc.bg, color: pc.tx, fontSize: 10, fontWeight: 500, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
                        <Icon name={pil?.iconName || "star"} size={10} color={pc.tx} />{pil?.label}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px", color: t.tx2, fontSize: 12 }}>{uc.impact}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <button onClick={e => { e.stopPropagation(); onEdit(uc); }} style={{ background: "none", border: `1px solid ${t.bd}`, borderRadius: 6, padding: "3px 10px", fontSize: 10, color: t.tx3, display: "flex", alignItems: "center", gap: 4 }}>
                        <Icon name="edit" size={11} color={t.tx3} />Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
          {ucs.map((uc, i) => (
            <UCCard key={uc.id} uc={uc} t={t} dk={dk} hasVideo={!!videos[uc.id]} hasArch={!!archs[uc.id]} onUpload={onUpload} onArchUpload={onArchUpload} onClick={() => go("detail", uc.id)} idx={i} onEdit={() => onEdit(uc)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── UC CARD ───────────────────────────────────────────────────────────────
function UCCard({ uc, t, dk, onClick, idx, onEdit, hasVideo, hasArch, onUpload, onArchUpload }) {
  const sc  = SC(t, uc.status);
  const pc  = PC(t, uc.pillar);
  const pil = PILLARS.find(p => p.id === uc.pillar);
  return (
    <div onClick={onClick} className="card card-hover" style={{ padding: 20, display: "flex", flexDirection: "column", animation: `fadeIn 0.3s ease ${Math.min(idx * 0.03, 0.3)}s both` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 6 }}>
        <span style={{ fontSize: 11, color: t.tx3, fontWeight: 500 }}>{uc.dept}</span>
        <span style={{ background: sc.bg, color: sc.tx, fontSize: 10, fontWeight: 500, padding: "3px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
          {uc.status === "Live" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.tx, animation: "pulse 2s infinite" }} />}{uc.status}
        </span>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 7, lineHeight: 1.3 }}>{uc.title}</h3>
      <div style={{ display: "flex", gap: 5, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ background: pc.bg, color: pc.tx, fontSize: 10, fontWeight: 500, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Icon name={pil?.iconName || "star"} size={10} color={pc.tx} />{pil?.label}
        </span>
        {uc.impact && <span style={{ background: t.bgMuted, color: t.tx2, fontSize: 10, padding: "3px 10px", borderRadius: 20 }}>{uc.impact}</span>}
      </div>
      <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.6, flex: 1, marginBottom: 14 }}>{uc.summary}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: t.accent, display: "flex", alignItems: "center", gap: 4 }}>
          View details <Icon name="roi" size={12} color={t.accent} />
        </span>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {hasVideo  && <span style={{ fontSize: 10, background: t.accentBg, color: t.accent, borderRadius: 4, padding: "2px 7px", display: "flex", alignItems: "center", gap: 3 }}><Icon name="video"  size={10} color={t.accent} />Video</span>}
          {hasArch   && <span style={{ fontSize: 10, background: t.amberBg,  color: t.amber,  borderRadius: 4, padding: "2px 7px", display: "flex", alignItems: "center", gap: 3 }}><Icon name="image"  size={10} color={t.amber}  />Arch</span>}
          {onUpload     && <button onClick={e => onUpload(e, uc.id)}     style={{ background: "none", border: `1px solid ${t.bd}`, borderRadius: 6, padding: "3px 8px", fontSize: 10, color: t.tx3, display: "flex", alignItems: "center", gap: 3 }}><Icon name="video"  size={10} color={t.tx3} />{hasVideo ? "Replace" : "Video"}</button>}
          {onArchUpload && <button onClick={e => onArchUpload(e, uc.id)} style={{ background: "none", border: `1px solid ${t.bd}`, borderRadius: 6, padding: "3px 8px", fontSize: 10, color: t.tx3, display: "flex", alignItems: "center", gap: 3 }}><Icon name="attach" size={10} color={t.tx3} />{hasArch  ? "Replace" : "Arch"}</button>}
          {onEdit       && <button onClick={e => { e.stopPropagation(); onEdit(); }} style={{ background: "none", border: `1px solid ${t.bd}`, borderRadius: 6, padding: "3px 8px", fontSize: 10, color: t.tx3, display: "flex", alignItems: "center", gap: 3 }}><Icon name="edit" size={10} color={t.tx3} />Edit</button>}
        </div>
      </div>
    </div>
  );
}

// ── DETAIL PAGE ───────────────────────────────────────────────────────────
function DetailPage({ t, dk, uc, videos = {}, archs = {}, onUpload, onArchUpload, onRemove, onRemoveArch, go, onEdit }) {
  const pc   = PC(t, uc.pillar);
  const sc   = SC(t, uc.status);
  const hasPT = uc.fromSteps?.length > 0;
  const pil  = PILLARS.find(p => p.id === uc.pillar);

  return (
    <div style={{ padding: "28px 0 60px", maxWidth: 840 }} className="fade">
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button onClick={() => go("catalog")} style={{ background: t.bgCard, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, color: t.tx2, display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name="back" size={13} color={t.tx2} />Back
        </button>
        <button onClick={onEdit} style={{ background: t.bgCard, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, color: t.tx2, display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name="edit" size={13} color={t.tx2} />Edit
        </button>
      </div>

      <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{ background: sc.bg, color: sc.tx, fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 5 }}>
          {uc.status === "Live" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: sc.tx, animation: "pulse 2s infinite" }} />}{uc.status}
        </span>
        <span style={{ background: pc.bg, color: pc.tx, fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Icon name={pil?.iconName || "star"} size={11} color={pc.tx} />{pil?.label}
        </span>
        <span style={{ fontSize: 12, color: t.tx3 }}>{uc.dept}</span>
      </div>

      <h1 style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>{uc.title}</h1>
      {uc.impact && <div style={{ display: "inline-block", background: pc.bg, color: pc.tx, fontSize: 14, fontWeight: 600, padding: "5px 16px", borderRadius: 8, marginBottom: 18 }}>{uc.impact}</div>}
      <p style={{ fontSize: 15, color: t.tx2, lineHeight: 1.7, marginBottom: 26 }}>{uc.summary}</p>

      {/* Key outcomes */}
      {uc.outcomes?.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <SLabel t={t}>Key outcomes</SLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, marginTop: 12 }}>
            {uc.outcomes.map((o, i) => (
              <div key={i} className="card" style={{ padding: "12px 15px", borderLeft: `3px solid ${pc.tx}`, borderRadius: "0 12px 12px 0", display: "flex", alignItems: "flex-start", gap: 8 }}>
                <Icon name="check" size={14} color={pc.tx} style={{ marginTop: 2, flexShrink: 0 }} />
                <div style={{ fontSize: 13, color: t.tx2, lineHeight: 1.5 }}>{o}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process transformation */}
      {hasPT && (
        <div className="card" style={{ padding: "20px 22px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
            <Icon name="journey" size={14} color={pc.tx} />
            <SLabel t={t} color={pc.tx}>Process transformation</SLabel>
          </div>
          {[
            { label: "Before",              time: uc.fromTime, steps: uc.fromSteps.map(s => ({ l: s, a: false })), tc: t.tx3,  bg: "transparent", bd: t.bd    },
            { label: "After — agentic AI",  time: uc.toTime,   steps: uc.toSteps,                                  tc: pc.tx, bg: pc.bg,          bd: pc.bd   },
          ].map((row, ri) => (
            <div key={ri} style={{ marginBottom: ri === 0 ? 16 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, alignItems: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: row.tc, letterSpacing: "0.1em", textTransform: "uppercase" }}>{row.label}</span>
                {row.time && <span style={{ fontSize: 12, fontWeight: 600, color: row.tc, background: row.bg || t.bgMuted, padding: "2px 10px", borderRadius: 20, border: `1px solid ${row.bd}` }}>{row.time}</span>}
              </div>
              <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
                {row.steps.map((s, i) => (
                  <div key={i} style={{ flex: 1, minWidth: 90, background: s.a ? pc.bg : "transparent", border: `1px solid ${s.a ? pc.bd : t.bd}`, borderRadius: 8, padding: "9px 10px", fontSize: 11, color: s.a ? pc.tx : t.tx2, lineHeight: 1.45 }}>
                    {s.a && (
                      <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
                        <Icon name="agent" size={10} color={pc.tx} />
                        <span style={{ fontSize: 9, fontWeight: 600, opacity: 0.75 }}>AI agent</span>
                      </div>
                    )}
                    {s.l}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Value outcomes + impact badges */}
      {(uc.financial?.length > 0 || uc.impactBadges?.length > 0) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {(uc.financial?.length > 0 || uc.operational?.length > 0 || uc.governance?.length > 0) && (
            <div className="card" style={{ padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <Icon name="roi" size={14} color={t.accent} /><SLabel t={t}>Value outcomes</SLabel>
              </div>
              {[["Financial", uc.financial], ["Operational", uc.operational], ["Governance", uc.governance]].map(([title, items]) =>
                items?.length > 0 && (
                  <div key={title} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{title}</div>
                    {items.map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5, fontSize: 12, color: t.tx2, lineHeight: 1.5 }}>
                        <span style={{ color: pc.tx, flexShrink: 0 }}>›</span><span>{f}</span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
          {uc.impactBadges?.length > 0 && (
            <div className="card" style={{ padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <Icon name="chart" size={14} color={t.accent} /><SLabel t={t}>Impact indicators</SLabel>
              </div>
              {uc.impactBadges.map((im, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: t.bgMuted, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "9px 13px", marginBottom: 7 }}>
                  <Icon name={im.d === "up" ? "arrowUp" : "arrowDn"} size={16} color={im.d === "up" ? t.green : t.red} />
                  <span style={{ fontSize: 12.5, color: t.tx2 }}>{im.l}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Architecture */}
      <div className="card" style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <Icon name="attach" size={14} color={t.amber} /><SLabel t={t}>Solution architecture</SLabel>
        </div>
        {archs[uc.id] ? (
          <div>
            {archs[uc.id].mime?.startsWith("image") ? (
              <img src={archs[uc.id].url} alt="Architecture diagram" style={{ width: "100%", borderRadius: 8, border: `1px solid ${t.bd}`, display: "block" }} />
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: t.amberBg, border: `1px solid ${t.amberBd}`, borderRadius: 8, padding: "12px 16px" }}>
                <Icon name="attach" size={18} color={t.amber} />
                <span style={{ fontSize: 13, color: t.tx1, fontWeight: 500 }}>{archs[uc.id].name}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
              <span style={{ fontSize: 11, color: t.tx3 }}>{archs[uc.id].name}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={e => onArchUpload(e, uc.id)} style={{ fontSize: 11, color: t.tx2, background: "none", border: `1px solid ${t.bd}`, borderRadius: 6, padding: "4px 12px", display: "flex", alignItems: "center", gap: 4 }}><Icon name="upload" size={11} color={t.tx2} />Replace</button>
                <button onClick={e => onRemoveArch(e, uc.id)} style={{ fontSize: 11, color: t.red, background: "none", border: `1px solid ${t.red}55`, borderRadius: 6, padding: "4px 12px", display: "flex", alignItems: "center", gap: 4 }}><Icon name="trash" size={11} color={t.red} />Remove</button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={e => onArchUpload(e, uc.id)}
            style={{ border: `2px dashed ${t.bd}`, borderRadius: 10, padding: "28px 24px", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = t.amber}
            onMouseLeave={e => e.currentTarget.style.borderColor = t.bd}
          >
            <Icon name="image" size={26} color={t.tx4} style={{ margin: "0 auto 10px" }} />
            <div style={{ fontSize: 13, color: t.tx3, marginBottom: 4 }}>No architecture diagram uploaded yet</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.amber, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              <Icon name="attach" size={12} color={t.amber} />Upload image or PDF
            </div>
          </div>
        )}
      </div>

      {/* Video */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <Icon name="video" size={14} color={t.accent} /><SLabel t={t}>Demonstration video</SLabel>
        </div>
        {videos[uc.id] ? (
          <div>
            <video src={videos[uc.id].url} controls style={{ width: "100%", borderRadius: 8, border: `1px solid ${t.bd}` }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
              <span style={{ fontSize: 11, color: t.tx3 }}>{videos[uc.id].name}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={e => onUpload(e, uc.id)} style={{ fontSize: 11, color: t.tx2, background: "none", border: `1px solid ${t.bd}`, borderRadius: 6, padding: "4px 12px", display: "flex", alignItems: "center", gap: 4 }}><Icon name="upload" size={11} color={t.tx2} />Replace</button>
                <button onClick={e => onRemove(e, uc.id)} style={{ fontSize: 11, color: t.red, background: "none", border: `1px solid ${t.red}55`, borderRadius: 6, padding: "4px 12px", display: "flex", alignItems: "center", gap: 4 }}><Icon name="trash" size={11} color={t.red} />Remove</button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={e => onUpload(e, uc.id)}
            style={{ border: `2px dashed ${t.bd}`, borderRadius: 10, padding: "30px 24px", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = t.bd}
          >
            <Icon name="play" size={28} color={t.tx4} style={{ margin: "0 auto 10px" }} />
            <div style={{ fontSize: 13, color: t.tx3, marginBottom: 4 }}>No video uploaded yet</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              <Icon name="upload" size={12} color={t.accent} />Click to upload
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CLIENT SPEAKS PAGE ────────────────────────────────────────────────────
function ClientSpeaksPage({ t }) {
  const quotes = [
    {
      name: "Andrew Horton", title: "Group CEO, QBE", initials: "AH",
      context: "Mar 2024 — speaking about the Cyber GenAI Underwriting solution built by Accenture, after the FY23 earnings report in an interview with the Insurance Business publication.",
      highlight: "Cyber GenAI Underwriting solution",
      quote: "\u201C65% improvement speed-wise, with the process spanning from the initial submission to getting the quote out\u2026. It\u2019s a really good position to be in, and then it\u2019s scalable\u2026. We\u2019re really excited about it.\u201D",
      pillar: "speed", tag: "Cyber UW assistant",
    },
  ];

  return (
    <div style={{ padding: "28px 0 60px" }} className="fade">
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
        <Icon name="chat" size={17} color={t.accent} />
        <span style={{ fontSize: 11, fontWeight: 600, color: t.accent, letterSpacing: "0.12em", textTransform: "uppercase" }}>Client speaks</span>
      </div>
      <h2 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 }}>In their own words</h2>
      <p style={{ fontSize: 14, color: t.tx2, marginBottom: 36, maxWidth: 560, lineHeight: 1.6 }}>QBE leadership on the real-world impact of AI — unscripted and on the record.</p>

      {quotes.map((q, i) => {
        const pc = PC(t, q.pillar);
        return (
          <div key={i} style={{ marginBottom: 28 }}>
            <div className="card" style={{ padding: "clamp(24px,3vw,40px)", borderLeft: `4px solid ${pc.tx}`, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: -10, right: 24, fontSize: 160, color: pc.tx, opacity: 0.04, fontFamily: "Georgia,serif", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>"</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: 12, background: pc.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: pc.tx, flexShrink: 0, border: `1px solid ${pc.bd}` }}>
                  {q.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{q.name}</div>
                  <div style={{ fontSize: 13, color: t.tx2, marginBottom: 8 }}>{q.title}</div>
                  <span style={{ background: pc.bg, color: pc.tx, fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Icon name="speed" size={10} color={pc.tx} />{q.tag}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: t.tx3, fontStyle: "italic", lineHeight: 1.65, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${t.bd}` }}>
                {q.context.split(q.highlight).map((part, pi, arr) => (
                  <span key={pi}>{part}{pi < arr.length - 1 && <strong style={{ color: t.tx1, fontStyle: "normal", fontWeight: 600 }}>{q.highlight}</strong>}</span>
                ))}
              </div>
              <blockquote style={{ margin: 0, fontSize: "clamp(17px,2.2vw,24px)", fontWeight: 700, lineHeight: 1.5, color: t.tx1, fontStyle: "italic", letterSpacing: "-0.01em" }}>{q.quote}</blockquote>
            </div>
          </div>
        );
      })}

      <div className="card" style={{ padding: "28px 24px", textAlign: "center", border: `1px dashed ${t.bd}` }}>
        <Icon name="add" size={22} color={t.tx4} style={{ margin: "0 auto 10px" }} />
        <div style={{ fontSize: 13, fontWeight: 600, color: t.tx3, marginBottom: 4 }}>More client testimonials coming soon</div>
        <div style={{ fontSize: 12, color: t.tx4 }}>Additional QBE leadership quotes will appear here as the programme scales.</div>
      </div>
    </div>
  );
}

// ── CHAT PANEL ────────────────────────────────────────────────────────────
function ChatPanel({ t, ucs, onClose }) {
  const [msgs, setMsgs]     = useState([{ role: "assistant", text: "Hi — I have full context on all QBE AI use cases. Ask me how a solution works, which ones drive cost savings, what's on the roadmap, or anything else." }]);
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    const txt = input.trim();
    if (!txt || loading) return;
    setInput("");
    setLoading(true);
    const next = [...msgs, { role: "user", text: txt }];
    setMsgs(next);
    try {
      const ctx = ucs.map(u => `**${u.title}** (${u.dept}, ${u.status}, ${u.pillar} pillar): ${u.summary} Impact: ${u.impact || "n/a"}. Outcomes: ${(u.outcomes || []).join("; ")}.`).join("\n");
      const sys = `You are an AI assistant embedded in QBE's AI Command Centre. Help stakeholders understand QBE's AI portfolio.\n\nUse cases:\n${ctx}\n\nBe concise and specific.`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: sys,
          messages: next.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })),
        }),
      });
      const data = await res.json();
      setMsgs(p => [...p, { role: "assistant", text: data.content?.map(b => b.text || "").join("") || "Sorry, something went wrong." }]);
    } catch {
      setMsgs(p => [...p, { role: "assistant", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, width: 356, height: 480, background: t.bgCard, border: `1px solid ${t.bdStrong}`, borderRadius: 16, boxShadow: t.shadow, display: "flex", flexDirection: "column", zIndex: 50, overflow: "hidden" }}>
      <div style={{ padding: "13px 15px", borderBottom: `1px solid ${t.bd}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: t.bgMuted }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="chat" size={15} color={t.accent} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Ask AI</div>
            <div style={{ fontSize: 10, color: t.tx3 }}>Powered by Claude · full use case context</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none" }}><Icon name="close" size={14} color={t.tx3} /></button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 6px" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ marginBottom: 10, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "85%", background: m.role === "user" ? t.accent : t.bgMuted, color: m.role === "user" ? "#fff" : t.tx1, borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px", padding: "8px 12px", fontSize: 12.5, lineHeight: 1.6 }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
            <div style={{ background: t.bgMuted, borderRadius: "12px 12px 12px 3px", padding: "8px 12px", fontSize: 12.5, color: t.tx3 }}>Thinking…</div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "9px 11px", borderTop: `1px solid ${t.bd}`, display: "flex", gap: 7 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about any use case…"
          style={{ flex: 1, background: t.bgMuted, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "7px 11px", fontSize: 12, color: t.tx1, outline: "none" }}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 8, padding: "7px 13px", opacity: loading || !input.trim() ? 0.5 : 1, display: "flex", alignItems: "center" }}>
          <Icon name="send" size={13} color="#fff" />
        </button>
      </div>
    </div>
  );
}

// ── ADMIN MODAL ───────────────────────────────────────────────────────────
function AdminModal({ t, uc, ucs, onSave, onDelete, onClose, videos, archs, onUpload, onArchUpload, onRemoveVideo, onRemoveArch }) {
  const blank = { id: "uc_" + Date.now(), title: "", dept: "", domain: "business", pillars: ["speed"], status: "Live", impact: "", summary: "", outcomes: [], fromSteps: [], toSteps: [], fromTime: "", toTime: "", financial: [], operational: [], governance: [], impactBadges: [] };

  const [form, setForm] = useState(() => {
    if (!uc) return blank;
    return { ...uc, pillars: uc.pillars || (uc.pillar ? [uc.pillar] : ["speed"]) };
  });
  const [oT,  setOT]  = useState((uc?.outcomes    || []).join("\n"));
  const [fT,  setFT]  = useState((uc?.financial   || []).join("\n"));
  const [opT, setOpT] = useState((uc?.operational || []).join("\n"));
  const [gT,  setGT]  = useState((uc?.governance  || []).join("\n"));
  const [fsT, setFsT] = useState((uc?.fromSteps   || []).join("\n"));
  const [tsT, setTsT] = useState((uc?.toSteps     || []).map(s => (s.a ? "AGENT: " : "") + s.l).join("\n"));

  const s              = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const ln             = txt => txt.split("\n").map(l => l.trim()).filter(Boolean);
  const parseToSteps   = txt => ln(txt).map(line => { const a = line.toUpperCase().startsWith("AGENT:"); return { l: a ? line.slice(6).trim() : line, a }; });
  const togglePillar   = pid => setForm(p => {
    const cur  = p.pillars || [];
    const next = cur.includes(pid) ? cur.filter(x => x !== pid) : [...cur, pid];
    return { ...p, pillars: next.length ? next : cur };
  });

  const load = id => {
    const u = ucs.find(x => x.id === id);
    if (!u) return;
    setForm({ ...u, pillars: u.pillars || (u.pillar ? [u.pillar] : ["speed"]) });
    setOT((u.outcomes    || []).join("\n"));
    setFT((u.financial   || []).join("\n"));
    setOpT((u.operational || []).join("\n"));
    setGT((u.governance  || []).join("\n"));
    setFsT((u.fromSteps  || []).join("\n"));
    setTsT((u.toSteps    || []).map(s => (s.a ? "AGENT: " : "") + s.l).join("\n"));
  };

  const save = () => onSave({
    ...form,
    pillar:      form.pillars?.[0] || "speed",
    pillars:     form.pillars || ["speed"],
    outcomes:    ln(oT),
    financial:   ln(fT),
    operational: ln(opT),
    governance:  ln(gT),
    fromSteps:   ln(fsT),
    toSteps:     parseToSteps(tsT),
  });

  const inp      = { width: "100%", padding: "8px 11px", border: `1px solid ${t.bd}`, borderRadius: 8, fontSize: 13, background: t.bgMuted, color: t.tx1, outline: "none" };
  const lbl      = { display: "block", fontSize: 11, fontWeight: 600, color: t.tx3, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" };
  const hasVideo = !!(videos && videos[form.id]);
  const hasArch  = !!(archs  && archs[form.id]);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 32, overflowY: "auto" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="card fade" style={{ width: "100%", maxWidth: 560, margin: "0 16px 40px", padding: 26 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="edit" size={16} color={t.accent} />
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>{uc ? "Edit use case" : "Add / edit use case"}</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none" }}><Icon name="close" size={16} color={t.tx3} /></button>
        </div>

        {/* Select existing */}
        {!uc && (
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Select existing to edit</label>
            <select onChange={e => {
              if (e.target.value) { load(e.target.value); }
              else { setForm({ ...blank, id: "uc_" + Date.now() }); setOT(""); setFT(""); setOpT(""); setGT(""); setFsT(""); setTsT(""); }
            }} style={inp}>
              <option value="">— New use case —</option>
              {ucs.map(u => <option key={u.id} value={u.id}>{u.title}</option>)}
            </select>
          </div>
        )}

        <div style={{ marginBottom: 11 }}><label style={lbl}>Title</label><input value={form.title || ""} onChange={e => s("title", e.target.value)} style={inp} /></div>
        <div style={{ marginBottom: 11 }}><label style={lbl}>Department</label><input value={form.dept || ""} onChange={e => s("dept", e.target.value)} style={inp} /></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 11 }}>
          <div>
            <label style={lbl}>Domain</label>
            <select value={form.domain} onChange={e => s("domain", e.target.value)} style={inp}>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
            </select>
          </div>
          <div>
            <label style={lbl}>Status</label>
            <select value={form.status} onChange={e => s("status", e.target.value)} style={inp}>
              <option value="Live">Live</option>
              <option value="In development">In development</option>
              <option value="Roadmap">Roadmap</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 11 }}>
          <label style={lbl}>Value pillars (select all that apply)</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 2 }}>
            {PILLARS.map(p => {
              const c  = PC(t, p.id);
              const on = (form.pillars || []).includes(p.id);
              return (
                <button key={p.id} onClick={() => togglePillar(p.id)} style={{ background: on ? c.bg : "transparent", border: `1px solid ${on ? c.tx : t.bd}`, borderRadius: 20, padding: "5px 14px", fontSize: 12, color: on ? c.tx : t.tx2, fontWeight: on ? 600 : 400, display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s" }}>
                  <Icon name={p.iconName} size={11} color={on ? c.tx : t.tx3} />{p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: 11 }}><label style={lbl}>Impact label</label><input value={form.impact || ""} onChange={e => s("impact", e.target.value)} style={inp} placeholder="e.g. 65% faster · 55% more bound" /></div>
        <div style={{ marginBottom: 11 }}><label style={lbl}>Summary</label><textarea value={form.summary || ""} onChange={e => s("summary", e.target.value)} rows={3} style={{ ...inp, resize: "vertical", lineHeight: 1.5 }} /></div>
        <div style={{ marginBottom: 11 }}><label style={lbl}>Outcomes (one per line)</label><textarea value={oT} onChange={e => setOT(e.target.value)} rows={3} style={{ ...inp, resize: "vertical", lineHeight: 1.5 }} /></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 11 }}>
          <div><label style={lbl}>Time before</label><input value={form.fromTime || ""} onChange={e => s("fromTime", e.target.value)} style={inp} placeholder="e.g. 3–5 days" /></div>
          <div><label style={lbl}>Time after</label><input value={form.toTime || ""}   onChange={e => s("toTime",   e.target.value)} style={inp} placeholder="e.g. < 1 hr" /></div>
        </div>

        <div style={{ marginBottom: 11 }}><label style={lbl}>Before steps (one per line)</label><textarea value={fsT} onChange={e => setFsT(e.target.value)} rows={3} placeholder={"Manual review\nData entry\nJudgment applied"} style={{ ...inp, resize: "vertical", lineHeight: 1.5 }} /></div>
        <div style={{ marginBottom: 11 }}><label style={lbl}>After steps — prefix "AGENT: " for AI steps</label><textarea value={tsT} onChange={e => setTsT(e.target.value)} rows={4} placeholder={"Submission received\nAGENT: AI extracts data\nAGENT: Risk scored\nReview and issue"} style={{ ...inp, resize: "vertical", lineHeight: 1.5 }} /></div>
        <div style={{ marginBottom: 11 }}><label style={lbl}>Financial outcomes</label><textarea value={fT}  onChange={e => setFT(e.target.value)}  rows={2} style={{ ...inp, resize: "vertical" }} /></div>
        <div style={{ marginBottom: 11 }}><label style={lbl}>Operational outcomes</label><textarea value={opT} onChange={e => setOpT(e.target.value)} rows={2} style={{ ...inp, resize: "vertical" }} /></div>
        <div style={{ marginBottom: 14 }}><label style={lbl}>Governance outcomes</label><textarea value={gT}  onChange={e => setGT(e.target.value)}  rows={2} style={{ ...inp, resize: "vertical" }} /></div>

        {/* Architecture upload */}
        <div style={{ marginBottom: 12 }}>
          <label style={lbl}>Solution architecture</label>
          {hasArch ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: t.amberBg, border: `1px solid ${t.amberBd}`, borderRadius: 8, padding: "9px 12px" }}>
              <Icon name="image" size={14} color={t.amber} />
              <span style={{ fontSize: 12, color: t.tx1, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{archs[form.id]?.name}</span>
              <button onClick={e => onArchUpload(e, form.id)} style={{ fontSize: 11, color: t.tx2, background: "none", border: `1px solid ${t.bd}`, borderRadius: 6, padding: "3px 10px", flexShrink: 0 }}>Replace</button>
              <button onClick={e => onRemoveArch(e, form.id)} style={{ fontSize: 11, color: t.red, background: "none", border: `1px solid ${t.red}44`, borderRadius: 6, padding: "3px 10px", flexShrink: 0 }}>Remove</button>
            </div>
          ) : (
            <div
              onClick={e => onArchUpload(e, form.id)}
              style={{ border: `2px dashed ${t.bd}`, borderRadius: 8, padding: "14px 16px", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              onMouseEnter={e => e.currentTarget.style.borderColor = t.amber}
              onMouseLeave={e => e.currentTarget.style.borderColor = t.bd}
            >
              <Icon name="attach" size={14} color={t.amber} />
              <span style={{ fontSize: 12, color: t.amber, fontWeight: 600 }}>Upload image or PDF</span>
            </div>
          )}
        </div>

        {/* Video upload */}
        <div style={{ marginBottom: 18 }}>
          <label style={lbl}>Demonstration video</label>
          {hasVideo ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: t.accentBg, border: `1px solid ${t.accentBd}`, borderRadius: 8, padding: "9px 12px" }}>
              <Icon name="video" size={14} color={t.accent} />
              <span style={{ fontSize: 12, color: t.tx1, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{videos[form.id]?.name}</span>
              <button onClick={e => onUpload(e, form.id)}     style={{ fontSize: 11, color: t.tx2, background: "none", border: `1px solid ${t.bd}`,       borderRadius: 6, padding: "3px 10px", flexShrink: 0 }}>Replace</button>
              <button onClick={e => onRemoveVideo(e, form.id)} style={{ fontSize: 11, color: t.red, background: "none", border: `1px solid ${t.red}44`,     borderRadius: 6, padding: "3px 10px", flexShrink: 0 }}>Remove</button>
            </div>
          ) : (
            <div
              onClick={e => onUpload(e, form.id)}
              style={{ border: `2px dashed ${t.bd}`, borderRadius: 8, padding: "14px 16px", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = t.bd}
            >
              <Icon name="video" size={14} color={t.accent} />
              <span style={{ fontSize: 12, color: t.accent, fontWeight: 600 }}>Upload video</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={save} style={{ flex: 1, background: t.accent, color: "#fff", border: "none", borderRadius: 10, padding: "10px 0", fontSize: 14, fontWeight: 600 }}>Save</button>
          {uc && <button onClick={() => onDelete(form.id)} style={{ background: "none", border: `1px solid ${t.red}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: t.red, display: "flex", alignItems: "center", gap: 5 }}><Icon name="trash" size={13} color={t.red} />Delete</button>}
          <button onClick={onClose} style={{ background: "none", border: `1px solid ${t.bd}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: t.tx2 }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <div style={{ borderTop: `1px solid ${t.bd}`, padding: "13px clamp(16px,3vw,40px)", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
      <span style={{ fontSize: 11, color: t.tx3 }}>QBE AI Command Centre V3.1</span>
      <span style={{ fontSize: 11, color: t.tx3 }}>Built by Accenture</span>
    </div>
  );
}
