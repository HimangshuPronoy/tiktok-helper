
-- Create a table for saved content (titles, bios, etc.)
CREATE TABLE IF NOT EXISTS public.saved_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS saved_content_user_id_idx ON public.saved_content (user_id);
