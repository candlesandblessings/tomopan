CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  new_username TEXT;
BEGIN
  -- Use provided username, or generate a default one if it's null or empty
  new_username := new.raw_user_meta_data ->> 'username';
  IF new_username IS NULL OR new_username = '' THEN
    new_username := 'user_' || substr(new.id::text, 1, 8);
  END IF;

  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new_username);
  RETURN new;
END;
$$;