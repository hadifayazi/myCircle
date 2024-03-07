import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchResultItem = ({ data, isLoading, isError, error }) => {
  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (isError) {
    return <div>Error: {error}</div>;
  }

  // Data state
  return (
    <div className="text-[#d9d9d9] space-y-3 bg-[#202327] rounded-xl w-11/12 xl:w-9/12">
      {data && data.length > 0 ? (
        data.map((user) => (
          <div
            key={user.username}
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
          >
            <img
              src={user.avatar}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">
                <Link to={`profile/user/${user.username}`}>
                  {user.username}
                </Link>
              </h4>
              <h5 className="text-gray-500 text-[15px]">@{user.username}</h5>
            </div>
            <button className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
              Follow
            </button>
          </div>
        ))
      ) : (
        <div>No results found.</div>
      )}
    </div>
  );
};

SearchResultItem.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default SearchResultItem;
