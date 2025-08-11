import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import HeadSEO from "@/components/seo/HeadSEO";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, User, LogOut } from "lucide-react";

const CATEGORIES = [
  "Țări",
  "Orașe",
  "Munți",
  "Ape",
  "Plante",
  "Animale",
  "Nume"
];

const GameRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [room, setRoom] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [currentRound, setCurrentRound] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStatus, setGameStatus] = useState<"waiting" | "playing" | "finished">("waiting");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchInitialData = useCallback(async () => {
    if (!roomId) return;
    try {
      const { data: roomData, error: roomError } = await supabase
        .from("rooms").select("*").eq("id", roomId).single();
      if (roomError) throw roomError;
      setRoom(roomData);
      setTimeLeft(roomData.duration || 60);

      const { data: playersData, error: playersError } = await supabase
        .from("players").select("*").eq("room_id", roomId).order("joined_at");
      if (playersError) throw playersError;
      setPlayers(playersData || []);

      const { data: roundData, error: roundError } = await supabase
        .from("game_rounds").select("*").eq("room_id", roomId)
        .order("round_number", { ascending: false }).limit(1).single();
      if (roundError && roundError.code !== 'PGRST116') throw roundError; // Ignore 'no rows' error
      
      if (roundData) {
        setCurrentRound(roundData);
        if (roundData.status === 'active') {
          setGameStatus("playing");
          // Calculate remaining time if round is already active
          const startedAt = new Date(roundData.started_at).getTime();
          const now = new Date().getTime();
          const elapsed = Math.floor((now - startedAt) / 1000);
          const remaining = (roundData.duration || 60) - elapsed;
          setTimeLeft(remaining > 0 ? remaining : 0);
        } else {
          setGameStatus(roundData.status);
        }
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to initialize game", variant: "destructive" });
      navigate('/');
    }
  }, [roomId, toast, navigate]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (!roomId) return;

    const gameChannel = supabase.channel(`game-room-changes-${roomId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` },
        (payload) => setRoom(payload.new)
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'game_rounds', filter: `room_id=eq.${roomId}` },
        (payload) => {
          const newRound = payload.new as any;
          setCurrentRound(newRound);
          if (newRound.status === 'active') {
            setTimeLeft(newRound.duration || room?.duration || 60);
            setGameStatus("playing");
          } else if (newRound.status === 'finished') {
            setGameStatus("finished");
            if (timerRef.current) clearInterval(timerRef.current);
          }
        }
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players', filter: `room_id=eq.${roomId}` },
        () => {
          // Re-fetch all players on any change for simplicity in score updates
          supabase.from("players").select("*").eq("room_id", roomId).order("joined_at")
            .then(({ data }) => setPlayers(data || []));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(gameChannel);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [roomId, room?.duration]);

  const finishRound = useCallback(async () => {
    if (!currentRound) return;
    // In a real implementation, this would be triggered by the host or a server function
    // For now, it's client-driven when the timer hits 0
    await supabase.from("game_rounds").update({ status: "finished", ended_at: new Date().toISOString() }).eq("id", currentRound.id);
  }, [currentRound]);

  useEffect(() => {
    if (gameStatus === "playing" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            finishRound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus, timeLeft, finishRound]);

  const handleAnswerChange = (category: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmitAnswers = async () => {
    toast({ title: "Answers submitted", description: "Your answers have been recorded!" });
  };

  const handleLeaveRoom = () => {
    navigate("/");
  };

  if (!room) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-4 px-2">
      <HeadSEO 
        title={`Game Room ${room.code} - ȚOMAPAN Online`} 
        description="Playing ȚOMAPAN game" 
        canonical={`/game/${roomId}`} 
      />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            {room.name || `Room ${room.code}`}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Round {currentRound?.round_number || 1} • Letter:{" "}
            <span className="font-bold text-primary text-lg">
              {currentRound?.letter || "..."}
            </span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="font-mono text-sm">{timeLeft}s</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLeaveRoom}>
            <LogOut className="mr-2 h-4 w-4" />
            Leave
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Progress value={(timeLeft / (room.duration || 60)) * 100} className="w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-lg">ȚOMAPAN Board</CardTitle>
          </CardHeader>
          <CardContent className="py-3 px-4">
            <div className="grid grid-cols-1 gap-3">
              {CATEGORIES.map((category) => (
                <div key={category} className="space-y-1">
                  <label className="text-xs font-medium">{category}</label>
                  <Input
                    value={answers[category] || ""}
                    onChange={(e) => handleAnswerChange(category, e.target.value)}
                    placeholder={`Enter a ${category.toLowerCase()}...`}
                    disabled={gameStatus !== "playing"}
                    className="text-sm py-2 px-3"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={handleSubmitAnswers}
                disabled={gameStatus !== "playing"}
                size="sm"
                className="w-full sm:w-auto"
              >
                Submit Answers
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-4 w-4" />
                Players ({players.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-4">
              <div className="space-y-2">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="font-medium text-sm">{player.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {player.is_host && (
                        <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">Host</span>
                      )}
                      <span className="text-xs font-medium">{player.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-4">
              <div className="space-y-2">
                {[...players]
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 3)
                  .map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="font-medium text-sm">{player.name}</span>
                      </div>
                      <span className="font-bold text-primary text-sm">{player.score}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default GameRoom;