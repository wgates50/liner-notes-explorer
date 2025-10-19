import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onClearCache: () => void;
}

export const Header = ({ onClearCache }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="px-4 py-4 flex items-center gap-2">
        <strong className="text-base">🎛️ Liner Notes (MVP)</strong>
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={onClearCache}>
          Clear cache
        </Button>
        <Badge variant="secondary" className="ml-2">
          Data: local MusicBrainz mirror
        </Badge>
      </div>
    </header>
  );
};
