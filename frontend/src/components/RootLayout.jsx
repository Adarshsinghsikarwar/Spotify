import { Outlet } from "react-router";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
