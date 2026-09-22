"use client";

import React from "react";
import Link from "next/link";
import { Badge, Pill, Button } from "@/design-system";
import { Icon } from "@/design-system/icons";

type DemoStatus = "In Progress" | "Review Ready" | "Complete";

interface DemoEntry {
  id: string;
  title: string;
  description: string;
  creator: string;
  createdAt: string;
  href: string;
  tags: string[];
  status: DemoStatus;
}

const DEMO_REGISTRY: DemoEntry[] = [
  {
    id: "aws-firewall-traffic",
    title: "AWS Firewall: Traffic",
    description:
      "Captured At filter feature — surfaces log-source attribution for VPC and Firewall flows with mixed-status detection for the AWS Firewall GA workstream.",
    creator: "Aziz Khilawala",
    createdAt: "Apr 13, 2026",
    href: "/demos/aws-firewall-traffic",
    tags: ["AWS", "Firewall", "Traffic", "Filters"],
    status: "In Progress",
  },
  {
    id: "vens-exploration",
    title: "VENs Exploration",
    description:
      "VEN management page with status filtering, enforcement mode display, health indicators, bulk actions, and detailed slideout panel for workload-level visibility.",
    creator: "Aziz Khilawala",
    createdAt: "Apr 14, 2026",
    href: "/demos/vens-exploration",
    tags: ["VEN", "Workloads", "Agents", "Enforcement"],
    status: "In Progress",
  },
  {
    id: "ai-labeling",
    title: "AI Labeling",
    description:
      "AI-powered label recommendations for cloud resources with approve/ignore/edit workflows, bulk actions, evidence explanations, and group-by visualization.",
    creator: "Aziz Khilawala",
    createdAt: "Apr 14, 2026",
    href: "/demos/ai-labeling",
    tags: ["AI", "Labels", "Cloud", "Recommendations"],
    status: "In Progress",
  },
  {
    id: "azure-onboarding",
    title: "Azure Cloud Onboarding",
    description:
      "End-to-end Azure onboarding wizard with Easy/Advanced paths, simulated OAuth login, admin consent workflow, non-admin approval flow, and resume capabilities.",
    creator: "Aziz Khilawala",
    createdAt: "May 7, 2026",
    href: "/demos/azure-onboarding",
    tags: ["Azure", "Onboarding", "Wizard", "OAuth"],
    status: "In Progress",
  },
  {
    id: "label-cloud",
    title: "Label Cloud Resources",
    description:
      "Redesigned Edit Labels experience for cloud resources with flat checklist, type-specific icons, inline warnings, change summary, bulk editing with conflict resolution, and inline label creation.",
    creator: "Aziz Khilawala",
    createdAt: "Jun 10, 2026",
    href: "/demos/label-cloud",
    tags: ["Cloud", "Labels", "Inventory", "Modal"],
    status: "In Progress",
  },
  {
    id: "agentless-k8s",
    title: "Agentless K8s Segmentation",
    description:
      "End-to-end agentless Kubernetes segmentation demo covering cluster management, K8s-to-Illumio label mapping, unified inventory, map visualization, and full policy lifecycle with posture tracking.",
    creator: "Aziz Khilawala",
    createdAt: "Jul 1, 2026",
    href: "/demos/agentless-k8s",
    tags: ["Kubernetes", "K8s", "Agentless", "Policy", "Labels"],
    status: "In Progress",
  },
  {
    id: "container-segmentation",
    title: "Container Segmentation",
    description:
      "Policy authoring workspace for container segmentation — rule writing, impact analysis, YAML preview, and lifecycle management for K8s and hybrid environments.",
    creator: "Aziz Khilawala",
    createdAt: "Jul 6, 2026",
    href: "/demos/container-segmentation",
    tags: ["Kubernetes", "K8s", "Policy", "Segmentation", "Hybrid"],
    status: "In Progress",
  },
];

const STATUS_BADGE_VARIANT: Record<DemoStatus, "draft" | "info" | "new"> = {
  "In Progress": "draft",
  "Review Ready": "info",
  "Complete": "new",
};

function CreatorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "var(--lightning-blue-500, #3a88fc)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 700,
        flexShrink: 0,
        fontFamily: "'Geist', sans-serif",
      }}
    >
      {initials}
    </div>
  );
}

function DemoCard({ demo }: { demo: DemoEntry }) {
  return (
    <div
      style={{
        border: "1px solid var(--border-card, #e6e8eb)",
        borderRadius: 8,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Card body */}
      <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Title + status badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="firewall" size={20} color="var(--lightning-blue-500, #3a88fc)" />
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--lightning-gray-900, #1d2024)",
                fontFamily: "'Geist', sans-serif",
              }}
            >
              {demo.title}
            </span>
          </div>
          <Badge variant={STATUS_BADGE_VARIANT[demo.status]}>
            {demo.status}
          </Badge>
        </div>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: "var(--lightning-bluegray-700, #435466)",
            lineHeight: 1.5,
            fontFamily: "'Geist', sans-serif",
          }}
        >
          {demo.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {demo.tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
      </div>

      {/* Card footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--border-divider, #e6e8eb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Creator info */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <CreatorAvatar name={demo.creator} />
          <div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--lightning-gray-900, #1d2024)",
                fontFamily: "'Geist', sans-serif",
              }}
            >
              {demo.creator}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--lightning-bluegray-500, #7a90a4)",
                marginLeft: 6,
                fontFamily: "'Geist', sans-serif",
              }}
            >
              {demo.createdAt}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link href={demo.href} style={{ textDecoration: "none" }}>
          <Button variant="primary-ghost" size="sm">
            View Demo
            <Icon name="arrow-right" size={14} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function DemosPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-app, #f3f4f6)",
        padding: "40px 48px",
        fontFamily: "'Geist', sans-serif",
      }}
    >
      {/* Back nav */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 13,
          color: "var(--lightning-blue-600, #2366ed)",
          textDecoration: "none",
          marginBottom: 32,
        }}
      >
        <Icon name="arrow-left" size={14} />
        Design System
      </Link>

      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            margin: "0 0 6px",
            fontSize: 28,
            fontWeight: 700,
            color: "var(--lightning-gray-900, #1d2024)",
            fontFamily: "'Geist', sans-serif",
          }}
        >
          Demos &amp; Prototypes
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "var(--lightning-bluegray-600, #63788f)",
            fontFamily: "'Geist', sans-serif",
          }}
        >
          Browse UI explorations and design prototypes from the team. Click a
          card to open the interactive demo.
        </p>
      </div>

      {/* Card grid */}
      {DEMO_REGISTRY.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
            alignItems: "start",
          }}
        >
          {DEMO_REGISTRY.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            color: "var(--lightning-bluegray-500, #7a90a4)",
            fontSize: 14,
          }}
        >
          <Icon name="circle-information" size={32} color="var(--lightning-bluegray-300)" />
          <p style={{ marginTop: 12 }}>No demos yet. Add entries to DEMO_REGISTRY to get started.</p>
        </div>
      )}
    </div>
  );
}
