import { createClient } from "@supabase/supabase-js"
import React, { createContext, useContext, useEffect, useState } from "react"

const SupabaseContext = createContext()

export const SupabaseProvider = ({ children }) => {
  const [supabase, setSupabase] = useState(null)

  // Create a new supabase client
  const supabaseUrl = "https://boaajtoztbbwyitsymvh.supabase.co"
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

  useEffect(() => {
    setSupabase(createClient(supabaseUrl, supabaseKey))
  },[supabaseKey])

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => useContext(SupabaseContext)
