import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Player from "./Player";
import "./MainLayout.css";
const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="main-layout-top">
        <Sidebar />
        <main className="main-content">
          <div className="page-content">
            <Outlet />
          </div>
        </main>
      </div>
      <Player />
    </div>
  );
};


export default MainLayout;
