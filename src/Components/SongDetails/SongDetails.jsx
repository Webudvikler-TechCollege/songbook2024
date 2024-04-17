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

  const arrButtonPanel = [
    { text: "Rediger", link: `/admin/songs/update/${id}` },
    { text: "Udskriv", event: () => window.print() },
    { text: "Slet", link: `/admin/songs/delete/${id}` }
  ]


  return (
    <SongDetailsContainer>
      <ContentWrapper title={song.title} buttons={arrButtonPanel}>
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
