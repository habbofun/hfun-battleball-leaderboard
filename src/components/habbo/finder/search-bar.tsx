import React, { useEffect, useState } from 'react';

import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [username, setUsername] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(username.trim() === '' || loading);
  }, [username, loading]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2">
      <Input
        type="text"
        placeholder="Enter Habbo username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" disabled={isButtonDisabled}>
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
        ) : (
          <Search className="w-5 h-5 mr-2" />
        )}
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
}
