import { createBrowserRouter } from "react-router";
import Login from "../../pages/login";
import Register from "../../pages/Register";
import Home from "../../pages/Home";
import UploadSong from "../../pages/UploadSong";
import MainLayout from "../../components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "upload",
        element: <UploadSong />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
  },
]);
