import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper"
import { SongList } from "../../Components/SongList/SongList"

export const HomePage = () => {
  return (
    <ContentWrapper title="20 tilfældige">
      <SongList type="random" />
    </ContentWrapper>
  )
}
