import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Critical", value: 2, color: "hsl(0, 72%, 51%)" },
  { name: "High", value: 5, color: "hsl(25, 95%, 53%)" },
  { name: "Medium", value: 12, color: "hsl(45, 93%, 47%)" },
  { name: "Low", value: 8, color: "hsl(142, 71%, 45%)" },
  { name: "Info", value: 15, color: "hsl(217, 91%, 60%)" },
];

export function SeverityChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="glass-card rounded-lg p-5 animate-fade-in-up">
      <h3 className="text-lg font-semibold mb-4">Severity Distribution</h3>
      
      <div className="flex items-center gap-6">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(222, 47%, 8%)", 
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(210, 40%, 98%)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.value}</span>
                <span className="text-muted-foreground text-xs">
                  ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
