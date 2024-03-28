import { useEffect, useState } from "react"
import { useSupabase } from "../../Providers/SupabaseProvider"
import { SongDetailsContainer } from "./SongDetailsContainer.styled"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ContentWrapper } from "../ContentWrapper/ContentWrapper"

export const SongDetails = () => {
  const [song, setSong] = useState([])
  const { supabase } = useSupabase()
  const { id } = useParams()
  const navigate = useNavigate()

  console.log(id)

  const getData = async () => {
    if (supabase) {
      const { data, error } = await supabase
        .from("songs")
        .select("id, title, content, artists(name)")
        .eq("id", id)
        .single()
      if (error) {
        console.error("Error fetching songs", error)
      } else {
        setSong(data)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [supabase])

  return (
    <SongDetailsContainer>
      <ContentWrapper title={song.title}>
        {song && song.artists && (
          <>
            <h4>Af {song.artists.name}</h4>
            <Link className="back" onClick={() => navigate(-1)}>
              &laquo; Tilbage
            </Link>
            <pre>{song.content}</pre>
          </>
        )}
      </ContentWrapper>
    </SongDetailsContainer>
  )
}
