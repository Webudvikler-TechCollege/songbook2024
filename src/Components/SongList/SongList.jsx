import { useMemo } from "react"
import { SongListContainer } from "./SongListContainer.styled"
import { SongListItem } from "../SongListItem/SongListItem"
import { useSongs } from "../../Providers/SongProvider"
import { FlushArray } from "../../Utils/arrayUtils"
import { useParams } from "react-router-dom"

export const SongList = ({ type, keyword, limit = 10 }) => {
  const { songList } = useSongs()
  const { artist_id } = useParams()

  // Data filter function
  const data = useMemo(() => {
    if (!songList) return []

    switch (type) {
      case "random":
        return FlushArray(songList).slice(0, limit)
        break
      case "search":
        if(keyword) {
          const lowerKeyword = keyword.toLowerCase()
          const titlesMatch = songList.filter((x) =>
            x.title.toLowerCase().includes(lowerKeyword)
          )
          const artistsMatch = songList.filter((x) => 
            x.artists?.name?.toLowerCase().includes(lowerKeyword)
          )
          return Array.from(new Set([...titlesMatch,...artistsMatch]));  
        }
        break
        case "artist":
          if(artist_id) {
            return songList.filter((x) => x.artists.id === artist_id)
          }
          break
      default:
        return songList
    }
  }, [songList, keyword, type])

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
              artist_id={song.artists.id}
            />
          )
        })}
    </SongListContainer>
  )
}
