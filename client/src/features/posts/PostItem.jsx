import { AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PostItem = ({ post }) => {
  return (
    <div key={post.id}>
      <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
        <div className="flex flex-row items-start gap-3">
          <img className="h-11 w-11 rounded-full" src={post.avatar} />

          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold cursor-pointer hover:underline">
                <Link to={`${post.user}`}>{post.user}</Link>
              </p>

              <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                @{post.user}
              </span>

              <span className="text-neutral-500 text-sm">
                {new Date(post.created_at).toDateString().slice(4)}
              </span>
            </div>

            <Link to={`tweet/${post.id}`}>
              <div className="text-white mt-1 text-start">{post.content}</div>
            </Link>

            <img src={post.image} />

            <div className="flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <Link to={`post/${post.id}`}>
                  <AiOutlineMessage size={20} />
                </Link>
              </div>

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
                <p>{post.retweets_count}</p>
              </div>

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <p>{post.likes_count}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
