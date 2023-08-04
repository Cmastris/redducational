import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { selectPost } from "./postContentSlice";
import { selectListingsLoadedStatus } from "../postListings/postListingsSlice";

export default function PostDetail() {
  
  const { id } = useParams();
  const listingsLoaded = useSelector(selectListingsLoadedStatus);
  const post = useSelector(state => selectPost(state, id));
  
  // Redirect non-canonical matched paths to `post.commentsPath`
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (post && listingsLoaded && (currentPath !== post.commentsPath)) {
      navigate(post.commentsPath);
    }
  }, [listingsLoaded, currentPath, navigate, post]);

  function renderMainContent() {
    return post ? (
      <section>
        <div>
          <div>r/{post.subreddit}</div>
          <div>{post.category}</div>
        </div>
        <h2>{post.title}</h2>
        {post.isSelfPost ? <div><ReactMarkdown>{post.selfText}</ReactMarkdown></div> :
        <div><a href={post.link} target="_blank" rel="noreferrer">Visit external link</a></div>}
      </section>    
    ) : <p>Sorry, this post couldn't be loaded.</p>;
  }

  return (
    <div>
      {!listingsLoaded ? <p>Loading post...</p> : renderMainContent()}
    </div>
  );
}