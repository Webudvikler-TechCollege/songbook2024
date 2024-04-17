import { Link } from "react-router-dom"
import { SongListItemContainer } from "./SongListItemContainer.styled"
import { useAuth } from "../../Providers/AuthProvider"
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs"

export const SongListItem = ({ id, title, artist, artist_id }) => {
  const auth = useAuth()

  return (
    <SongListItemContainer>
      <Link to={`/songs/${id}`} title="Gå til detaljer">
        {title}
      </Link>
      <Link to={`songs/artist/${artist_id}`} title="Se alle sange med denne artist">
        {artist}
      </Link>
      <div>
        {auth?.loginData?.session?.access_token && (
          <>
            <Link to={`/admin/songs/update/${id}`}>
              <BsFillPencilFill />
            </Link>
            <Link to={`/admin/songs/delete/${id}`}>
              <BsFillTrash3Fill />
            </Link>
          </>
        )}
      </div>
    </SongListItemContainer>
  )
}
