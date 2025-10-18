import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { RoleChips } from "@/components/RoleChips";
import { CreditPanel } from "@/components/CreditPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Music2, Disc3 } from "lucide-react";
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
  
  const [crateMode, setCrateMode] = useState(false);
  const [activeRole, setActiveRole] = useState<string>();
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [discographyType, setDiscographyType] = useState<string>("All");
  const [discographyRole, setDiscographyRole] = useState<string>();

  const handleClearCache = () => {
    toast.success("Cache cleared successfully");
  };

  const handleCreditClick = (name: string) => {
    navigate(`/artist?name=${encodeURIComponent(name)}`);
    window.scrollTo(0, 0);
  };

  const handleSongClick = (song: any) => {
    setSelectedSong({
      ...song,
      producers: [
        { name: "Quincy Jones", role: "Producer" },
        { name: "Bruce Swedien", role: "Co-producer" },
      ],
      writers: [
        { name: "Rod Temperton", role: "Writer" },
        { name: "Michael Jackson", role: "Writer" },
      ],
      players: [
        { name: "Greg Phillinganes", role: "Keyboards", instrument: "Piano, Synthesizer" },
        { name: "Louis Johnson", role: "Bass", instrument: "Bass Guitar" },
        { name: "Jeff Porcaro", role: "Drums", instrument: "Drums" },
      ],
      streamingLinks: {
        spotify: "https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5",
        apple: "https://music.apple.com/us/album/thriller/269572838?i=269573524",
        tidal: "https://tidal.com/browse/track/5929143"
      }
    });
  };

  const filteredDiscography = mockArtistData.discography.filter(item => {
    if (discographyType !== "All" && item.type !== discographyType) return false;
    if (discographyRole && item.role !== discographyRole) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header 
        crateMode={crateMode} 
        onCrateModeToggle={() => setCrateMode(!crateMode)}
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
              ).map((song, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => handleSongClick(song)}
                >
                  <div className="flex-1">
                    <div className="font-medium">{song.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {song.artist} • {song.year}
                    </div>
                  </div>
                </Button>
              ))}
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
              {filteredDiscography.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => handleSongClick(item)}
                >
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.artist} • {item.year} • {item.type}
                    </div>
                  </div>
                  <Badge variant="secondary">{item.role}</Badge>
                </Button>
              ))}
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

        {/* Expanded Credit Panel */}
        {selectedSong && (
          <CreditPanel
            songTitle={selectedSong.title}
            album={selectedSong.artist}
            year={selectedSong.year}
            producers={selectedSong.producers}
            writers={selectedSong.writers}
            players={selectedSong.players}
            streamingLinks={selectedSong.streamingLinks}
            onCreditClick={handleCreditClick}
            onClose={() => setSelectedSong(null)}
          />
        )}
      </main>
    </div>
  );
};

export default Artist;
