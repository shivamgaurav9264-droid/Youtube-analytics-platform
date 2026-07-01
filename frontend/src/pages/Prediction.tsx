import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Prediction() {
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const predictViews = async () => {
    setLoading(true);

    try {
      const res = await api.post("/predict", {
        likes: Number(likes),
        comment_count: Number(comments),
      });

      setPrediction(res.data.predicted_views);
    } catch (err) {
      alert("Prediction Failed");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 ml-64">

        <Navbar />

        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">

          <h1 className="text-4xl font-bold mb-2">
            YouTube Views Prediction
          </h1>

          <p className="text-gray-500 mb-8">
            Predict future video views using Machine Learning.
          </p>

          <div className="mb-6">
            <label className="font-semibold block mb-2">
              Likes
            </label>

            <input
              type="number"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Likes"
            />
          </div>

          <div className="mb-6">
            <label className="font-semibold block mb-2">
              Comments
            </label>

            <input
              type="number"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Comments"
            />
          </div>

          <button
            onClick={predictViews}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold"
          >
            {loading ? "Predicting..." : "Predict Views"}
          </button>

          {prediction !== null && (
            <div className="mt-8 bg-red-50 p-6 rounded-xl border border-red-200">

              <h2 className="text-2xl font-bold">
                Predicted Views
              </h2>

              <p className="text-4xl font-bold text-red-600 mt-3">
                {prediction.toLocaleString()}
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Prediction;