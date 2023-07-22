import reducer, { initialState, addSubreddit, addListing } from "./postListingsSlice";

describe('postListingsSlice', () => {

  test('addSubreddit adds a subreddit to the initial state', () => {
    expect(reducer(initialState, addSubreddit({ name: "Sub1" }))).toEqual({
      ...initialState,
      subreddits: { Sub1: { name: "Sub1", postsRetrieved: false } }
    });
  });

  test('addSubreddit adds a subreddit to a populated subreddits object', () => {
    const prevState = { subreddits: { Sub1: { name: "Sub1", postsRetrieved: false } } };
    expect(reducer(prevState, addSubreddit({ name: "Sub2" }))).toEqual({
      subreddits: {
        Sub1: { name: "Sub1", postsRetrieved: false },
        Sub2: { name: "Sub2", postsRetrieved: false }
      }
    });
  });

  test('addListing adds a listing to the initial state', () => {
    const listing = { name: "All", path: "", postIds: [1, 2, 3] };
    expect(reducer(initialState, addListing(listing))).toEqual({
      ...initialState,
      listings: { "All": listing }
    });
  });

  test('addListing adds a listing to a populated listings object', () => {
    const prevListing = { name: "All", path: "", postIds: [1, 2, 3] };
    const prevState = { listings: { "All": prevListing } };
    const newListing = { name: "Cat 1", path: "cat-1", postIds: [1, 3] };

    expect(reducer(prevState, addListing(newListing))).toEqual({
      listings: {
        "All": prevListing,
        "Cat 1": newListing
      }
    });
  });
});