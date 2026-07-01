import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

import { FaEye, FaThumbsUp, FaComments } from "react-icons/fa";

type InsightsData = {
  average_views: number;
  average_likes: number;
  average_comments: number;
  correlation: {
    views: {
      likes: number;
      comment_count: number;
    };
  };
};

function Insights() {
  const [data, setData] = useState<InsightsData | null>(null);

  useEffect(() => {
    api
      .get("/insights")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl">
        Loading Insights...
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-64">

        <Navbar />

        <div className="max-w-7xl mx-auto p-8">

          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl shadow-xl p-8 text-white mb-8">

            <h1 className="text-4xl font-bold">
              📈 Dataset Insights
            </h1>

            <p className="mt-3 text-green-100">
              Average statistics and feature relationships in the YouTube dataset.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <FaEye className="text-red-600 text-5xl mx-auto mb-4" />
              <h2 className="text-gray-500">Average Views</h2>
              <p className="text-3xl font-bold mt-2">
                {data.average_views.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <FaThumbsUp className="text-blue-600 text-5xl mx-auto mb-4" />
              <h2 className="text-gray-500">Average Likes</h2>
              <p className="text-3xl font-bold mt-2">
                {data.average_likes.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <FaComments className="text-green-600 text-5xl mx-auto mb-4" />
              <h2 className="text-gray-500">Average Comments</h2>
              <p className="text-3xl font-bold mt-2">
                {data.average_comments.toLocaleString()}
              </p>
            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Correlation Analysis
            </h2>

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-gray-100">

                  <th className="border p-3 text-left">
                    Metric
                  </th>

                  <th className="border p-3">
                    Correlation
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td className="border p-3">
                    Views ↔ Likes
                  </td>

                  <td className="border p-3 text-center font-bold text-blue-600">
                    {data.correlation.views.likes}
                  </td>

                </tr>

                <tr>

                  <td className="border p-3">
                    Views ↔ Comments
                  </td>

                  <td className="border p-3 text-center font-bold text-green-600">
                    {data.correlation.views.comment_count}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Insights;