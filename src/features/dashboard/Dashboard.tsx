import { Box, Clock, TrendingUp, Users } from "lucide-react";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import DealsTable from "./components/DealsTable";

export default function Dashboard() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total User"
          value={40689}
          change="8.5% Up from yesterday"
          icon={<Users />}
        />
        <StatCard
          title="Total Premium Upgrade"
          value={10293}
          change="1.3% Up from past week"
          icon={<Box />}
        />
        <StatCard
          title="Total Tree Sales"
          value={89000}
          prefix="$"
          change="4.3% Down from yesterday"
          isPositive={false}
          icon={<TrendingUp />}
        />
        <StatCard
          title="Total New User"
          value={2040}
          change="1.8% Up from yesterday"
          icon={<Clock />}
        />
      </div>

      <RevenueChart />
      <DealsTable />
    </div>
  );
}
