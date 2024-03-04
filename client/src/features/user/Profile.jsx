import { useGetUserQuery } from "../../app/api/authApi";
import Spiner from "../../components/Spiner";

const Profile = () => {
  const { data, isError, error, isLoading, isSuccess } =
    useGetUserQuery("mike");
  if (isLoading) return <Spiner />;
  if (isError) {
    console.log(error);
  }
  if (isSuccess) {
    console.log(data);
  }
  return <div>Profile</div>;
};

export default Profile;
