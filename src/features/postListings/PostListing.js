import { useSelector } from "react-redux";

import { selectListingsLoadedStatus } from "./postListingsSlice";
import { selectListing } from "./postListingsSlice";

export default function PostListings({ name }) {

  const listingsLoaded = useSelector(selectListingsLoadedStatus);
  const listing = useSelector(state => selectListing(state, name));

  function generatePosts() {
    
    const postIds = listing.postIds;
    // TODO: generate filtered category postIds
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