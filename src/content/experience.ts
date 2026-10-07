import type { Position } from "@/types/domain";

export const positions: Position[] = [
  {
    id: "nuclieos",
    company: "Nuclieos",
    title: "Senior Software Engineer",
    location: "Lahore",
    start: "2025-09",
    end: null,
    summary:
      "Full-stack delivery of client SaaS and commerce platforms, from architecture to deployment, including the AI features inside them.",
    highlights: [
      "Built SupportDesk end to end: 3 organisations, about 10,000 tickets a month.",
      "Shipped the AI Crew Chief and Stripe billing for My Race Setup.",
      "Two-way SAP integration for Dasco's B2B store, about 50 orders a day.",
    ],
    projectSlugs: ["supportdesk", "my-race-setup", "dasco-online", "dasco-sales-portal"],
  },
  {
    id: "devsinc",
    company: "Devsinc",
    title: "Senior Software Engineer",
    location: "Lahore",
    start: "2025-03",
    end: "2025-08",
    summary: "Led a backend team of about fifteen developers delivering enterprise .NET and mobile applications for AmeriCorps.",
    highlights: [
      "Ran requirement sessions with stakeholders and turned them into specifications.",
      "Built Android and iOS apps from the Angular codebase with biometric login.",
    ],
    projectSlugs: ["americorps"],
  },
  {
    id: "insignia",
    company: "Insignia Business Solutions",
    title: "Software Engineer",
    location: "Lahore",
    start: "2023-01",
    end: "2025-03",
    summary: "Backend engineering on multi-tenant platforms, plus the Azure DevOps pipelines and IIS deployments that shipped them.",
    highlights: [
      "About 15 microservices monitoring 10,000+ properties for 50 tenants.",
      "Document platform serving 20 firms and about 100,000 documents.",
      "Moneris subscription payments for about 100 subscribers.",
    ],
    projectSlugs: ["teranet-undertakings", "dodocs", "doclientportal"],
  },
  {
    id: "tech-odds",
    company: "Tech Odds Global",
    title: "Software Engineer",
    location: "Lahore",
    start: "2021-01",
    end: "2023-01",
    summary: "Joined as an intern on a four-person team building a school management system, and stayed on as a software engineer.",
    highlights: ["ASP.NET Core APIs and Angular features, database design, and IdentityServer4 authentication."],
    projectSlugs: [],
  },
];
