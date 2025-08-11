-- Create profiles table to store public user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id),
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Secure profiles table with RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Function to create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data ->> 'username');
  RETURN new;
END;
$$;

-- Trigger the function on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add user foreign keys to rooms and players
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update RLS policies to be auth-based
-- ROOMS
DROP POLICY IF EXISTS "Anyone can create rooms" ON public.rooms;
CREATE POLICY "Authenticated users can create rooms" ON public.rooms FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can update rooms" ON public.rooms;
CREATE POLICY "Room host can update their room" ON public.rooms FOR UPDATE TO authenticated USING (auth.uid() = created_by);
DROP POLICY IF EXISTS "Anyone can delete rooms" ON public.rooms;
CREATE POLICY "Room host can delete their room" ON public.rooms FOR DELETE TO authenticated USING (auth.uid() = created_by);

-- PLAYERS
DROP POLICY IF EXISTS "Anyone can join a room" ON public.players;
CREATE POLICY "Authenticated users can join rooms" ON public.players FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can update their own player record" ON public.players;
CREATE POLICY "Players can update their own record" ON public.players FOR UPDATE TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Anyone can delete players" ON public.players;
CREATE POLICY "Players can leave or be kicked" ON public.players FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Update join_room function to link player to user
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
  v_user_id uuid := auth.uid();
BEGIN
  -- Find the room and lock it
  SELECT id, status, current_players, max_players
  INTO v_room_id, v_room_status, v_current_players, v_max_players
  FROM public.rooms
  WHERE code = upper(p_room_code)
  FOR UPDATE;

  -- Checks
  IF v_room_id IS NULL THEN RAISE EXCEPTION 'Room not found'; END IF;
  IF v_room_status <> 'waiting' THEN RAISE EXCEPTION 'Game has already started'; END IF;
  IF v_current_players >= v_max_players THEN RAISE EXCEPTION 'Room is full'; END IF;

  -- Insert the new player and link to the authenticated user
  INSERT INTO public.players (room_id, name, is_host, user_id)
  VALUES (v_room_id, p_player_name, false, v_user_id)
  RETURNING id INTO v_player_id;

  -- Update player count
  UPDATE public.rooms
  SET current_players = current_players + 1
  WHERE id = v_room_id;

  RETURN v_player_id;
END;
$$;