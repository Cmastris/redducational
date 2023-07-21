import reducer, { initialState, addSubreddit } from "./postListingsSlice";

describe('postListingsSlice', () => {

  test('addSubreddit adds a subreddit to the initial state', () => {
    expect(reducer(initialState, addSubreddit({ name: "Sub1" }))).toEqual(
      { subreddits: { Sub1: { name: "Sub1", postsRetrieved: false } }, listings: {} }
    )
  });

  test('addSubreddit adds a subreddit to a populated subreddit object', () => {
    const prevState = { subreddits: { Sub1: { name: "Sub1", postsRetrieved: false } }, listings: {} };
    expect(reducer(prevState, addSubreddit({ name: "Sub2" }))).toEqual({
      subreddits: {
        Sub1: { name: "Sub1", postsRetrieved: false },
        Sub2: { name: "Sub2", postsRetrieved: false }
      },
      listings: {}
    })
  });
});