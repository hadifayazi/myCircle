import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSearchUsersQuery } from "../app/api/authApi";
import SearchResultItem from "./SearchResultItem";
import { Link } from "react-router-dom";
import Recommendation from "./Recommendation";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useSearchUsersQuery(searchQuery);

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <IoIosSearch className="text-gray-500 h-5 z-50" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none mt-2 text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:outline-none rounded-full focus:shadow-lg"
            placeholder="Search "
          />
        </div>
      </div>

      {users?.length > 0 && (
        <div>
          <SearchResultItem
            data={users.slice(0, 5)}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
          {users.length > 5 && (
            <Link
              to="/more-results"
              className="block text-[#1d9bf0] font-light text-center py-3"
            >
              Show more results
            </Link>
          )}
        </div>
      )}
      <>
        <h4>Maybe you want to follow?</h4>
        <Recommendation />
      </>
    </div>
  );
};

export default Search;
