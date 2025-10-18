import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Credit {
  name: string;
  role: string;
  instrument?: string;
}

interface CreditPanelProps {
  songTitle: string;
  album?: string;
  year?: string;
  producers: Credit[];
  writers: Credit[];
  players: Credit[];
  streamingLinks?: {
    spotify?: string;
    apple?: string;
    tidal?: string;
  };
  onCreditClick: (name: string) => void;
  onClose?: () => void;
}

export const CreditPanel = ({
  songTitle,
  album,
  year,
  producers,
  writers,
  players,
  streamingLinks,
  onCreditClick,
  onClose
}: CreditPanelProps) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              {songTitle}
            </CardTitle>
            {album && (
              <p className="text-sm text-muted-foreground mt-1">
                {album} {year && `• ${year}`}
              </p>
            )}
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Producers */}
        {producers.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              PRODUCERS
            </h4>
            <div className="flex flex-wrap gap-2">
              {producers.map((producer, idx) => (
                <Badge
                  key={idx}
                  variant="role"
                  onClick={() => onCreditClick(producer.name)}
                >
                  {producer.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Writers */}
        {writers.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              WRITERS
            </h4>
            <div className="flex flex-wrap gap-2">
              {writers.map((writer, idx) => (
                <Badge
                  key={idx}
                  variant="role"
                  onClick={() => onCreditClick(writer.name)}
                >
                  {writer.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Players */}
        {players.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              PLAYERS
            </h4>
            <div className="flex flex-wrap gap-2">
              {players.map((player, idx) => (
                <Badge
                  key={idx}
                  variant="role"
                  onClick={() => onCreditClick(player.name)}
                >
                  {player.name}
                  {player.instrument && (
                    <span className="ml-1 text-xs opacity-70">
                      ({player.instrument})
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Streaming Links */}
        {streamingLinks && (
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">
              LISTEN
            </h4>
            <div className="flex flex-wrap gap-2">
              {streamingLinks.spotify && (
                <Button variant="outline" size="sm" asChild>
                  <a href={streamingLinks.spotify} target="_blank" rel="noopener noreferrer">
                    Spotify <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              )}
              {streamingLinks.apple && (
                <Button variant="outline" size="sm" asChild>
                  <a href={streamingLinks.apple} target="_blank" rel="noopener noreferrer">
                    Apple Music <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              )}
              {streamingLinks.tidal && (
                <Button variant="outline" size="sm" asChild>
                  <a href={streamingLinks.tidal} target="_blank" rel="noopener noreferrer">
                    TIDAL <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
