import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { RoleChips } from "@/components/RoleChips";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Music2, Disc3, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { toast } from "sonner";

// Mock data - in real app, this would come from API
const mockArtistData = {
  name: "Quincy Jones",
  bio: "Legendary producer, composer, arranger",
  topSongsByRole: {
    producer: [
      { title: "Thriller", artist: "Michael Jackson", year: "1982" },
      { title: "Billie Jean", artist: "Michael Jackson", year: "1982" },
      { title: "Beat It", artist: "Michael Jackson", year: "1982" },
      { title: "Off The Wall", artist: "Michael Jackson", year: "1979" },
      { title: "Don't Stop 'Til You Get Enough", artist: "Michael Jackson", year: "1979" },
    ],
    composer: [
      { title: "Soul Bossa Nova", artist: "Quincy Jones", year: "1962" },
      { title: "The Streetbeater", artist: "Quincy Jones", year: "1973" },
      { title: "Ai No Corrida", artist: "Quincy Jones", year: "1981" },
    ],
    arranger: [
      { title: "Fly Me to the Moon", artist: "Frank Sinatra", year: "1964" },
      { title: "It Might as Well Be Spring", artist: "Frank Sinatra", year: "1964" },
    ]
  },
  roles: ["Producer", "Composer", "Arranger", "Conductor"],
  discography: [
    { 
      title: "Thriller", 
      type: "Album", 
      year: "1982",
      role: "Producer",
      artist: "Michael Jackson"
    },
    { 
      title: "Off The Wall", 
      type: "Album", 
      year: "1979",
      role: "Producer",
      artist: "Michael Jackson"
    },
    { 
      title: "The Dude", 
      type: "Album", 
      year: "1981",
      role: "Producer",
      artist: "Quincy Jones"
    },
    { 
      title: "Back on the Block", 
      type: "Album", 
      year: "1989",
      role: "Producer",
      artist: "Quincy Jones"
    },
  ],
  collaborators: [
    { name: "Michael Jackson", count: 42 },
    { name: "Rod Temperton", count: 28 },
    { name: "Bruce Swedien", count: 35 },
    { name: "Greg Phillinganes", count: 31 },
    { name: "Jerry Hey", count: 27 },
    { name: "Louis Johnson", count: 19 },
  ]
};

const Artist = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const artistName = searchParams.get("name") || "Unknown Artist";
  
  const [activeRole, setActiveRole] = useState<string>();
  const [expandedSongs, setExpandedSongs] = useState<Set<string>>(new Set());
  const [discographyType, setDiscographyType] = useState<string>("All");
  const [discographyRole, setDiscographyRole] = useState<string>();

  const handleClearCache = () => {
    toast.success("Cache cleared successfully");
  };

  const handleCreditClick = (name: string) => {
    navigate(`/artist?name=${encodeURIComponent(name)}`);
    window.scrollTo(0, 0);
  };

  const toggleSongExpansion = (songTitle: string) => {
    const newExpanded = new Set(expandedSongs);
    if (newExpanded.has(songTitle)) {
      newExpanded.delete(songTitle);
    } else {
      newExpanded.add(songTitle);
    }
    setExpandedSongs(newExpanded);
  };

  const getSongCredits = (song: any) => {
    // Mock credits - in real app, this would come from API
    return {
      producers: [
        { name: "Quincy Jones", role: "Producer" },
        { name: "Bruce Swedien", role: "Co-producer" },
      ],
      writers: [
        { name: "Rod Temperton", role: "Writer" },
        { name: "Michael Jackson", role: "Writer" },
      ],
      players: [
        { name: "Greg Phillinganes", instrument: "Piano, Synthesizer" },
        { name: "Louis Johnson", instrument: "Bass Guitar" },
        { name: "Jeff Porcaro", instrument: "Drums" },
      ],
      label: "Epic Records",
      streamingLinks: {
        spotify: "https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5",
        apple: "https://music.apple.com/us/album/thriller/269572838?i=269573524",
        tidal: "https://tidal.com/browse/track/5929143"
      }
    };
  };

  const filteredDiscography = mockArtistData.discography.filter(item => {
    if (discographyType !== "All" && item.type !== discographyType) return false;
    if (discographyRole && item.role !== discographyRole) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onClearCache={handleClearCache}
      />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Artist Header */}
        <div className="flex items-start gap-4">
          <div className="h-24 w-24 rounded-lg bg-secondary flex items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{artistName}</h1>
            <p className="text-muted-foreground">{mockArtistData.bio}</p>
          </div>
        </div>

        {/* Top Songs by Role */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music2 className="h-5 w-5 text-primary" />
              Top Songs by Role
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RoleChips 
              roles={["Producer", "Composer", "Arranger"]}
              activeRole={activeRole}
              onRoleSelect={setActiveRole}
            />
            <div className="space-y-2 mt-4">
              {(activeRole 
                ? mockArtistData.topSongsByRole[activeRole.toLowerCase() as keyof typeof mockArtistData.topSongsByRole] || []
                : mockArtistData.topSongsByRole.producer
              ).map((song, idx) => {
                const isExpanded = expandedSongs.has(song.title);
                const credits = isExpanded ? getSongCredits(song) : null;
                
                return (
                  <div key={idx} className="border border-border rounded-lg overflow-hidden">
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-left h-auto py-3 hover:bg-secondary"
                      onClick={() => toggleSongExpansion(song.title)}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{song.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {song.artist} • {song.year}
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    
                    {isExpanded && credits && (
                      <div className="px-4 pb-4 space-y-4 bg-card/50">
                        {/* Producers */}
                        {credits.producers.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                              PRODUCERS
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {credits.producers.map((producer, pidx) => (
                                <Badge
                                  key={pidx}
                                  variant="role"
                                  onClick={() => handleCreditClick(producer.name)}
                                >
                                  {producer.name}
                                  {producer.role && (
                                    <span className="ml-1 text-xs opacity-70">
                                      ({producer.role})
                                    </span>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Writers */}
                        {credits.writers.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                              WRITERS
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {credits.writers.map((writer, widx) => (
                                <Badge
                                  key={widx}
                                  variant="role"
                                  onClick={() => handleCreditClick(writer.name)}
                                >
                                  {writer.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Players */}
                        {credits.players.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                              INSTRUMENTS
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {credits.players.map((player, plidx) => (
                                <Badge
                                  key={plidx}
                                  variant="role"
                                  onClick={() => handleCreditClick(player.name)}
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

                        {/* Label */}
                        {credits.label && (
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                              LABEL
                            </h4>
                            <Badge variant="secondary">{credits.label}</Badge>
                          </div>
                        )}

                        {/* Streaming Links */}
                        {credits.streamingLinks && (
                          <div className="pt-2 border-t border-border">
                            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                              LISTEN
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {credits.streamingLinks.spotify && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={credits.streamingLinks.spotify} target="_blank" rel="noopener noreferrer">
                                    Spotify <ExternalLink className="ml-1 h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                              {credits.streamingLinks.apple && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={credits.streamingLinks.apple} target="_blank" rel="noopener noreferrer">
                                    Apple Music <ExternalLink className="ml-1 h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                              {credits.streamingLinks.tidal && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={credits.streamingLinks.tidal} target="_blank" rel="noopener noreferrer">
                                    TIDAL <ExternalLink className="ml-1 h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Role Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <RoleChips 
              roles={mockArtistData.roles}
              onRoleSelect={(role) => setDiscographyRole(role)}
            />
          </CardContent>
        </Card>

        {/* Discography */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Disc3 className="h-5 w-5 text-primary" />
              Discography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {["All", "Album", "Single", "EP"].map((type) => (
                <Button
                  key={type}
                  variant="chip"
                  size="sm"
                  onClick={() => setDiscographyType(type)}
                  className={discographyType === type ? "bg-primary text-primary-foreground" : ""}
                >
                  {type}
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              {filteredDiscography.map((item, idx) => {
                const isExpanded = expandedSongs.has(item.title);
                const credits = isExpanded ? getSongCredits(item) : null;
                
                return (
                  <div key={idx} className="border border-border rounded-lg overflow-hidden">
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-left h-auto py-3 hover:bg-secondary"
                      onClick={() => toggleSongExpansion(item.title)}
                    >
                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.artist} • {item.year} • {item.type}
                          </div>
                        </div>
                        <Badge variant="secondary">{item.role}</Badge>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground ml-2" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground ml-2" />
                      )}
                    </Button>
                    
                    {isExpanded && credits && (
                      <div className="px-4 pb-4 space-y-4 bg-card/50">
                        {/* Producers */}
                        {credits.producers.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                              PRODUCERS
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {credits.producers.map((producer, pidx) => (
                                <Badge
                                  key={pidx}
                                  variant="role"
                                  onClick={() => handleCreditClick(producer.name)}
                                >
                                  {producer.name}
                                  {producer.role && (
                                    <span className="ml-1 text-xs opacity-70">
                                      ({producer.role})
                                    </span>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Writers */}
                        {credits.writers.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                              WRITERS
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {credits.writers.map((writer, widx) => (
                                <Badge
                                  key={widx}
                                  variant="role"
                                  onClick={() => handleCreditClick(writer.name)}
                                >
                                  {writer.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Players */}
                        {credits.players.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                              INSTRUMENTS
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {credits.players.map((player, plidx) => (
                                <Badge
                                  key={plidx}
                                  variant="role"
                                  onClick={() => handleCreditClick(player.name)}
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

                        {/* Label */}
                        {credits.label && (
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                              LABEL
                            </h4>
                            <Badge variant="secondary">{credits.label}</Badge>
                          </div>
                        )}

                        {/* Streaming Links */}
                        {credits.streamingLinks && (
                          <div className="pt-2 border-t border-border">
                            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                              LISTEN
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {credits.streamingLinks.spotify && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={credits.streamingLinks.spotify} target="_blank" rel="noopener noreferrer">
                                    Spotify <ExternalLink className="ml-1 h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                              {credits.streamingLinks.apple && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={credits.streamingLinks.apple} target="_blank" rel="noopener noreferrer">
                                    Apple Music <ExternalLink className="ml-1 h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                              {credits.streamingLinks.tidal && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={credits.streamingLinks.tidal} target="_blank" rel="noopener noreferrer">
                                    TIDAL <ExternalLink className="ml-1 h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Frequent Collaborators */}
        <Card>
          <CardHeader>
            <CardTitle>Frequent Collaborators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {mockArtistData.collaborators.map((collab, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-between h-auto py-3"
                  onClick={() => handleCreditClick(collab.name)}
                >
                  <span className="font-medium">{collab.name}</span>
                  <Badge variant="secondary">{collab.count}</Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

      </main>
    </div>
  );
};

export default Artist;
