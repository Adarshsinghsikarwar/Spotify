import { RouterProvider } from "react-router";
import { router } from "./routes/app.route";
import { AuthProvider } from "../context/Auth.context";
import { SongProvider } from "../context/song.context";
const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={router} />
      </SongProvider>
    </AuthProvider>
  );
};

export default App;
