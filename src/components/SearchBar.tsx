"use client";

import { useSearchContext } from "@/context/SearchContext";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearchContext();

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Buscar libros..."
      className="w-full p-2 border rounded border-gray-800 mb-8"
    />
  );
};

export default SearchBar;
