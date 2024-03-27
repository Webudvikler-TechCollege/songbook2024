import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useSupabase } from "../../Providers/SupabaseProvider"
import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper"
import { useEffect, useState } from "react"
import { useAuth } from "../../Providers/AuthProvider"

export const LoginPage = () => {
  const { supabase } = useSupabase() // Kalder supabase obj fra vores provider
  const { loginData, setLoginData } = useAuth() // Kalder auth obj fra vores provider}

  // Funktion til at logge ud
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      setLoginData('')
      sessionStorage.removeItem("supabase.auth.token")
      if (error) throw error
    } catch (error) {
      console.error("Error logging out:", error.message)
    }
  }

  const handleLogin = async () => {
    if (supabase && supabase.auth) {
      const { data: { session }} = await supabase.auth.getSession()
      
      setLoginData(session)
      sessionStorage.setItem("supabase.auth.token", JSON.stringify(session))

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setLoginData(session)
      })
      return () => subscription.unsubscribe()
    }
  }

  useEffect(() => {
    handleLogin()
  }, [supabase])

  if (!loginData) {
    return (
      <ContentWrapper title="Login" description="Login to the site">
        {supabase && (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["github"]}
          />
        )}
      </ContentWrapper>
    )
  } else {
    return (
      <ContentWrapper title="Logged in">
        <p>Du er logget ind som {loginData.user.email}</p>
        <button onClick={handleLogout}>Log af</button>
      </ContentWrapper>
    )
  }
}
