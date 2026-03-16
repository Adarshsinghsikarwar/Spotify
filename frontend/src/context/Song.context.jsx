import { createContext, useState, useEffect } from "react";
import { useSongs } from "../hooks/useSongs";

export const SongContext = createContext();

const SongLoader = ({ children }) => {
  const { fetchSongs } = useSongs();

  useEffect(() => {
    fetchSongs();
  }, []);

  return <>{children}</>;
};

export const SongProvider = ({ children }) => {
  const [songData, setSongData] = useState([]);

  return (
    <SongContext.Provider value={{ songData, setSongData }}>
      <SongLoader>{children}</SongLoader>
    </SongContext.Provider>
  );
};
