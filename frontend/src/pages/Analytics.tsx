import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type AnalyticsData = {
  top_channels: {
    labels: string[];
    values: number[];
  };
  top_videos: {
    labels: string[];
    values: number[];
  };
};

function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    api
      .get("/analytics")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold">
        Loading Analytics...
      </div>
    );
  }

  const channelData = data.top_channels.labels.map((label, index) => ({
    name: label,
    views: data.top_channels.values[index],
  }));

  const videoData = data.top_videos.labels.map((label, index) => ({
    name: label.length > 25 ? label.substring(0, 25) + "..." : label,
    views: data.top_videos.values[index],
  }));

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="max-w-7xl mx-auto p-8">

          {/* Hero */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-8 text-white mb-8">
            <h1 className="text-4xl font-bold">
              📊 Analytics Dashboard
            </h1>

            <p className="mt-3 text-blue-100">
              Explore your most viewed channels and top-performing videos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Top Channels */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">
                🏆 Top Channels
              </h2>

              <ResponsiveContainer width="100%" height={420}>
                <BarChart
                  data={channelData}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 80, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    type="number"
                    tickFormatter={(value) =>
                      Number(value) >= 1000000
                        ? `${(Number(value) / 1000000).toFixed(1)}M`
                        : `${(Number(value) / 1000).toFixed(0)}K`
                    }
                  />

                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                  />

                  <Tooltip
                    formatter={(value) => [
                      Number(value).toLocaleString(),
                      "Views",
                    ]}
                  />

                  <Bar
                    dataKey="views"
                    fill="#2563eb"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Videos */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">
                🎬 Top Videos
              </h2>

              <ResponsiveContainer width="100%" height={420}>
                <BarChart
                  data={videoData}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 80, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    type="number"
                    tickFormatter={(value) =>
                      Number(value) >= 1000000
                        ? `${(Number(value) / 1000000).toFixed(1)}M`
                        : `${(Number(value) / 1000).toFixed(0)}K`
                    }
                  />

                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                  />

                  <Tooltip
                    formatter={(value) => [
                      Number(value).toLocaleString(),
                      "Views",
                    ]}
                  />

                  <Bar
                    dataKey="views"
                    fill="#dc2626"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Analytics;