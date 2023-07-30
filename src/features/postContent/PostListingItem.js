import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectPost } from "./postContentSlice";

export default function PostListingItem({ id }) {

  const post = useSelector(state => selectPost(state, id));
  return (
    <article>
      <Link to={post.commentsPath}>
        <div>{post.subreddit}</div>
        <h3>{post.title}</h3>
        <div>
          <div>{post.upvotes}</div>
          <div>{post.commentCount}</div>
        </div>
      </Link>
    </article>
  );
}