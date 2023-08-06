import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdChatBubbleOutline, MdArrowUpward } from "react-icons/md";

import { selectPost } from "./postContentSlice";
import utilStyles from "../../App/utils.module.css";
import styles from "./PostListingItem.module.css";

export default function PostListingItem({ id }) {

  const post = useSelector(state => selectPost(state, id));
  return (
    <article className={styles.listing}>
      <Link className={styles.link} to={post.commentsPath}>
        <div className={styles.content}>
          <div className={`${styles.detailRow} ${utilStyles.orange}`}>
            <div>r/{post.subreddit}</div>
            <div className={styles.divider}>|</div>
            <div>{post.category}</div>
          </div>
          <h3>{post.title}</h3>
          <div className={`${styles.detailRow} ${utilStyles.darkGrey}`}>
            <MdArrowUpward className={styles.icon} size={24} />
            <div className={styles.marginRight}>{post.upvotes} upvotes</div>
            <div className={styles.comments}>
              <MdChatBubbleOutline className={`${styles.icon} ${styles.chatIcon}`} size={24} />
              <div>{post.commentCount} comments</div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}