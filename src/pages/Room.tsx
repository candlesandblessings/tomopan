import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import HeadSEO from "@/components/seo/HeadSEO";
import { Users, Copy, Play } from "lucide-react";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [room, setRoom] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [currentUserPlayer, setCurrentUserPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const fetchRoomData = async () => {
      try {
        // Get room details
        const { data: roomData, error: roomError } = await supabase
          .from("rooms")
          .select("*")
          .eq("id", roomId)
          .single();

        if (roomError) throw roomError;
        setRoom(roomData);

        // Get players in room
        const { data: playersData, error: playersError } = await supabase
          .from("players")
          .select("*")
          .eq("room_id", roomId)
          .order("joined_at");

        if (playersError) throw playersError;
        setPlayers(playersData || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load room",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();

    // Set up real-time subscription for room updates
    const roomChannel = supabase
      .channel("room-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${roomId}`,
        },
        (payload) => {
          setRoom(payload.new);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "players",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setPlayers((prev) => [...prev, payload.new]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "players",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setPlayers((prev) =>
            prev.map((player) =>
              player.id === payload.new.id ? payload.new : player
            )
          );
        }
      )
      .subscribe();

    // Set up real-time subscription for player updates
    const playersChannel = supabase
      .channel("players-changes")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "players",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setPlayers((prev) => prev.filter((player) => player.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomChannel);
      supabase.removeChannel(playersChannel);
    };
  }, [roomId, toast]);

  const copyRoomCode = () => {
    if (room?.code) {
      navigator.clipboard.writeText(room.code);
      toast({
        title: "Copied!",
        description: "Room code copied to clipboard",
      });
    }
  };

  const startGame = async () => {
    if (!room) return;

    try {
      // Update room status to playing
      const { error } = await supabase
        .from("rooms")
        .update({ status: "playing" })
        .eq("id", roomId);

      if (error) throw error;

      // Navigate to game page
      navigate(`/game/${roomId}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to start game",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Room not found</h1>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-10">
      <HeadSEO 
        title={`Room ${room.code} - ȚOMAPAN Online`} 
        description="Waiting room for ȚOMAPAN game" 
        canonical={`/room/${roomId}`} 
      />
      
      <section className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Room {room.code}
          </span>
        </h1>
        <p className="text-muted-foreground mb-6">
          Waiting for players to join
        </p>
        
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={copyRoomCode} variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Copy Room Code
          </Button>
          
          <Button onClick={startGame} disabled={players.length < 2}>
            <Play className="mr-2 h-4 w-4" />
            Start Game
            {players.length < 2 && " (Need 2+ players)"}
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Players ({players.length}/{room.max_players})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {players.map((player) => (
                <div 
                  key={player.id} 
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  {player.is_host && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Host
                    </span>
                  )}
                </div>
              ))}
              
              {players.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No players in room yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Game Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Round Duration</span>
                <span className="font-medium">60 seconds</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Categories</span>
                <span className="font-medium">Țări, Orașe, Munți, Ape, Plante, Animale, Nume</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Max Players</span>
                <span className="font-medium">{room.max_players}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium capitalize">{room.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Room;