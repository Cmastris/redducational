import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { allSubreddits } from "./data/subreddits";
import { addSubreddit, changeStaticDataLoadedStatus, selectStaticDataLoadedStatus } from "./features/postListings/postListingsSlice";
import { fetchListingsData } from "./features/postListings/postListingsSlice";

function App() {

  const dispatch = useDispatch();
  const staticDataLoaded = useSelector(selectStaticDataLoadedStatus);

  useEffect(() => {
    // Load array of source subreddit names into state
    allSubreddits.forEach(subreddit => {
      dispatch(addSubreddit({ name: subreddit }));
    });
    dispatch(changeStaticDataLoadedStatus({ loaded: true }));
  }, [dispatch]);

  useEffect(() => {
    // Fetch post listings data
    if (staticDataLoaded) {
      dispatch(fetchListingsData());
    }
  }, [staticDataLoaded, dispatch]);

  return (
    <div className="App">
      Hello World!
    </div>
  );
}

export default App;
