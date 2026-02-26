import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Todo: Add real data next
const data = [
  { name: "5k", value: 20 },
  { name: "10k", value: 40 },
  { name: "15k", value: 35 },
  { name: "20k", value: 80 },
  { name: "25k", value: 45 },
  { name: "30k", value: 60 },
  { name: "35k", value: 30 },
  { name: "40k", value: 70 },
  { name: "45k", value: 55 },
  { name: "50k", value: 50 },
  { name: "55k", value: 45 },
  { name: "60k", value: 60 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Revenue Details</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BDFF66" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#BDFF66" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#84cc16"
              fill="url(#colorRevenue)"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
