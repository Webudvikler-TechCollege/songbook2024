import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useSupabase } from "../../Providers/SupabaseProvider"
import { AdminForm } from "../../Styled/Admin.style"
import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper"
import { Link, useNavigate, useParams } from "react-router-dom"

export const SongUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [artists, setArtists] = useState([])
  const { supabase } = useSupabase()
  const { record_id } = useParams()
  const [song, setSong] = useState({})
  const [loading, setLoading] = useState(true)
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

  const getSong = async () => {
    if (supabase) {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("id", record_id)
        .single()
      if (error) {
        console.error("Fejl: kunne ikke hente sang", error)
      } else {
        setSong(data)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    getArtists()
    getSong()
  }, [supabase, record_id])

  const handleUpdateSong = async (formdata) => {
    const { data, error } = await supabase
      .from("songs")
      .update({
        title: formdata.title,
        artist_id: formdata.artist_id,
        content: formdata.content,
      })
      .eq("id", record_id)
    if (error) {
      console.error("Fejl: kunne ikke opdatere sangen", error)
    } else {
      setSong({ ...song, title: formdata.title, artist_id: formdata.artist_id, content: formdata.content })
      navigate(`/songs/${record_id}`)
    }
  }

  if (loading) {
    return <div>Loading...</div> // Display loading indicator
  }

  return (
    <ContentWrapper title="Rediger sang">
      <AdminForm onSubmit={handleSubmit(handleUpdateSong)}>
        <div>
          <label htmlFor="title">Titel:</label>
          <input
            {...register("title", { required: true })}
            defaultValue={song.title}
            type="text"
            id="title"
          />
        </div>
        <div>
          <label htmlFor="title">Tekst:</label>
          <textarea
            {...register("content", { required: true })}
            id="content"
            defaultValue={song.content}
          />
        </div>
        <div>
          <label htmlFor="artist_id">Artist:</label>
          <select
            {...register("artist_id", { required: true })}
            id="artist_id"
            value={song.artist_id}
            onChange={(e) => setSong({...song, artist_id: e.target.value})}
          >
            {artists.map((artist) => {
              return (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              )
            })}
          </select>
        </div>
        <button type="submit">Gem</button>
        <Link className="button" to={`/admin/songs/delete/${record_id}`}>
          Slet sang
        </Link>
      </AdminForm>
    </ContentWrapper>
  )
}
