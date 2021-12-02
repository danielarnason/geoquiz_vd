import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://bhhsrxjnbpmwthjyavwo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODQ0OTEwMiwiZXhwIjoxOTU0MDI1MTAyfQ.RemaY01c85G6FQ2m_dZi8rGC-f8V_4P8pl17ttCa8lE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)