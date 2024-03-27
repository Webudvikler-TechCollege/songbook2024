import { useForm } from "react-hook-form"
import { FormContainer } from "../../Styled/Form.style"
import { useSupabase } from "../../Providers/SupabaseProvider"
import { useAuth } from "../../Providers/AuthProvider"

export const LoginForm = () => {
  const { supabase } = useSupabase()
  const { loginData, setLoginData } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleLogin = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error("Error logging in:", error)
    } else {
      console.log("Logged in:", data)
      sessionStorage.setItem("supabase.auth.token", JSON.stringify(data)) 
      setLoginData(data)
      console.log(loginData);
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      setLoginData("")
      sessionStorage.removeItem("supabase.auth.token")
      if (error) throw error
    } catch (error) {
      console.error("Error logging out:", error.message)
    }
  }

  return (
    <>
      {!loginData && !loginData.user ? (
        <FormContainer onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="password">Adgangskode:</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </FormContainer>
      ) : (
        <>
          <p>Du er logget ind som {loginData.user.email}</p>
          <button onClick={handleLogout}>Log af</button>
        </>
      )}
    </>
  )
}
