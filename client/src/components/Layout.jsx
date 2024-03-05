import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Search from "./Search";

const Layout = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="shrink w-14 sm:w-14 md:w-64 lg:w-[350px] xl:w-[350px] ">
          <Sidebar />
        </div>
        <div className="shrink w-[500px] pr-6">
          <Outlet />
        </div>
        <div className="shrink w-5 sl:w-64 md:w-64 lg:2-[450pw] xl:w-[450px]">
          <Search />
        </div>
      </div>
    </>
  );
};

export default Layout;
