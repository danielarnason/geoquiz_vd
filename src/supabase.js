import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://gjrejfkeeqjeckhuoyrw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODE5NDQwMCwiZXhwIjoxOTUzNzcwNDAwfQ.3sQUbJ-VbjJuDJoxRCX0f8nDcw94M9SlV4UpWlqf-e0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)