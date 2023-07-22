import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { allSubreddits } from "./data/subreddits";
import { addSubreddit, selectSubreddits, changeSubsLoadedStatus, selectSubsLoadedStatus } from "./features/postListings/postListingsSlice";
import { fetchSubTopPosts } from "./redditAPI";

function App() {

  const dispatch = useDispatch();
  const subsLoaded = useSelector(selectSubsLoadedStatus);

  useEffect(() => {
    // Load array of source subreddit names into state
    allSubreddits.forEach(subreddit => {
      dispatch(addSubreddit({ name: subreddit }));
    });
    dispatch(changeSubsLoadedStatus({ loaded: true }))
  }, []);

  const subreddits = useSelector(selectSubreddits);

  useEffect(() => {
    // Fetch post listing data for a subreddit
    // https://react.dev/reference/react/useEffect#fetching-data-with-effects
    async function fetchSubData() {
      if (subsLoaded) {
        const sub = subreddits['science'];
        try {
          const json = await fetchSubTopPosts(sub.name, 'day');
          console.log(json);
          // TODO: Dispatch post data to store
          // TODO: Change sub `postsRetrieved` to true
          // TODO: Create array of post IDs
        } catch(e) {
          console.log(e);
        }
      }
    }
    fetchSubData();
  }, [subsLoaded]);

  return (
    <div className="App">
      Hello World!
    </div>
  );
}

export default App;
