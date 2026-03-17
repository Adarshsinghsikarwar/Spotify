import { api } from "../api/apiconfig";

export const getPlaylists = async () => {
  try {
    const response = await api.get("/playlists");
    return response.data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
  }
};

export const createPlaylist = async (playlistData) => {
  try {
    const response = await api.post("/playlists", playlistData);
    return response.data;
  } catch (error) {
    console.error("Error creating playlist:", error);
  }
};

export const getPlaylistById = async (id) => {
  try {
    const response = await api.get(`/playlists/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }
};

export const addSongToPlaylist = async (playlistId, songId) => {
  try {
    const response = await api.put(`/playlists/${playlistId}/add-song`, { songId });
    return response.data;
  } catch (error) {
    console.error("Error adding song to playlist:", error);
  }
};

export const deletePlaylist = async (id) => {
  try {
    const response = await api.delete(`/playlists/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting playlist:", error);
  }
};
