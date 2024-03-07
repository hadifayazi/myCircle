import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoMdCalendar } from "react-icons/io";
import { useGetProfileQuery, useGetUserQuery } from "../../app/api/authApi";
import Spiner from "../../components/Spiner";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { getLocalUsername } from "../../app/services/tokenDecode";

const Profile = () => {
  const { username: profileUsername } = useParams();
  const loggedInUsername = getLocalUsername(
    localStorage.getItem("accessToken")
  );
  const isNotEmptyObject = (obj) => {
    return obj && Object.keys(obj).length !== 0;
  };

  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState(null);

  const { data: userData, isLoading, isError } = useGetProfileQuery();

  // Only make the API call when there are params
  const {
    data: retrivedUserData,
    isLoading: isLoadingRetrivrdUser,
    isError: isErrorRetrivedUser,
    error: errorRetrivedUser,
  } = useGetUserQuery(isNotEmptyObject(profileUsername) ? profileUsername : "");

  useEffect(() => {
    if (isNotEmptyObject(profileUsername)) {
      if (retrivedUserData) {
        setUser(retrivedUserData);
      }
    } else if (userData) {
      setUser(userData);
    }
  }, [userData, retrivedUserData, profileUsername]);

  if (isLoading || isLoadingRetrivrdUser) return <Spiner />;
  if (isError) return <div>Error</div>;
  if (isNotEmptyObject(profileUsername) && isErrorRetrivedUser)
    return <div>{errorRetrivedUser}</div>;

  const isOwnProfile =
    loggedInUsername &&
    loggedInUsername.toLowerCase() === user?.username?.toLowerCase();

  return (
    <>
      {isEdit && isOwnProfile && (
        <EditProfile user={user} close={() => setIsEdit(false)} />
      )}

      {user && (
        <>
          <div className="border-b-[1px] border-neutral-800 p-5">
            <div className="flex flex-row items-start gap-3">
              <div>
                <div className="flex flex-row items-center gap-2">
                  <Link to={"/"}>
                    <AiOutlineArrowLeft
                      size={20}
                      className="mr-4 hover:text-slate-200 text-slate-500 cursor-pointer"
                    />
                  </Link>
                  <p className="text-white font-semibold text-xl">
                    {user.username}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <img
            className="bg-black h-[250px] w-full"
            src={user.cover_image}
            alt="cover"
          />

          <div className="flex justify-between">
            <img
              src={user.avatar}
              className="w-40 h-40 ml-3 object-cover border-8 border-black -mt-20 shadow-2xl rounded-full"
              alt="avatar"
            />

            <div>
              {isOwnProfile && (
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-sky-500 mr-7 text-white font-semibold rounded-full px-7 py-3 mt-3 ml-3 hover:bg-sky-600 transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          <p className="text-start ml-4 mt-4 text-xl font-bold ">
            {user.username}
          </p>

          <div className="text-white text-start ml-4">
            <span className="text-neutral-500 hidden md:block">
              @{user.username}
            </span>

            <div className="flex gap-3 w-full p-2 text-neutral-500">
              <IoMdCalendar className="mt-1 mb-3" size={20} />
              Joined {new Date(user.date_joined).toDateString().slice(4)}
            </div>

            <div className="flex gap-3 w-full p-2 text-neutral-500">
              <span className="text-white">{user.followers}</span> Followers{" "}
              <span className="text-white">{user.following}</span> Following
            </div>
            <div className="flex gap-3 w-full p-2 text-neutral-500">
              {user.bio}
            </div>
          </div>

          <div className="border-b-[1px] border-neutral-800 grid grid-cols-4 gap-4">
            <button className="p-5 cursor-pointer hover:bg-neutral-900 transition">
              Tweets
            </button>

            <button className="p-5 cursor-pointer hover:bg-neutral-900 transition">
              Retweets
            </button>

            <button className="p-5 cursor-pointer hover:bg-neutral-900 transition">
              Media
            </button>

            <button className="p-5 cursor-pointer hover:bg-neutral-900 transition">
              Likes
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
