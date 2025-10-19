import { Archive, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  crateMode: boolean;
  onCrateModeToggle: () => void;
  onClearCache: () => void;
}

export const Header = ({ crateMode, onCrateModeToggle, onClearCache }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.forward()}
              className="h-8 w-8"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Archive className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Crates</h1>
          </button>
        </div>
        
        <div className="flex items-center gap-6">
          <Button variant="outline" size="sm" onClick={onClearCache}>
            Clear Cache
          </Button>
        </div>
      </div>
    </header>
  );
};
