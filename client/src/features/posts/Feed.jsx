import Spiner from "../../components/Spiner";
import PostItem from "./PostItem";
import { GiScrollQuill } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useGetPostsQuery } from "../../app/api/postsApi";
import { useState, useEffect } from "react";

const Feeds = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, isFetching } = useGetPostsQuery(currentPage);
  const [allPosts, setAllPosts] = useState([]);

  console.log(data);
  useEffect(() => {
    if (data) {
      setAllPosts((prevPosts) => [...prevPosts, ...data.results]);
    }
  }, [data]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (isLoading && !isFetching) {
    return (
      <div>
        <div>Loading...</div>
        <Spiner />
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">
          <div>
            <div className="flex flex-row items-center gap-20">
              <p className="text-white font-semibold text-xl">
                Something on your mind?
              </p>
              <button
                onClick={() => navigate("/new-post")}
                className="bg-cust-btn rounded-full p-2"
              >
                <GiScrollQuill style={{ fontSize: 40 }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {allPosts.map((post) => (
        <PostItem post={post} key={post.id + nanoid()} />
      ))}

      {isFetching && <Spiner />}

      {!isFetching && data?.meta.next && (
        <div className="flex justify-center p-5">
          <button
            onClick={handleNextPage}
            className="bg-cust-btn rounded-full px-20 py-3"
          >
            Show more posts
          </button>
        </div>
      )}
    </>
  );
};

export default Feeds;
