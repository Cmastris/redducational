import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { fetchPostCommentData } from "./postContentSlice";
import { selectPost } from "./postContentSlice";
import { selectListingsLoadedStatus } from "../postListings/postListingsSlice";

import Comment from "./Comment";
import ExternalLink from "../../components/ExternalLink/ExternalLink";
import MarkdownLinkRenderer from "./MarkdownLinkRenderer";
import styles from "./PostDetail.module.css";

export default function PostDetail({ gridArea }) {
  
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
        <div className={styles.postHeader}>
          <div className={styles.detailRow}>
            <div>r/{post.subreddit}</div>
            <div className={styles.divider}>|</div>
            <div>{post.category}</div>
          </div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.mainContent}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          {post.isSelfPost ? (
            <div className={styles.offBlack}>
              <ReactMarkdown components={{a: MarkdownLinkRenderer}}>{post.selfText}</ReactMarkdown>
            </div>
          ) : (
            <div className={styles.postLink}>
              <ExternalLink anchor="Visit external link" href={post.link} />
            </div>
          )}
        </div>
      </section>    
    ) : <p>Sorry, this post couldn't be loaded.</p>;
  }

  function renderComments() {
    if (!post) {
      return;
    }
    const redditURL = `https://www.reddit.com${post.commentsPath}`;
    const redditLink = <ExternalLink anchor="View all comments" href={redditURL} />;
    
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
    <div style={{gridArea}} className={styles.postDetail}>
      {!listingsLoaded ? <p>Loading post...</p> : renderMainContent()}
      <section>
        <h3>Comments</h3>
        {!listingsLoaded ? <p>Loading comments...</p> : renderComments()}
      </section>
    </div>
  );
}
