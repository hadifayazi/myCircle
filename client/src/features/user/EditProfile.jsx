import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useUpdateProfileMutation } from "../../app/api/authApi";
import Spiner from "../../components/Spiner";

const EditProfile = ({ user, close }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);
  const [coverImage, setCoverImage] = useState(user.cover_image);

  const [updateProfile, { data, isLoading, isSuccess }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess, data, close]);
  if (isLoading) return <Spiner />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("username", username);
    if (avatar) {
      if (avatar instanceof File) {
        formData.append("avatar", avatar, avatar.name);
      } else {
        console.error("Invalid avatar file");
      }
    }

    if (coverImage instanceof File) {
      formData.append("cover_image", coverImage, coverImage.name);
    } else {
      console.error("Invalid cover image file");
    }

    try {
      await updateProfile(formData);
    } catch (error) {
      console.log(error);
      console.log("Couldn't update profile", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#202327] h-[700px] w-[600px] rounded-md">
        <button onClick={close}>
          <AiOutlineCloseCircle className="text-white text-2xl absolute top-3 right-3 cursor-pointer" />
        </button>

        <div className="flex min-h-full items-center justify-center sm:px-6 lg:px-8">
          <div className="m-1 p-1 ">
            <div className="w-[300px]  max-w-md space-y-8 md:w-[400px] lg:w-[400px]">
              <div>
                <h2 className="mt-6 text-center text-3xl text-grey">
                  Edit Profile
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  id="bio"
                  name="bio"
                  placeholder="About you"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="
                  border-b-[1px] 
                  border-neutral-800 
                  w-full
                  p-5 
                  cursor-pointer 
                  my-3
                  bg-transparent outline-neutral-800 
                  "
                />
                <input
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="
                  border-b-[1px] 
                  border-neutral-800 
                  w-full
                  p-5 
                  cursor-pointer 
                  my-3
                  bg-transparent outline-neutral-800 
                  "
                />
                <input
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                  border-b-[1px] 
                  border-neutral-800 
                  w-full
                  p-5 
                  cursor-pointer 
                  my-3
                  bg-transparent outline-neutral-800 
                  "
                />

                <input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                  border-b-[1px] 
                  border-neutral-800 
                  w-full
                  p-5 
                  cursor-pointer 
                  my-3
                  bg-transparent outline-neutral-800 
                  "
                />

                <input
                  className="my-4"
                  type="file"
                  name="avatar"
                  onChange={(event) => setAvatar(event.target.files[0])}
                />

                <input
                  className="my-3"
                  type="file"
                  name="cover_image"
                  onChange={(event) => setCoverImage(event.target.files[0])}
                />

                <button
                  type="submit"
                  className="bg-sky-700 mt-11  my-2 w-full hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold"
                >
                  Save Changes
                </button>
              </form>

              <div className="flex items-center justify-between">
                <div className="text-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  close: PropTypes.func,
};

export default EditProfile;
