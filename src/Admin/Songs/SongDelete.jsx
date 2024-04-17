import { useSupabase } from "../../Providers/SupabaseProvider"
import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSongs } from "../../Providers/SongProvider"

export const SongDelete = () => {
  const { supabase } = useSupabase()
  const { record_id } = useParams()
  const [ song, setSong ] = useState([])
  const { songList, setSongList } = useSongs()
  const navigate = useNavigate();


  const getSong = async () => {
    if (supabase) {
      const { data, error } = await supabase
        .from("songs")
        .select()
        .eq("id", record_id)
        .single()
      if (error) {
        console.error("Fejl: kunne ikke hente sang", error)
      } else {
        setSong(data)
      }
    }
  }

  useEffect(() => {
    getSong()
  }, [record_id, supabase])

  const deleteSong = async () => {
    const { data, error } = await supabase
      .from("songs")
      .delete()
      .eq("id", record_id)
    if (error) {
      console.error("Fejl: kunne ikke slette sang", error)
    } else {
      console.log("Sang slettet", data)
      setSongList(songList.filter(song => song.id !== record_id))
      navigate(`/songs`)
    }
  }

  return (
    <ContentWrapper title="Slet sang">
      {song && song.title && 
        <>
          <p>Vil du slette sangen <i>{song.title}?</i></p>
          <button onClick={deleteSong}>Slet sang</button>
        </>
      }
    </ContentWrapper>
  )
}
