import { api } from "../api/apiconfig";

export const getSongs = async () => {
  try {
    const response = await api.get("/songs/getSongs");
    return response.data;
  } catch (error) {
    console.log("Error fetching songs:", error);
  }
};

export const uploadSong = async (file, category) => {
  try {
    const formData = new FormData();
    formData.append("song", file);
    formData.append("category", category);

    const response = await api.post("songs/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLikedSongs = async () => {
  try {
    const response = await api.get("/songs/getLikedSongs");
    return response.data;
  } catch (error) {
    console.log("Error fetching liked songs:", error);
  }
};

export const likeSong = async (songId) => {
  try {
    const response = await api.post("/songs/like", { songId });
    return response.data;
  } catch (error) {
    console.log("Error liking song:", error);
  }
};
