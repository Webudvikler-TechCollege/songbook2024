import { Routes, Route } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { NotFoundPage } from "../../Pages/NotFoundPage/NotFoundPage"
import { LoginPage } from "../../Pages/LoginPage/LoginPage"

export const AppRouter = () => {
  return (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/login" element={<LoginPage />} />
		<Route path="*" element={<NotFoundPage />} />
	</Routes>
  )
}
