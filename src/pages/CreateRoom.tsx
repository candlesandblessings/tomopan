import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import HeadSEO from "@/components/seo/HeadSEO";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "@/hooks/useRoom";

const CreateRoom = () => {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();
  const { createRoom } = useRoom();

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      return;
    }
    
    createRoom(playerName);
  };

  return (
    <main className="container mx-auto py-6 px-2">
      <HeadSEO title="Create ȚOMAPAN Room" description="Create an online room to play ȚOMAPAN with friends." canonical="/create" />
      <section className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Create a Room</span>
        </h1>
        <p className="text-muted-foreground text-sm">Set up an online room for you and your friends to play ȚOMAPAN.</p>
      </section>

      <Card className="max-w-md mx-auto">
        <CardHeader className="py-4 px-5">
          <CardTitle className="text-lg">Room details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 py-4 px-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm">Your name</Label>
            <Input 
              id="name" 
              placeholder="Enter your name" 
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="py-2 px-3 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button 
              variant="hero" 
              onClick={handleCreateRoom}
              className="py-2 text-sm"
            >
              Create Room
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate("/join")}
              className="py-2 text-sm"
            >
              Join existing room
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="max-w-2xl mx-auto mt-6">
        <CardHeader className="py-4 px-5">
          <CardTitle className="text-lg">How online play works</CardTitle>
        </CardHeader>
        <CardContent className="py-4 px-5">
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Create a room and share the room code with friends</li>
            <li>Friends join using the room code</li>
            <li>Set game preferences (round duration, categories, etc.)</li>
            <li>Start the game - all players get the same letter simultaneously</li>
            <li>Players submit answers for each category before time runs out</li>
            <li>Answers are automatically scored and validated</li>
            <li>See real-time results and leaderboards</li>
          </ol>
        </CardContent>
      </Card>
    </main>
  );
};

export default CreateRoom;