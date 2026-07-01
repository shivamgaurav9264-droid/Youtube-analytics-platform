import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type MonthlyData = {
  month: string;
  views: number;
};

function ChartCard() {
  const [data, setData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    api
      .get("/monthly_views")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Monthly Views
      </h2>

      <ResponsiveContainer width="100%" height={380}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />

          <XAxis dataKey="month" />

          <YAxis
            tickFormatter={(value) =>
              Number(value) >= 1000000
                ? `${(Number(value) / 1000000).toFixed(1)}M`
                : `${(Number(value) / 1000).toFixed(0)}K`
            }
          />

          <Tooltip
            formatter={(value) => [
              Number(value).toLocaleString(),
              "Views",
            ]}
          />

          <Line
            type="monotone"
            dataKey="views"
            stroke="#dc2626"
            strokeWidth={4}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ChartCard;