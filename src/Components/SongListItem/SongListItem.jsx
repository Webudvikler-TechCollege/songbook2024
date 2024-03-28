import { Link } from "react-router-dom"
import { SongListItemContainer } from "./SongListItemContainer.styled"

export const SongListItem = ({ id, title, artist }) => {
  return (
	<SongListItemContainer>
 		<Link to={`/songs/${id}`} title="Gå til detaljer">{title}</Link>&nbsp;-&nbsp; 
		<Link to={`/artist/${id}`} title="Se alle sange med denne artist">{artist}</Link>
	</SongListItemContainer>
  )
}
