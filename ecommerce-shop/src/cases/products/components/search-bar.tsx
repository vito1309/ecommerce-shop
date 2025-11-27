import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("search") || "");

  const handleSearch = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    
    if (inputValue.trim()) {
      newParams.set("search", inputValue.trim());
    } else {
      newParams.delete("search");
    }
    
    setSearchParams(newParams);
  }, [inputValue, searchParams, setSearchParams]);

  const handleClear = useCallback(() => {
    setInputValue("");
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div className="flex items-center gap-2 flex-1 max-w-md">
      <Input
        type="text"
        placeholder="Buscar produtos..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        className="border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg font-medium bg-gray-50 hover:bg-white transition-colors"
      />
      {inputValue && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="hover:text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
      <Button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all duration-200 hover:shadow-md"
        size="icon"
      >
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
}
