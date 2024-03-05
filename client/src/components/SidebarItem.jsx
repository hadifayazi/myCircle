import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SidebarItem = ({ Icon, text, link }) => {
  return (
    <Link to={link}>
      <div className="rounded-full text-xl p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer">
        {Icon}
        <span className="hidden md:inline lg:inline xl:inline ml-2">
          {text}
        </span>
        {/* <button className="hidden md:inline lg:inline xl:inline ml-2i bg-sky-300 ml-2 rounded-full text-black w-8 h-8"></button> */}
      </div>
    </Link>
  );
};

SidebarItem.propTypes = {
  Icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default SidebarItem;
