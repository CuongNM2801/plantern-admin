import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

const months = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString("en-US", { month: "long" }),
);

export default function RevenueChart() {
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" }),
  );
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Revenue Details</h3>

        <div className="relative w-40">
          <button
            onClick={() => setOpen(!open)}
            className="w-full text-sm border rounded-md px-3 py-1 bg-white flex justify-between items-center">
            {month}
          </button>

          {open && (
            <div className="absolute z-50 mt-0.5 w-full bg-white border rounded-md shadow-md max-h-24 overflow-y-auto">
              {months.map((m) => (
                <div
                  key={m}
                  onClick={() => {
                    setMonth(m);
                    setOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
