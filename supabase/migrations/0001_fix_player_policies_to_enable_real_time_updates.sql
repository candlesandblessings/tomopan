-- Drop the old, poorly defined policies
DROP POLICY IF EXISTS "Anyone can join rooms" ON public.players;
DROP POLICY IF EXISTS "Players in a room can view other players" ON public.players;

-- Create new, clear policies for the players table
-- This allows anyone to view players, which is needed for real-time updates to work.
CREATE POLICY "Anyone can view players" ON public.players FOR SELECT USING (true);

-- This allows anyone to insert a record into the players table (i.e., join a room).
CREATE POLICY "Anyone can join a room" ON public.players FOR INSERT WITH CHECK (true);