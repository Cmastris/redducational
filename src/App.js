import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { allSubreddits } from "./data/subreddits";
import { addSubreddit } from "./features/postListings/postListingsSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // Load array of source subreddit names into state
    allSubreddits.forEach(subreddit => {
      dispatch(addSubreddit({ name: subreddit }));
    });
  }, []);

  return (
    <div className="App">
      Hello World!
    </div>
  );
}

export default App;
