import { InputField } from '@/components/form/input-field';
import React from 'react';

type Props = {
  onSearch: (query: string) => void;
};

export const SearchBar = ({ onSearch }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search bookmarks..."
      onChange={(e) => onSearch(e.target.value)}
      className="p-2 border rounded"
    />
  );
};

export default SearchBar;
