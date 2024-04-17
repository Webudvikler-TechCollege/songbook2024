import { useState } from "react"
import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper"
import { SongList } from "../../Components/SongList/SongList"
import { useSongs } from "../../Providers/SongProvider"

export const SongListPage = () => {
  const [ keyword, setKeyword ] = useState("")
  const { songList } = useSongs()

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value) 
  }

  const arrButtonPanel = [
    { id: 1, text: "Opret ny sang", link: "/admin/songs/create" }
  ]

  return (
    <ContentWrapper title={`Sange - ${songList.length} stk`} buttons={arrButtonPanel}>
      <p>
        <label htmlFor="keyword">Søg efter sang: </label>
        <input type="text" name="keyword" onChange={handleKeywordChange}/>
      </p>
      <SongList type="search" keyword={keyword} />
    </ContentWrapper>
  )
}
