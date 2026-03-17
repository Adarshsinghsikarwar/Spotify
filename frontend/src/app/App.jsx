import { RouterProvider } from "react-router";
import { router } from "./routes/app.route";
import { AuthProvider } from "../context/Auth.context";
import { SongProvider } from "../context/song.context";
import { PlaylistProvider } from "../context/Playlist.context";
const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <PlaylistProvider>
          <RouterProvider router={router} />
        </PlaylistProvider>
      </SongProvider>
    </AuthProvider>
  );
};

export default App;
