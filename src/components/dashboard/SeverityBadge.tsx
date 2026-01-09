import { cn } from "@/lib/utils";

type Severity = "critical" | "high" | "medium" | "low" | "info";

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const severityConfig: Record<Severity, { label: string; className: string }> = {
  critical: {
    label: "Critical",
    className: "bg-severity-critical/20 text-severity-critical border-severity-critical/30",
  },
  high: {
    label: "High",
    className: "bg-severity-high/20 text-severity-high border-severity-high/30",
  },
  medium: {
    label: "Medium",
    className: "bg-severity-medium/20 text-severity-medium border-severity-medium/30",
  },
  low: {
    label: "Low",
    className: "bg-severity-low/20 text-severity-low border-severity-low/30",
  },
  info: {
    label: "Info",
    className: "bg-severity-info/20 text-severity-info border-severity-info/30",
  },
};

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const config = severityConfig[severity];
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}
