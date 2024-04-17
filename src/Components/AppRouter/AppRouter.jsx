import { Routes, Route } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { NotFoundPage } from "../../Pages/NotFoundPage/NotFoundPage"
import { LoginPage } from "../../Pages/LoginPage/LoginPage"
import { SongListPage } from "../../Pages/SongListPage/SongListPage"
import { ArtistPage } from "../../Pages/ArtistPage/ArtistPage"
import { SongDetailPage } from "../../Pages/SongDetailPage/SongDetailPage"
import { useAuth } from "../../Providers/AuthProvider"
import { SongCreate } from "../../Admin/Songs/SongCreate"
import { SongUpdate } from "../../Admin/Songs/SongUpdate"
import { SongDelete } from "../../Admin/Songs/SongDelete"

export const AppRouter = () => {
  const auth = useAuth()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/songs">
        <Route index element={<SongListPage />} />
        <Route path=":id" element={<SongDetailPage />} />
        <Route path="artist/:artist_id" element={<ArtistPage />} />
      </Route>

	    <Route path="/admin/songs">
        <Route index element={<SongCreate />} />
        <Route path="create" element={<SongCreate />} />
        <Route path="update/:record_id" element={<SongUpdate />} />
        <Route path="delete/:record_id" element={<SongDelete />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />


      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
