CREATE OR REPLACE FUNCTION public.join_room(p_room_code text, p_player_name text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_room_id uuid;
  v_room_status text;
  v_current_players int;
  v_max_players int;
  v_user_id uuid := auth.uid();
  v_player_id uuid;
BEGIN
  -- Find the room and lock it to prevent race conditions
  SELECT id, status, current_players, max_players
  INTO v_room_id, v_room_status, v_current_players, v_max_players
  FROM public.rooms
  WHERE code = upper(p_room_code)
  FOR UPDATE;

  -- Check if room exists
  IF v_room_id IS NULL THEN
    RAISE EXCEPTION 'Room not found';
  END IF;

  -- Check if game has started
  IF v_room_status <> 'waiting' THEN
    RAISE EXCEPTION 'Game has already started';
  END IF;

  -- Check if room is full
  IF v_current_players >= v_max_players THEN
    RAISE EXCEPTION 'Room is full';
  END IF;

  -- Check if player is already in the room
  IF EXISTS(SELECT 1 FROM public.players WHERE room_id = v_room_id AND user_id = v_user_id) THEN
    RAISE EXCEPTION 'Player already in this room';
  END IF;

  -- Insert the new player
  INSERT INTO public.players (room_id, user_id, name, is_host)
  VALUES (v_room_id, v_user_id, p_player_name, false)
  RETURNING id INTO v_player_id;

  -- Update the player count in the rooms table
  UPDATE public.rooms
  SET current_players = current_players + 1
  WHERE id = v_room_id;

  RETURN v_player_id;
END;
$$;