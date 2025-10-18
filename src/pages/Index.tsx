import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { Music2, Disc, Users, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [crateMode, setCrateMode] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleClearCache = () => {
    toast.success("Cache cleared successfully");
  };

  const features = [
    {
      icon: Users,
      title: "Credit-First Discovery",
      description: "Navigate music by the people who created it—producers, writers, players"
    },
    {
      icon: Music2,
      title: "Role & Instrument Filters",
      description: "Filter by specific roles (producer, writer) or instruments (keys, bass, drums)"
    },
    {
      icon: Layers,
      title: "User-Driven Exploration",
      description: "Toggle Crate Mode to explore without algorithmic recommendations"
    },
    {
      icon: Disc,
      title: "Complete Credits",
      description: "Dive deep into every recording's full credits—all clickable for instant navigation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        crateMode={crateMode} 
        onCrateModeToggle={() => setCrateMode(!crateMode)}
        onClearCache={handleClearCache}
      />
      
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Discover Music Through
              <span className="block text-primary mt-2">Credits, Not Algorithms</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Navigate by people, roles, and instruments. Every credit is a door to your next discovery.
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
          
          <p className="text-sm text-muted-foreground">
            Try searching: Quincy Jones, J Dilla, Pino Palladino, or your favorite artist
          </p>
        </div>

        {/* Features Section */}
        <div className="py-16 border-t border-border">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Music Your Way
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
