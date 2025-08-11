-- STEP 1: Drop ALL dependent policies from ALL tables first.
-- This is the critical step that failed before.

-- Policies depending on rooms.created_by
DROP POLICY IF EXISTS "Room owners can create game rounds" ON public.game_rounds;
DROP POLICY IF EXISTS "Room owners can update game rounds" ON public.game_rounds;
DROP POLICY IF EXISTS "Room owners can update their rooms" ON public.rooms;
DROP POLICY IF EXISTS "Room owners can delete their rooms" ON public.rooms;
DROP POLICY IF EXISTS "Players can leave or be kicked" ON public.players;

-- Policies depending on players.user_id
DROP POLICY IF EXISTS "Players can submit their own answers" ON public.answers;
DROP POLICY IF EXISTS "Players can update their own answers" ON public.answers;
DROP POLICY IF EXISTS "Players can view other players in the same room" ON public.players;
DROP POLICY IF EXISTS "Players can update their own record" ON public.players;

-- STEP 2: Now that dependencies are removed, safely drop the columns.
ALTER TABLE public.rooms DROP COLUMN IF EXISTS created_by;
ALTER TABLE public.players DROP COLUMN IF EXISTS user_id;

-- STEP 3: Remove the rest of the user profile system.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP POLICY IF EXISTS "profiles_delete_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP TABLE IF EXISTS public.profiles;

-- STEP 4: Re-create simplified, non-authenticated policies for all tables.

-- rooms table policies
DROP POLICY IF EXISTS "Anyone can view rooms" ON public.rooms;
CREATE POLICY "Anyone can view rooms" ON public.rooms FOR SELECT USING (true);
DROP POLICY IF EXISTS "Anyone can create rooms" ON public.rooms;
CREATE POLICY "Anyone can create rooms" ON public.rooms FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can update rooms" ON public.rooms;
CREATE POLICY "Anyone can update rooms" ON public.rooms FOR UPDATE USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can delete rooms" ON public.rooms;
CREATE POLICY "Anyone can delete rooms" ON public.rooms FOR DELETE USING (true);

-- players table policies
DROP POLICY IF EXISTS "Anyone can view players" ON public.players;
CREATE POLICY "Anyone can view players" ON public.players FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can join a waiting room" ON public.players;
DROP POLICY IF EXISTS "Anyone can join a room" ON public.players;
CREATE POLICY "Anyone can join a room" ON public.players FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can update their own player record" ON public.players;
CREATE POLICY "Anyone can update their own player record" ON public.players FOR UPDATE USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can delete players" ON public.players;
CREATE POLICY "Anyone can delete players" ON public.players FOR DELETE USING (true);

-- game_rounds table policies
DROP POLICY IF EXISTS "Players in a room can view game rounds" ON public.game_rounds;
CREATE POLICY "Anyone can view game rounds" ON public.game_rounds FOR SELECT USING (true);
CREATE POLICY "Anyone can create game rounds" ON public.game_rounds FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update game rounds" ON public.game_rounds FOR UPDATE USING (true) WITH CHECK (true);

-- answers table policies
DROP POLICY IF EXISTS "Players in a room can view answers" ON public.answers;
CREATE POLICY "Anyone can view answers" ON public.answers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Anyone can submit answers" ON public.answers;
CREATE POLICY "Anyone can submit answers" ON public.answers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can update answers" ON public.answers;
CREATE POLICY "Anyone can update answers" ON public.answers FOR UPDATE USING (true) WITH CHECK (true);

-- STEP 5: Update the join_room function to work without user authentication.
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

  -- Insert the new player
  INSERT INTO public.players (room_id, name, is_host)
  VALUES (v_room_id, p_player_name, false)
  RETURNING id INTO v_player_id;

  -- Update the player count in the rooms table
  UPDATE public.rooms
  SET current_players = current_players + 1
  WHERE id = v_room_id;

  RETURN v_player_id;
END;
$$;