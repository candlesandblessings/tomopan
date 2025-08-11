ALTER POLICY "Room owners can update their rooms" ON public.rooms
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

ALTER POLICY "Anyone can delete rooms" ON public.rooms RENAME TO "Room owners can delete their rooms";

ALTER POLICY "Room owners can delete their rooms" ON public.rooms
USING (auth.uid() = created_by);