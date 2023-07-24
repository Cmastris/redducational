import reducer from "./postContentSlice";
import { initialState } from "./postContentSlice";
import { addPost } from "./postContentSlice";

describe('postListingsSlice', () => {

  test('addPost adds a subreddit to the initial state', () => {
    const payload = { id: "id1", title: 'post title' };
    expect(reducer(initialState, addPost(payload))).toEqual({
      ...initialState,
      posts: { id1: payload }
    });
  });
});