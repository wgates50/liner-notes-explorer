import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { toast } from "sonner";

// Mock search results
const mockSearchResults = [
  { name: "Quincy Jones", note: "Producer, Composer, Arranger" },
  { name: "J Dilla", note: "Producer, Beatmaker" },
  { name: "Questlove", note: "Drummer, Producer" },
  { name: "Pino Palladino", note: "Bassist" },
  { name: "James Jamerson", note: "Bassist, Session Musician" },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  
  const [crateMode, setCrateMode] = useState(false);

  const handleClearCache = () => {
    toast.success("Cache cleared successfully");
  };

  const handleResultClick = (name: string) => {
    navigate(`/artist?name=${encodeURIComponent(name)}`);
  };

  const filteredResults = mockSearchResults.filter(result => 
    result.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header 
        crateMode={crateMode} 
        onCrateModeToggle={() => setCrateMode(!crateMode)}
        onClearCache={handleClearCache}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            Found {filteredResults.length} results for "{query}"
          </p>
        </div>

        <div className="space-y-3 max-w-3xl">
          {filteredResults.map((result, idx) => (
            <Card
              key={idx}
              className="p-4 hover:bg-secondary transition-colors cursor-pointer"
              onClick={() => handleResultClick(result.name)}
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{result.name}</h3>
                  <p className="text-sm text-muted-foreground">{result.note}</p>
                </div>
              </div>
            </Card>
          ))}

          {filteredResults.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No results found. Try a different search term.
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
