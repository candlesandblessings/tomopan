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
    <main className="container mx-auto py-10">
      <HeadSEO title="Join ȚOMAPAN Room" description="Join an online ȚOMAPAN room with a code." canonical="/join" />
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Join a Room</span>
        </h1>
        <p className="text-muted-foreground">Enter a room code to join an existing ȚOMAPAN game.</p>
      </section>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Room details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input 
              id="name" 
              placeholder="Enter your name" 
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Room code</Label>
            <Input 
              id="code" 
              placeholder="Enter room code" 
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={6}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button 
              variant="hero" 
              onClick={handleJoinRoom}
            >
              Join Room
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate("/create")}
            >
              Create new room
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>How to get a room code</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
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