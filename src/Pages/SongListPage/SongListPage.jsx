import { useState } from "react"
import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper"
import { SongList } from "../../Components/SongList/SongList"

export const SongListPage = () => {
  const [ keyword, setKeyword ] = useState("")

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value) 
  }

  return (
    <ContentWrapper title="Sange">
      <p>
        <label htmlFor="keyword">Søg efter sang: </label>
        <input type="text" name="keyword" onChange={handleKeywordChange}/>
      </p>
      <SongList type="search" keyword={keyword} />
    </ContentWrapper>
  )
}
