import { createContext, useContext, useEffect, useState } from "react";
import { useSupabase } from "./SupabaseProvider";

const SongContext = createContext();

const SongProvider = ({ children }) => {
	const { supabase } = useSupabase()
	const [ songList, setSongList ] = useState([])

	const getData = async () => {
		if (supabase) {
			console.log("fetching songs");
			const { data, error } = await supabase
				.from("songs")
				.select("id, title, content, artists(id,name)")
			if (error) {
				console.error("Error fetching songs", error)
			} else {
				setSongList(data)
				console.log("songList", songList);
			}
		}
	}

	useEffect(() => {
		getData()
	}, [children, supabase])

	return (
		<SongContext.Provider value={{ songList, setSongList }}>
			{children}
		</SongContext.Provider>
	);
}

const useSongs = () => useContext(SongContext)

export { SongProvider, useSongs }