import { HardDrive, Clock, CheckCircle2, AlertCircle, Download, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Snapshot {
  id: string;
  name: string;
  timestamp: string;
  size: string;
  status: "healthy" | "warning" | "error";
  vulnerabilities: number;
}

const mockSnapshots: Snapshot[] = [
  {
    id: "snap-001",
    name: "Production Server",
    timestamp: "Today, 09:30 AM",
    size: "2.4 GB",
    status: "healthy",
    vulnerabilities: 0,
  },
  {
    id: "snap-002",
    name: "Staging Environment",
    timestamp: "Today, 08:15 AM",
    size: "1.8 GB",
    status: "warning",
    vulnerabilities: 3,
  },
  {
    id: "snap-003",
    name: "Development Server",
    timestamp: "Yesterday, 11:45 PM",
    size: "1.2 GB",
    status: "error",
    vulnerabilities: 12,
  },
  {
    id: "snap-004",
    name: "Database Backup",
    timestamp: "Yesterday, 06:00 PM",
    size: "856 MB",
    status: "healthy",
    vulnerabilities: 0,
  },
];

const statusConfig = {
  healthy: {
    icon: CheckCircle2,
    className: "text-success",
    label: "Secure",
  },
  warning: {
    icon: AlertCircle,
    className: "text-warning",
    label: "Issues Found",
  },
  error: {
    icon: AlertCircle,
    className: "text-destructive",
    label: "Critical",
  },
};

export function SnapshotCard({ snapshot }: { snapshot: Snapshot }) {
  const StatusIcon = statusConfig[snapshot.status].icon;
  
  return (
    <div className="glass-card rounded-lg p-4 hover:border-primary/30 transition-all duration-300 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-secondary">
            <HardDrive className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold">{snapshot.name}</h4>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3 h-3" />
              {snapshot.timestamp}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem className="cursor-pointer">
              <Download className="w-4 h-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Rescan</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">{snapshot.size}</span>
          <span className={cn("flex items-center gap-1", statusConfig[snapshot.status].className)}>
            <StatusIcon className="w-4 h-4" />
            {statusConfig[snapshot.status].label}
          </span>
        </div>
        {snapshot.vulnerabilities > 0 && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-destructive/10 text-destructive">
            {snapshot.vulnerabilities} issues
          </span>
        )}
      </div>
    </div>
  );
}

export function SnapshotList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Snapshots</h3>
          <p className="text-sm text-muted-foreground">Manage your security snapshots</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          New Snapshot
        </Button>
      </div>
      <div className="grid gap-3">
        {mockSnapshots.map((snapshot) => (
          <SnapshotCard key={snapshot.id} snapshot={snapshot} />
        ))}
      </div>
    </div>
  );
}
