-- Drop existing foreign key constraints if they exist
ALTER TABLE public.players DROP CONSTRAINT IF EXISTS players_room_id_fkey;
ALTER TABLE public.game_rounds DROP CONSTRAINT IF EXISTS game_rounds_room_id_fkey;
ALTER TABLE public.answers DROP CONSTRAINT IF EXISTS answers_round_id_fkey;
ALTER TABLE public.answers DROP CONSTRAINT IF EXISTS answers_player_id_fkey;

-- Add foreign key constraints with ON DELETE CASCADE
ALTER TABLE public.players ADD CONSTRAINT players_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;
ALTER TABLE public.game_rounds ADD CONSTRAINT game_rounds_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;
ALTER TABLE public.answers ADD CONSTRAINT answers_round_id_fkey FOREIGN KEY (round_id) REFERENCES public.game_rounds(id) ON DELETE CASCADE;
ALTER TABLE public.answers ADD CONSTRAINT answers_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id) ON DELETE CASCADE;

-- Drop the policy if it already exists to avoid errors
DROP POLICY IF EXISTS "Anyone can delete rooms" ON public.rooms;

-- Add a policy to allow rooms to be deleted.
CREATE POLICY "Anyone can delete rooms" ON public.rooms FOR DELETE USING (true);