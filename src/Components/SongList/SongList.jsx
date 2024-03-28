import { useMemo } from "react"
import { SongListContainer } from "./SongListContainer.styled"
import { SongListItem } from "../SongListItem/SongListItem"
import { useSongs } from "../../Providers/SongProvider"
import { FlushArray } from "../../Utils/arrayUtils"

export const SongList = ({ type, keyword }) => {
  const { songData } = useSongs()

  // Data filter function
  const data = useMemo(() => {
    if (!songData) return []

    switch (type) {
      case "random":
        return FlushArray(songData).slice(0, 20)
        break
      case "search":
        if(keyword) {
          const lowerKeyword = keyword.toLowerCase()
          const titlesMatch = songData.filter((x) =>
            x.title.toLowerCase().includes(lowerKeyword)
          )
          const artistsMatch = songData.filter((x) => 
            x.artists?.name?.toLowerCase().includes(lowerKeyword)
          )
          return Array.from(new Set([...titlesMatch,...artistsMatch]));  
        }
        break
      default:
        return songData
    }
  }, [songData, keyword, type])

  return (
    <SongListContainer>
      {data &&
        data.map((song) => {
          return (
            <SongListItem
              key={song.id}
              id={song.id}
              title={song.title}
              artist={song.artists.name}
            />
          )
        })}
    </SongListContainer>
  )
}
