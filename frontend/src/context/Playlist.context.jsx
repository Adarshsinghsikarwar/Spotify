import { createContext, useState, useContext, useEffect } from "react";
import { getPlaylists, createPlaylist as createPlaylistApi, deletePlaylist as deletePlaylistApi, addSongToPlaylist as addSongToPlaylistApi } from "../services/playlist.api";
import { AuthContext } from "./Auth.context";

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchPlaylists = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await getPlaylists();
      if (response && response.playlists) {
        setPlaylists(response.playlists);
      }
    } catch (error) {
      console.error("Error in PlaylistProvider fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPlaylist = async (playlistData) => {
    try {
      const response = await createPlaylistApi(playlistData);
      if (response && response.playlist) {
        setPlaylists((prev) => [...prev, response.playlist]);
        return response.playlist;
      }
    } catch (error) {
      console.error("Error adding playlist:", error);
    }
  };

  const removePlaylist = async (id) => {
    try {
      await deletePlaylistApi(id);
      setPlaylists((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error removing playlist:", error);
    }
  };

  const addSongToExistingPlaylist = async (playlistId, songId) => {
    try {
      const response = await addSongToPlaylistApi(playlistId, songId);
      if (response && response.playlist) {
         setPlaylists((prev) => prev.map(p => p._id === playlistId ? response.playlist : p));
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [user]);

  return (
    <PlaylistContext.Provider value={{ 
        playlists, 
        loading, 
        fetchPlaylists, 
        addPlaylist, 
        removePlaylist,
        addSongToExistingPlaylist
    }}>
      {children}
    </PlaylistContext.Provider>
  );
};
