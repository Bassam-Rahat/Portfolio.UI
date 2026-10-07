import type { Capability, NavItem, Profile, SkillGroup } from "@/types/domain";

/**
 * The public address, used for canonical URLs, the sitemap, JSON-LD and Open
 * Graph images. NEXT_PUBLIC_SITE_URL wins when set; on Vercel the project's
 * production domain is used automatically; locally it is localhost.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const profile: Profile = {
  name: "Bassam Rahat",
  role: "Senior Software Engineer",
  location: "Lahore, Pakistan",
  email: "rahatbassaam9988@gmail.com",
  phone: "+92 323 4839988",
  // Non-breaking spaces keep "run on —" together when the line wraps.
  headline: "I build the software businesses run on — and the AI that works inside it.",
  headlineEmphasis: "and the AI that works inside it.",
  intro:
    "Senior software engineer in Lahore. For over five years I have designed and shipped multi-tenant SaaS platforms in .NET, Angular and Next.js, and lately the Claude-powered features that do real work inside them.",
  about: [
    "I started as an intern on a four-person team building a school management system, and have worked in product teams ever since: help desks, document platforms, B2B commerce, subscription billing, property monitoring.",
    "Most of my work sits where a business depends on it daily. That has shaped how I build: tenant data that can never leak, background jobs that retry safely, email that threads correctly, payments that reconcile.",
    "Over the last year I have put large language models into production. I keep them on a short leash: prompts carry only the data a task needs, outputs are constrained or reviewed by a person, and nothing the model writes is sent without someone seeing it.",
    "At Devsinc I led a backend team of about fifteen developers and ran the requirement sessions with stakeholders that turned business needs into plans a team could build.",
  ],
  education: {
    degree: "BS Computer Engineering",
    school: "COMSATS University Islamabad, Lahore Campus",
    period: "2015 – 2020",
  },
  languages: ["English (fluent)", "Urdu (native)"],
  links: {
    linkedin: "https://www.linkedin.com/in/bassam-rahat-060932177",
    github: "https://github.com/Bassam-Rahat",
    stackoverflow: "https://stackoverflow.com/users/22238420/bassam",
  },
  resumePath: "/bassam-rahat-resume.pdf",
  siteUrl: resolveSiteUrl(),
  ledger: [
    { value: "~10,000", label: "support tickets a month, across 3 organisations", proof: "supportdesk" },
    { value: "10,000+", label: "properties monitored for 50 tenants", proof: "teranet-undertakings" },
    { value: "~15", label: "developers led on a federal agency programme", proof: "americorps" },
    { value: "20.5s → 1.1s", label: "webhook response after moving uploads to a background job", proof: "supportdesk" },
  ],
  updated: "October 2026",
};

export const capabilities: Capability[] = [
  {
    title: "Backend and data",
    icon: "backend",
    promise: "Multi-tenant .NET systems that stay correct under load.",
    points: ["Clean Architecture and CQRS", "Tenants kept apart at the data layer", "Background jobs, queues and idempotency"],
    tools: ["C#", ".NET 10", "ASP.NET Core", "EF Core", "Dapper", "SQL Server", "PostgreSQL", "Hangfire"],
    proof: ["supportdesk", "teranet-undertakings", "my-race-setup"],
  },
  {
    title: "Frontend",
    icon: "frontend",
    promise: "Angular at heart; Next.js and React on newer products.",
    points: ["RxJS, lazy loading and custom directives", "One codebase for web, Android and iOS", "Server components, httpOnly sessions"],
    tools: ["Angular", "RxJS", "Angular Material", "Ionic", "Capacitor", "Next.js", "React", "TanStack Query"],
    proof: ["kea-international", "americorps", "supportdesk"],
  },
  {
    title: "AI in production",
    icon: "ai",
    highlight: true,
    promise: "Claude features that do real work, with people in control.",
    points: ["Classification, drafting, web research", "MCP servers and agent integration APIs", "Lean prompts, constrained output"],
    tools: ["Anthropic Claude API", "Claude Haiku 4.5", "MCP SDK", "Web search", "Zod"],
    proof: ["supportdesk", "my-race-setup", "mcp-server"],
  },
];

export const navigation: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export const skillGroups: SkillGroup[] = [
  { name: "Languages", items: ["C#", "TypeScript", "JavaScript", "SQL"] },
  {
    name: "AI & LLM",
    items: [
      "Anthropic Claude API",
      "Prompt engineering",
      "Tool calling",
      "Web search grounding",
      "Model Context Protocol",
      "AI agent integrations",
      "Claude Code",
    ],
  },
  {
    name: "Backend",
    items: [
      "ASP.NET Core",
      ".NET 8 – 10",
      ".NET Framework 4.8",
      "ASP.NET MVC",
      "Web Forms",
      "Entity Framework Core",
      "Dapper",
      "SignalR",
      "MediatR",
    ],
  },
  {
    name: "Frontend",
    items: ["Angular", "RxJS", "Angular Material", "Next.js", "React", "TanStack Query", "Ionic", "Capacitor"],
  },
  {
    name: "Architecture",
    items: ["Clean Architecture", "CQRS", "Microservices", "Event-driven", "Multi-tenant SaaS", "Webhooks"],
  },
  { name: "Data", items: ["SQL Server", "PostgreSQL", "Redis", "RabbitMQ", "Hangfire"] },
  {
    name: "Delivery",
    items: ["Azure", "Azure DevOps", "Docker", "IIS", "Vercel", "Render", "Cloudflare R2"],
  },
  {
    name: "Integrations",
    items: ["Stripe", "Moneris", "SAP", "Postmark", "MailKit", "Sentry", "Serilog"],
  },
];
