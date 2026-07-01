import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import api from "../services/api";

import {
  FaEye,
  FaThumbsUp,
  FaComments,
  FaVideo,
} from "react-icons/fa";

type DashboardData = {
  total_views: number;
  total_likes: number;
  total_comments: number;
  total_videos: number;
};

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="max-w-7xl mx-auto p-8">

          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-3xl shadow-xl p-10 text-white">
            <h1 className="text-5xl font-bold">
              📺 YouTube Analytics Dashboard
            </h1>

            <p className="mt-4 text-lg text-red-100 max-w-3xl">
              Monitor your YouTube channel performance, analyze trends,
              explore analytics, and predict future video views using
              Machine Learning.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            <StatCard
              title="Total Views"
              value={data.total_views.toLocaleString()}
              icon={<FaEye size={32} />}
            />

            <StatCard
              title="Total Likes"
              value={data.total_likes.toLocaleString()}
              icon={<FaThumbsUp size={32} />}
            />

            <StatCard
              title="Comments"
              value={data.total_comments.toLocaleString()}
              icon={<FaComments size={32} />}
            />

            <StatCard
              title="Videos"
              value={data.total_videos.toLocaleString()}
              icon={<FaVideo size={32} />}
            />

          </div>

          {/* Chart */}
          <div className="mt-10">
            <ChartCard />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;