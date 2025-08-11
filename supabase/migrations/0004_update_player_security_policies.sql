-- Drop old, insecure policies
DROP POLICY IF EXISTS "Anyone can view players" ON public.players;
DROP POLICY IF EXISTS "Anyone can join a room" ON public.players;
DROP POLICY IF EXISTS "Players can update their records" ON public.players;
DROP POLICY IF EXISTS "Players can leave a room, or host can kick players" ON public.players;

-- New policies
CREATE POLICY "Players can view other players in the same room" ON public.players FOR SELECT USING (EXISTS (SELECT 1 FROM public.players p WHERE p.room_id = players.room_id AND p.user_id = auth.uid()));
CREATE POLICY "Authenticated users can join a waiting room" ON public.players FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND (SELECT status FROM public.rooms WHERE id = players.room_id) = 'waiting');
CREATE POLICY "Players can update their own record" ON public.players FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Players can leave or be kicked" ON public.players FOR DELETE USING (auth.uid() = user_id OR (SELECT created_by FROM public.rooms WHERE id = players.room_id) = auth.uid());