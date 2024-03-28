import { Routes, Route } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { NotFoundPage } from "../../Pages/NotFoundPage/NotFoundPage"
import { LoginPage } from "../../Pages/LoginPage/LoginPage"
import { SongListPage } from "../../Pages/SongListPage/SongListPage"
import { SongDetailPage } from "../../Pages/SongDetailPage/SongDetailPage"

export const AppRouter = () => {
  return (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/songs">
			<Route index element={<SongListPage />} />
			<Route path=":id" element={<SongDetailPage />} />
		</Route>
		<Route path="/login" element={<LoginPage />} />
		<Route path="*" element={<NotFoundPage />} />
	</Routes>
  )
}
