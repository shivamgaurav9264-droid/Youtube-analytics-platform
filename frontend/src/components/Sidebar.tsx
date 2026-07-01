import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaBrain,
  FaLightbulb,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartBar /> },
    { name: "Prediction", path: "/prediction", icon: <FaBrain /> },
    { name: "Insights", path: "/insights", icon: <FaLightbulb /> },
  ];

  return (
    <div className="w-64 bg-red-600 text-white min-h-screen p-6 fixed">

      <h1 className="text-2xl font-bold mb-10">
        YouTube Analytics
      </h1>

      {menu.map((item) => (

        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 p-3 rounded-lg mb-3 transition ${
            location.pathname === item.path
              ? "bg-white text-red-600"
              : "hover:bg-red-500"
          }`}
        >
          {item.icon}
          {item.name}
        </Link>

      ))}

    </div>
  );
}

export default Sidebar;