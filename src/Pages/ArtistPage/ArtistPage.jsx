import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper"
import { SongList } from "../../Components/SongList/SongList"

export const ArtistPage = () => {
  return (
    <ContentWrapper title="Artist">
      <SongList type="artist" />
    </ContentWrapper>
  )
}
