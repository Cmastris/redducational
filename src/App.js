import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { allSubreddits } from "./data/subreddits";
import { addSubreddit, changeSubsLoadedStatus, selectSubsLoadedStatus } from "./features/postListings/postListingsSlice";
import { fetchListingsData } from "./features/postListings/postListingsSlice";

function App() {

  const dispatch = useDispatch();
  const subsLoaded = useSelector(selectSubsLoadedStatus);

  useEffect(() => {
    // Load array of source subreddit names into state
    allSubreddits.forEach(subreddit => {
      dispatch(addSubreddit({ name: subreddit }));
    });
    dispatch(changeSubsLoadedStatus({ loaded: true }));
  }, []);

  useEffect(() => {
    // Fetch post listings data
    if (subsLoaded) {
      dispatch(fetchListingsData());
    }
  }, [subsLoaded]);

  return (
    <div className="App">
      Hello World!
    </div>
  );
}

export default App;
