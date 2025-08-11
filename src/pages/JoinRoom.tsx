import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import HeadSEO from "@/components/seo/HeadSEO";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "@/hooks/useRoom";

const JoinRoom = () => {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  const { joinRoom } = useRoom();

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      return;
    }
    
    if (!roomCode.trim()) {
      return;
    }
    
    joinRoom(roomCode, playerName);
  };

  return (
    <main className="container mx-auto py-6 px-2">
      <HeadSEO title="Join ȚOMAPAN Room" description="Join an online ȚOMAPAN room with a code." canonical="/join" />
      <section className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Join a Room</span>
        </h1>
        <p className="text-muted-foreground text-sm">Enter a room code to join an existing ȚOMAPAN game.</p>
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
          <div className="space-y-2">
            <Label htmlFor="code" className="text-sm">Room code</Label>
            <Input 
              id="code" 
              placeholder="Enter room code" 
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="py-2 px-3 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button 
              variant="hero" 
              onClick={handleJoinRoom}
              className="py-2 text-sm"
            >
              Join Room
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate("/create")}
              className="py-2 text-sm"
            >
              Create new room
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="max-w-2xl mx-auto mt-6">
        <CardHeader className="py-4 px-5">
          <CardTitle className="text-lg">How to get a room code</CardTitle>
        </CardHeader>
        <CardContent className="py-4 px-5">
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Ask a friend who created a room for the room code</li>
            <li>Room codes are 4-6 character alphanumeric codes (e.g. A7B9)</li>
            <li>Codes are case-insensitive</li>
            <li>Each room code is unique and can be used by up to 8 players</li>
            <li>Room codes expire after 24 hours of inactivity</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
};

export default JoinRoom;