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
      // Generate a random 6-character room code
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Create the room
      const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .insert({
          code: roomCode,
          name: roomName,
          max_players: maxPlayers,
          duration: roundDuration,
          current_players: 1,
          status: "waiting"
        })
        .select()
        .single();

      if (roomError) throw roomError;

      // Add the creator as the first player
      const { error: playerError } = await supabase
        .from("players")
        .insert({
          room_id: roomData.id,
          name: playerName,
          is_host: true,
          score: 0
        });

      if (playerError) throw playerError;

      toast({
        title: "Room created",
        description: `Room ${roomCode} created successfully!`,
      });

      // Navigate to the game room
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
      // Find the room by code
      const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .select("*")
        .eq("code", roomCode.toUpperCase())
        .single();

      if (roomError || !roomData) {
        throw new Error("Room not found");
      }

      // Check if room is full
      if (roomData.current_players >= roomData.max_players) {
        throw new Error("Room is full");
      }

      // Check if room is in waiting status
      if (roomData.status !== "waiting") {
        throw new Error("Game has already started");
      }

      // Check if player is already in the room
      const { data: existingPlayers } = await supabase
        .from("players")
        .select("*")
        .eq("room_id", roomData.id)
        .eq("name", playerName);

      if (existingPlayers && existingPlayers.length > 0) {
        // Player already in room, navigate to room
        navigate(`/room/${roomData.id}`);
        return;
      }

      // Add player to the room
      const { error: playerError } = await supabase
        .from("players")
        .insert({
          room_id: roomData.id,
          name: playerName,
          is_host: false,
          score: 0
        });

      if (playerError) throw playerError;

      // Update room player count
      const { error: updateError } = await supabase
        .from("rooms")
        .update({ current_players: roomData.current_players + 1 })
        .eq("id", roomData.id);

      if (updateError) throw updateError;

      toast({
        title: "Room joined",
        description: `Successfully joined room ${roomCode.toUpperCase()}!`,
      });

      // Navigate to the game room
      navigate(`/room/${roomData.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to join room",
        variant: "destructive",
      });
    }
  };

  return { rooms, loading, createRoom, joinRoom };
};