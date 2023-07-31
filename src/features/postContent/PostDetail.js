import { useEffect } from "react";
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
    if (listingsLoaded && (currentPath !== post.commentsPath)) {
      navigate(post.commentsPath);
    }
  }, [listingsLoaded, currentPath, navigate, post]);

  return (
    <main>
      Post Detail
    </main>
  );
}