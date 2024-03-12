import PropTypes from "prop-types";
import UserItem from "../features/user/UserItem";
const SearchResultItem = ({ data, isLoading, isError, error }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-[#d9d9d9] space-y-3 bg-[#202327] rounded-xl w-11/12 xl:w-9/12">
      {data && data.length > 0 ? (
        data.map((user) => <UserItem key={user.username} user={user} />)
      ) : (
        <div>No results found.</div>
      )}
    </div>
  );
};

SearchResultItem.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default SearchResultItem;
