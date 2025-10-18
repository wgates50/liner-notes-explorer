import { Music2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface HeaderProps {
  crateMode: boolean;
  onCrateModeToggle: () => void;
  onClearCache: () => void;
}

export const Header = ({ crateMode, onCrateModeToggle, onClearCache }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Music2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Crates</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch 
              id="crate-mode" 
              checked={crateMode}
              onCheckedChange={onCrateModeToggle}
            />
            <Label htmlFor="crate-mode" className="flex items-center gap-1 cursor-pointer">
              <Layers className="h-4 w-4" />
              Crate Mode
            </Label>
          </div>
          
          <Button variant="outline" size="sm" onClick={onClearCache}>
            Clear Cache
          </Button>
        </div>
      </div>
    </header>
  );
};
