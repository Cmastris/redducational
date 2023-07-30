import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectPost } from "./postContentSlice";

export default function PostListingItem({ id }) {

  const post = useSelector(state => selectPost(state, id));
  return (
    <article>
      <Link to={post.commentsPath}>
        <div>
          <div>r/{post.subreddit}</div>
          <div>{post.category}</div>
        </div>
        <h3>{post.title}</h3>
        <div>
          <div>{post.upvotes} upvotes</div>
          <div>{post.commentCount} comments</div>
        </div>
      </Link>
    </article>
  );
}