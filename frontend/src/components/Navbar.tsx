import { FaYoutube } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <FaYoutube className="text-red-600 text-4xl" />
          <h1 className="text-2xl font-bold text-gray-800">
            YouTube Analytics
          </h1>
        </div>

        <ul className="flex items-center gap-8 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-red-600 transition">
            Dashboard
          </li>

          <li className="cursor-pointer hover:text-red-600 transition">
            Analytics
          </li>

          <li className="cursor-pointer hover:text-red-600 transition">
            Prediction
          </li>

          <li className="cursor-pointer hover:text-red-600 transition">
            About
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;