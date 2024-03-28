import { createContext, useContext, useEffect, useState } from "react";
import { useSupabase } from "./SupabaseProvider";

const SongContext = createContext();

const SongProvider = ({ children }) => {
	const { supabase } = useSupabase()
	const [ songData, setSongData ] = useState([])

	const getData = async () => {
		if (supabase) {
			console.log("fetching songs");
			const { data, error } = await supabase
				.from("songs")
				.select("id, title, content, artists(name)")
			if (error) {
				console.error("Error fetching songs", error)
			} else {
				setSongData(data)
			}
		}
	}

	useEffect(() => {
		getData()
	}, [children, supabase])

	return (
		<SongContext.Provider value={{ songData, setSongData }}>
			{children}
		</SongContext.Provider>
	);
}

const useSongs = () => useContext(SongContext)

export { SongProvider, useSongs }