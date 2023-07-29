import { useSelector } from "react-redux";

import { selectAllPosts } from "../postContent/postContentSlice";
import { selectListingsLoadedStatus } from "./postListingsSlice";
import { selectListing } from "./postListingsSlice";

export default function PostListings({ name, search }) {

  const listingsLoaded = useSelector(selectListingsLoadedStatus);
  const listing = useSelector(state => selectListing(state, name));
  const mainListing = useSelector(state => selectListing(state, "All"));
  const postsContent = useSelector(selectAllPosts);

  function getFilteredPostIds() {
    const allPostIds = mainListing.postIds;

    if (search) {
      // TODO: return filtered ids based on search query
      return allPostIds;

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