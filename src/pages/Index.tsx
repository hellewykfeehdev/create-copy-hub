import { Shield, AlertTriangle, Camera, Clock } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { ScanProgress } from "@/components/dashboard/ScanProgress";
import { VulnerabilityTable } from "@/components/dashboard/VulnerabilityTable";
import { SnapshotList } from "@/components/dashboard/SnapshotCard";
import { SeverityChart } from "@/components/dashboard/SeverityChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pl-60 pt-6 transition-all duration-300">
        <div className="px-6 pb-8 max-w-[1600px]">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Security Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor your security posture and manage vulnerabilities
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Vulnerabilities"
              value={42}
              icon={AlertTriangle}
              trend={{ value: 12, isPositive: true }}
              variant="destructive"
            />
            <StatCard
              title="Active Scans"
              value={3}
              icon={Shield}
              variant="info"
            />
            <StatCard
              title="Snapshots"
              value={24}
              icon={Camera}
              variant="default"
            />
            <StatCard
              title="Last Scan"
              value="2h ago"
              icon={Clock}
              variant="success"
            />
          </div>

          {/* Scan Progress */}
          <div className="mb-8">
            <ScanProgress />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vulnerability Table - Takes 2 columns */}
            <div className="lg:col-span-2">
              <VulnerabilityTable />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <SeverityChart />
              <SnapshotList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
