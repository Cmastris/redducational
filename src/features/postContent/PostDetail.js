import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Comment from "./Comment";
import { fetchPostCommentData } from "./postContentSlice";
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

  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch comments data
    if (post && listingsLoaded && !post.commentsStatus) {
      dispatch(fetchPostCommentData(
        { commentsPath: post.commentsPath, postId: post.id }
      ));
    }
  }, [post, listingsLoaded, dispatch]);

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

  function renderComments() {
    if (!post) {
      return;
    }
    const redditURL = `https://www.reddit.com${post.commentsPath}`;
    const redditLink = <div><a href={redditURL} target="_blank" rel="noreferrer">View all comments on Reddit</a></div>;
    
    let comments = <p>Loading comments...</p>;
    if (post.commentsStatus === "fulfilled") {
      comments = post.comments.map(comment => <Comment key={comment.id} comment={comment} />);
    } else if (post.commentsStatus === "rejected") {
      comments = <p>Sorry, comments couldn't be loaded.</p>;
    }
    return (
      <div>
        {redditLink}
        {comments}
      </div>
    );
  }

  return (
    <div>
      {!listingsLoaded ? <p>Loading post...</p> : renderMainContent()}
      <h3>Comments</h3>
      {!listingsLoaded ? <p>Loading comments...</p> : renderComments()}
    </div>
  );
}