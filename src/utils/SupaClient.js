import { createClient } from "@supabase/supabase-js";

const supabase_url = VITE_SUPABASE_URL;
const supabase_key = VITE_SUPABASE_KEY;

export const supabase = createClient(supabase_url, supabase_key);
