import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { Music2, Disc, Users, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleClearCache = () => {
    toast.success("Cache cleared successfully");
  };

  const handleLoginWithService = (service: string) => {
    toast.info(`${service} login coming soon!`);
    // TODO: Implement OAuth flow for streaming services
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
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">or login with</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => handleLoginWithService("Spotify")}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Spotify
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => handleLoginWithService("Apple Music")}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.204 3.58 3.58 0 0 0-1.086-1.775 3.68 3.68 0 0 0-1.856-1.024 9.43 9.43 0 0 0-2.28-.24c-.952-.033-1.26-.04-3.68-.04s-2.728.007-3.68.04a9.43 9.43 0 0 0-2.28.24 3.68 3.68 0 0 0-1.856 1.024 3.58 3.58 0 0 0-1.086 1.775 9.23 9.23 0 0 0-.24 2.204c-.033.952-.04 1.26-.04 3.68s.007 2.728.04 3.68a9.23 9.23 0 0 0 .24 2.204 3.58 3.58 0 0 0 1.086 1.775 3.68 3.68 0 0 0 1.856 1.024 9.43 9.43 0 0 0 2.28.24c.952.033 1.26.04 3.68.04s2.728-.007 3.68-.04a9.43 9.43 0 0 0 2.28-.24 3.68 3.68 0 0 0 1.856-1.024 3.58 3.58 0 0 0 1.086-1.775 9.23 9.23 0 0 0 .24-2.204c.033-.952.04-1.26.04-3.68s-.007-2.728-.04-3.68zm-6.975 10.115c-.718 0-1.416-.155-2.032-.453l-.01-.005c-.544-.263-1.012-.642-1.38-1.122a3.693 3.693 0 0 1-.586-1.013 5.618 5.618 0 0 1-.428-2.132V6.37c0-.495.065-.98.196-1.44.123-.44.315-.853.566-1.228.284-.422.647-.779 1.071-1.057.407-.265.87-.455 1.364-.561.5-.107 1.013-.163 1.529-.163h.011c.507 0 1.012.056 1.505.163.495.106.96.296 1.37.561a3.69 3.69 0 0 1 1.069 1.057c.251.375.443.788.566 1.228.131.46.195.945.195 1.44v5.144a5.618 5.618 0 0 1-.428 2.132 3.693 3.693 0 0 1-.586 1.013c-.368.48-.836.859-1.38 1.122l-.01.005a4.058 4.058 0 0 1-2.032.453z"/>
                </svg>
                Apple Music
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => handleLoginWithService("TIDAL")}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004L0 16.004l4.004 4.004 4.004-4.004 4.004 4.004 4.004-4.004-4.004-4.004 4.004-4.004-4.004-4.004zm0 8.008l4.004-4.004L20.02 12l-4.004 4.004-4.004-4.004z"/>
                </svg>
                TIDAL
              </Button>
            </div>
          </div>
          
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
