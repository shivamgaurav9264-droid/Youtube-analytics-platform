type Props = {
  onSearch: (text: string) => void;
};

function SearchBar({ onSearch }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Search Video
      </h2>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Enter video title..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => onSearch(e.target.value)}
        />

        <button
          className="bg-red-600 text-white px-6 rounded-lg hover:bg-red-700 transition"
        >
          Search
        </button>

      </div>

    </div>
  );
}

export default SearchBar;