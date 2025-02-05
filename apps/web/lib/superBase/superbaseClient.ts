import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const avatarsPublicurl = process.env.PUBLIC_AVATAR_URL;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export { supabase, avatarsPublicurl }