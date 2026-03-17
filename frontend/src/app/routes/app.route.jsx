import { createBrowserRouter } from "react-router";
import Login from "../../pages/login";
import Register from "../../pages/Register";
import Home from "../../pages/Home";
import UploadSong from "../../pages/UploadSong";
import Search from "../../pages/Search";
import Library from "../../pages/Library";
import LikedSongs from "../../pages/LikedSongs";
import CreatePlaylist from "../../pages/CreatePlaylist";
import MainLayout from "../../components/MainLayout";
import RootLayout from "../../components/RootLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "library",
            element: <Library />,
          },
          {
            path: "liked",
            element: <LikedSongs />,
          },
          {
            path: "create-playlist",
            element: <CreatePlaylist />,
          },
          {
            path: "upload",
            element: <UploadSong />,
          },

        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
  },
]);


