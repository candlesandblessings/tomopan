import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeadSEO from "@/components/seo/HeadSEO";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Game = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show a toast informing users that only online play is available
    toast({
      title: "Online Play Only",
      description: "ȚOMAPAN is now exclusively online. Create or join a room to play with friends!",
      duration: 5000
    });
    
    // Redirect to create room page
    const timer = setTimeout(() => {
      navigate("/create");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="container mx-auto py-6 px-2">
      <HeadSEO
        title="Play ȚOMAPAN Online"
        description="Play ȚOMAPAN online with friends. Create or join a room to start playing."
        canonical="/game"
      />

      <section className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ȚOMAPAN Online</span>
        </h1>
        <p className="text-muted-foreground mb-5 text-sm">Only online play is available. Create or join a room to play with friends!</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button 
            variant="hero" 
            size="sm" 
            onClick={() => navigate("/create")}
            className="w-full sm:w-auto"
          >
            Create Room
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/join")}
            className="w-full sm:w-auto"
          >
            Join Room
          </Button>
        </div>
      </section>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="py-4 px-5">
          <CardTitle className="text-lg">Online Play Information</CardTitle>
        </CardHeader>
        <CardContent className="py-4 px-5">
          <p className="mb-3 text-sm">
            ȚOMAPAN is now exclusively an online multiplayer game. This change allows us to provide:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-3 text-sm">
            <li>Real-time gameplay with friends</li>
            <li>Fair letter distribution for all players</li>
            <li>Automatic scoring and validation</li>
            <li>Chat functionality during games</li>
            <li>Game history and statistics</li>
          </ul>
          <p className="text-sm">
            Create a room to invite friends, or join an existing room using a room code.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default Game;