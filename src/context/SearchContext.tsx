"use client"

import { createContext, useContext, useState } from 'react';

type SearchProviderProps = {
    children: React.ReactNode;
    };

type SearchContextProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

const SearchContext = createContext<SearchContextProps | null> (null);

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  console.log('Provider SearchQuery:', searchQuery);  // Log para verificar el valor de searchQuery en el provider

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
