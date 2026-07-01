import type { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  icon: ReactNode;
};

function StatCard({ title, value, icon }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex items-center justify-between overflow-hidden">

      <div className="flex-1">
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2 break-all">
          {value}
        </h2>
      </div>

      <div className="ml-4 w-16 h-16 flex items-center justify-center text-red-600 flex-shrink-0">
        {icon}
      </div>

    </div>
  );
}

export default StatCard;