import { Shield, Loader2, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ScanStatus {
  isScanning: boolean;
  progress: number;
  currentTarget: string;
  findings: number;
}

export function ScanProgress() {
  const [status, setStatus] = useState<ScanStatus>({
    isScanning: false,
    progress: 0,
    currentTarget: "",
    findings: 0,
  });

  const startScan = () => {
    setStatus({ isScanning: true, progress: 0, currentTarget: "Initializing...", findings: 0 });
  };

  useEffect(() => {
    if (!status.isScanning) return;

    const targets = [
      "Scanning authentication modules...",
      "Analyzing API endpoints...",
      "Checking database connections...",
      "Reviewing file permissions...",
      "Validating encryption protocols...",
      "Completing scan...",
    ];

    const interval = setInterval(() => {
      setStatus((prev) => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return { ...prev, isScanning: false, currentTarget: "Scan complete" };
        }
        
        const newProgress = Math.min(prev.progress + 2, 100);
        const targetIndex = Math.floor((newProgress / 100) * targets.length);
        const newFindings = Math.floor(Math.random() * 2) === 0 ? prev.findings : prev.findings + 1;
        
        return {
          ...prev,
          progress: newProgress,
          currentTarget: targets[Math.min(targetIndex, targets.length - 1)],
          findings: newFindings,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [status.isScanning]);

  return (
    <div className="glass-card rounded-lg p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Security Scanner</h3>
            <p className="text-sm text-muted-foreground">Run comprehensive security analysis</p>
          </div>
        </div>
        <Button 
          onClick={startScan} 
          disabled={status.isScanning}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          {status.isScanning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            "Start Scan"
          )}
        </Button>
      </div>

      {(status.isScanning || status.progress > 0) && (
        <div className="space-y-4">
          <div className="relative">
            <Progress value={status.progress} className="h-2 bg-muted" />
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="scan-line h-full w-1/3" />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              {status.progress < 100 ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3 h-3 text-success" />
              )}
              {status.currentTarget}
            </span>
            <span className="font-mono text-primary">{status.progress}%</span>
          </div>

          {status.findings > 0 && (
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-sm text-warning font-medium">
                {status.findings} potential {status.findings === 1 ? 'issue' : 'issues'} found during scan
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
