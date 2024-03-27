import { NavLink } from "react-router-dom"
import { NavBarContainer } from "./NavBar.style"
import { useState } from "react"

export const NavBar = ({ area }) => {
  const [isActive, setActive] = useState(false)

  const arrNavItems = [
    { name: "HOME", path: "/" },
    { name: "PLAKATER", path: "/posters/action" },
    { name: "OM OS", path: "/about" },
    { name: "KONTAKT", path: "/contact" },
    { name: "KURV", path: "/cart" },
    { name: "LOGIN", path: "/login" }
  ]

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
