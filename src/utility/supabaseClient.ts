import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://tojidrlbqvaddfhyayvb.supabase.co";
const SUPABASE_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvamlkcmxicXZhZGRmaHlheXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MzQzMzcsImV4cCI6MjA1ODAxMDMzN30.Iyn79QnOWqF4O-RyciGWB1Bkzm4oBBqoXePAKejVMtU";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
