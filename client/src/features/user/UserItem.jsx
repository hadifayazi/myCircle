import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useFollowMutation } from "../../app/api/authApi";

const UserItem = ({ user }) => {
  const [isFollowed, setIsFollowed] = useState(user.is_followed);
  const [follow] = useFollowMutation();

  const handleClick = async () => {
    try {
      await follow(user.username);
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  return (
    <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center">
      <img src={user.avatar} width={50} height={50} className="rounded-full" />
      <div className="ml-4 leading-5 group">
        <h4 className="font-bold group-hover:underline">
          <Link to={`profile/user/${user.username}`}>{user.username}</Link>
        </h4>
        <h5 className="text-gray-500 text-[15px]">@{user.username}</h5>
      </div>
      <button
        onClick={handleClick}
        className={`ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5 ${
          isFollowed ? "bg-gray-300" : ""
        }`}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
