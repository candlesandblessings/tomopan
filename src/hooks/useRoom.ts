import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const useRoom = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const createRoom = async ({
    roomName,
    maxPlayers = 6,
    roundDuration = 60
  }: {
    roomName: string;
    maxPlayers?: number;
    roundDuration?: number;
  }) => {
    if (!user || !profile) {
      toast({ title: "Authentication Error", description: "You must be logged in to create a room.", variant: "destructive" });
      return;
    }

    try {
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .insert({
          code: roomCode,
          name: roomName,
          max_players: maxPlayers,
          duration: roundDuration,
          current_players: 1,
          status: "waiting",
          created_by: user.id,
        })
        .select()
        .single();

      if (roomError) throw roomError;

      const { error: playerError } = await supabase
        .from("players")
        .insert({
          room_id: roomData.id,
          name: profile.username || user.email,
          is_host: true,
          score: 0,
          user_id: user.id,
        });

      if (playerError) throw playerError;

      toast({
        title: "Room created",
        description: `Room ${roomCode} created successfully!`,
      });

      navigate(`/room/${roomData.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create room",
        variant: "destructive",
      });
    }
  };

  const joinRoom = async (roomCode: string) => {
    if (!user || !profile) {
      toast({ title: "Authentication Error", description: "You must be logged in to join a room.", variant: "destructive" });
      return;
    }
    
    try {
      const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .select("id")
        .eq("code", roomCode.toUpperCase())
        .single();

      if (roomError || !roomData) {
        throw new Error("Room not found");
      }

      const { error: joinError } = await supabase.rpc('join_room', {
        p_room_code: roomCode,
        p_player_name: profile.username || user.email
      });

      if (joinError) throw joinError;

      toast({
        title: "Room joined",
        description: `Successfully joined room ${roomCode.toUpperCase()}!`,
      });

      navigate(`/room/${roomData.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to join room",
        variant: "destructive",
      });
    }
  };

  const endRoom = async (roomId: string) => {
    try {
      const { error } = await supabase.from("rooms").delete().eq("id", roomId);
      if (error) throw error;

      toast({
        title: "Room Ended",
        description: "The room has been successfully closed.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to end the room.",
        variant: "destructive",
      });
    }
  };

  return { createRoom, joinRoom, endRoom };
};