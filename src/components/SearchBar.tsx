import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Mock suggestions - in real app would call API
    if (value.length > 1) {
      const mockSuggestions = [
        `${value} - Artist`,
        `${value} - Album`,
        `${value} - Song`,
      ];
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 hover:bg-secondary cursor-pointer rounded-md text-sm"
              >
                <strong>{suggestion.split(' - ')[0]}</strong>
                {suggestion.includes(' - ') && (
                  <span className="text-muted-foreground text-xs ml-2">
                    ({suggestion.split(' - ')[1]})
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Button type="submit" variant="outline">
        Search
      </Button>
    </form>
  );
};
