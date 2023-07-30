import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { selectAllPosts } from "../postContent/postContentSlice";
import { selectListingsLoadedStatus } from "./postListingsSlice";
import { selectListing } from "./postListingsSlice";

export default function PostListings({ name, search }) {

  const listingsLoaded = useSelector(selectListingsLoadedStatus);
  const listing = useSelector(state => selectListing(state, name));
  const mainListing = useSelector(state => selectListing(state, "All"));
  const postsContent = useSelector(selectAllPosts);
  const [queryParams, setQueryParams] = useSearchParams();

  function getFilteredPostIds() {
    const allPostIds = mainListing.postIds;

    if (search) {
      const query = queryParams.get("q");
      if (!query) {
        return allPostIds;
      }

      const lowerCaseQuery = queryParams.get("q").toLowerCase();
      const searchPostIds = allPostIds.filter(postId => {
        // Post's title or subreddit name includes the search term (case-insensitive)
        const lowerCaseTitle = postsContent[postId].title.toLowerCase();
        const lowerCaseSub = postsContent[postId].subreddit.toLowerCase();
        return (lowerCaseTitle.includes(lowerCaseQuery) ||
                lowerCaseSub.includes(lowerCaseQuery));
      });

      return searchPostIds;

    } else {
      const listingSubs = listing.includedSubs;
      const categoryPostIds = allPostIds.filter(postId => {
        // Post's subreddit is within listing's included subreddits
        const postSub = postsContent[postId].subreddit;
        return listingSubs.includes(postSub);
      });

      return categoryPostIds;
    }
  }

  function generatePosts() {

    const postIds = (name === "All") ? mainListing.postIds : getFilteredPostIds();
    if (postIds.length === 0) {
      return <p>Sorry, no posts available.</p>
    }

    // TODO: return `PostListingItem` components
    const posts = postIds.slice(0, 24).map(id => <li key={id}>{id}</li>);
    return <ul>{posts}</ul>;
  }

  return (
    <div>
      <h2>{name}</h2>
      {listingsLoaded ? generatePosts() : <p>Loading posts...</p>}
    </div>
  );
}