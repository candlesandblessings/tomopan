import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useRoom = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch rooms",
          variant: "destructive",
        });
      } else {
        setRooms(data || []);
      }
      setLoading(false);
    };

    fetchRooms();
  }, [toast]);

  const createRoom = async ({
    roomName,
    playerName,
    maxPlayers = 6,
    roundDuration = 60
  }: {
    roomName: string;
    playerName: string;
    maxPlayers?: number;
    roundDuration?: number;
  }) => {
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
        })
        .select()
        .single();

      if (roomError) throw roomError;

      const { data: playerData, error: playerError } = await supabase
        .from("players")
        .insert({
          room_id: roomData.id,
          name: playerName,
          is_host: true,
          score: 0,
        })
        .select()
        .single();

      if (playerError) throw playerError;

      if (playerData) {
        // This is how we'll identify the host
        localStorage.setItem("currentPlayerId", playerData.id);
      }

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

  const joinRoom = async (roomCode: string, playerName: string) => {
    try {
      const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .select("id")
        .eq("code", roomCode.toUpperCase())
        .single();

      if (roomError || !roomData) {
        throw new Error("Room not found");
      }

      const { data: newPlayerId, error: joinError } = await supabase.rpc('join_room', {
        p_room_code: roomCode,
        p_player_name: playerName
      });

      if (joinError) throw joinError;

      if (newPlayerId) {
        localStorage.setItem("currentPlayerId", newPlayerId);
      }

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
      localStorage.removeItem("currentPlayerId");
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to end the room.",
        variant: "destructive",
      });
    }
  };

  return { rooms, loading, createRoom, joinRoom, endRoom };
};