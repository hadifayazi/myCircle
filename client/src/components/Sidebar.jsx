import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { RiHome7Fill } from "react-icons/ri";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="space-y-2.5  mt-3 mb-2.5 xl:ml-24">
        <SidebarItem
          link="/home"
          text="Home"
          Icon={<RiHome7Fill size={28} />}
        />
        <SidebarItem
          link="/profile"
          text="Profile"
          Icon={<BsPersonFill size={28} />}
        />
        <SidebarItem
          link="/contacts"
          text="Chat"
          Icon={<HiOutlineEnvelope size={28} />}
        />
        <SidebarItem
          link="/notif"
          text="Notifications"
          Icon={<IoIosNotificationsOutline size={28} />}
        />
        <button
          className="ml-1 rounded-full text-xl p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer"
          onClick={logout}
        >
          <BiLogOutCircle size={28} />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
