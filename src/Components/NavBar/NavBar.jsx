import { NavLink } from "react-router-dom"
import { NavBarContainer } from "./NavBar.style"
import { useState } from "react"
import { useAuth } from "../../Providers/AuthProvider"

export const NavBar = ({ area }) => {
  const [isActive, setActive] = useState(false)
  const auth = useAuth()

  const arrNavItems = [
    { name: "FORSIDE", path: "/", order: 10 },
    { name: "SANGE", path: "/songs", order: 20 }
  ]

  if(auth?.loginData?.session?.access_token) {
    arrNavItems.push({ name: "PROFIL", path: "/login", order: 40 })
  } else {
    arrNavItems.push({ name: "LOGIN", path: "/login", order: 40 })
  }

  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <NavBarContainer $area={area} >
      <div onClick={handleToggle}
        className={`navMenu ${isActive ? "burgerMenuActive" : "burgerMenu"}`}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul>
        {arrNavItems.map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                to={item.path}
                onClick={() => setActive(false)}
              >
                {item.name}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </NavBarContainer>
  )
}
