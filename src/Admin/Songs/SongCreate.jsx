import { set, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useSupabase } from "../../Providers/SupabaseProvider"
import { AdminForm } from "../../Styled/Admin.style"
import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper"
import { useNavigate } from "react-router-dom"

export const SongCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [ artists, setArtists ] = useState([])
  const { supabase } = useSupabase()
  const [ created, setCreated ] = useState(false)
  const navigate = useNavigate()

  const getArtists = async () => {
    if (supabase) {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .order("name")
      if (error) {
        console.error("Fejl: kunne ikke hente artister", error)
      } else {
        setArtists(data)
      }
    }
  }

  useEffect(() => {
    getArtists()
  }, [supabase])

  const handleAddNewSong = async (formdata) => {
    const { data, error } = await supabase
      .from("songs")
      .insert([
        {
          title: formdata.title,
          artist_id: formdata.artist_id,
          content: formdata.content,
        },
      ])
      .select()
      .single()
    if (error) {
      console.error("Fejl: kunne ikke tilføje sang", error)
    } else {
      setCreated(true)
      navigate(`/songs/${data.id}`)
    }
  }

  // Function to handle adding a new artist
  const handleAddNewArtist = async (newArtistName) => {
    const { data, error } = await supabase
      .from("artists")
      .insert([{
          name: newArtistName,
        }
      ])
      .select()
      .single()
      if (error) {
      console.error("Fejl: kunne ikke tilføje artist", error)
    } else {
      setArtists([...artists, data])
    }
  }

  return (
    <ContentWrapper title="Opret ny sang">
      <AdminForm onSubmit={handleSubmit(handleAddNewSong)}>
        <div>
          <label htmlFor="title">Titel:</label>
          <input
            {...register("title", { required: true })}
            type="text"
            id="title"
          />
        </div>
        <div>
          <label htmlFor="title">Tekst:</label>
          <textarea {...register("content", { required: true })} id="content" />
        </div>
        <div>
          <label htmlFor="artist_id">Artist:</label>
          <select {...register("artist_id", { required: true })} id="artist_id">
            <option value="">Vælg artist</option>
            {artists.map((artist) => {
              return (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              )
            })}
          </select>
          <button
            type="button"
            onClick={() => {
              const newArtistName = prompt("Enter the name of the new artist:")
              if (newArtistName) {
                handleAddNewArtist(newArtistName)
              }
            }}
          >
            Add New Artist
          </button>
        </div>
        <button type="submit">Gem</button>
      </AdminForm>
    </ContentWrapper>
  )
}
