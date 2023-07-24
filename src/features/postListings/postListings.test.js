import reducer from "./postListingsSlice";
import { initialState } from "./postListingsSlice";
import { addSubreddit, changeSubsLoadedStatus, changeSubRetrievedStatus } from "./postListingsSlice";
import { addListing, changeListingsLoadedStatus } from "./postListingsSlice";
import { generateOrderedPostIds } from "./postListingsSlice";

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

  test('changeSubsLoadedStatus changes state to true', () => {
    expect(reducer(initialState, changeSubsLoadedStatus({ loaded: true }))).toEqual({
      ...initialState,
      subsLoaded: true
    });
  });

  test('changeSubRetrievedStatus changes state to true', () => {
    const prevState = { subreddits: { Sub1: { name: "Sub1", postsRetrieved: false } } };
    const payload = { name: "Sub1", retrieved: true };
    expect(reducer(prevState, changeSubRetrievedStatus(payload))).toEqual({
      subreddits: { Sub1: { name: "Sub1", postsRetrieved: true } }
    });
  });

  test('addListing adds a listing to the initial state', () => {
    const listing = { name: "All", path: "", includedSubs: ['a', 'b', 'c'], postIds: [1, 2, 3] };
    expect(reducer(initialState, addListing(listing))).toEqual({
      ...initialState,
      listings: { "All": listing }
    });
  });

  test('addListing adds a listing to a populated listings object', () => {
    const prevListing = { name: "All", path: "", includedSubs: ['a', 'b', 'c'], postIds: [1, 2, 3] };
    const prevState = { listings: { "All": prevListing } };
    const newListing = { name: "Cat 1", path: "cat-1", includedSubs: ['a', 'c'], postIds: [1, 3] };

    expect(reducer(prevState, addListing(newListing))).toEqual({
      listings: {
        "All": prevListing,
        "Cat 1": newListing
      }
    });
  });

  test('changeListingsLoadedStatus changes state to true', () => {
    expect(reducer(initialState, changeListingsLoadedStatus({ loaded: true }))).toEqual({
      ...initialState,
      listingsLoaded: true
    });
  });

  test('generateOrderedPostIds alternately merges 2 arrays of equal length', () => {
    const arr1 = ['1', '2', '3'];
    const arr2 = ['4', '5', '6'];
    const expected = ['1', '4', '2', '5', '3', '6'];
    expect(generateOrderedPostIds([arr1, arr2])).toEqual(expected);
  });

  test('generateOrderedPostIds alternately merges 2 arrays of unequal length', () => {
    const arr1 = ['1', '2'];
    const arr2 = ['3', '4', '5'];
    const expected = ['1', '3', '2', '4', '5'];
    expect(generateOrderedPostIds([arr1, arr2])).toEqual(expected);
  });

  test('generateOrderedPostIds alternately merges 3 arrays of unequal length', () => {
    const arr1 = ['1'];
    const arr2 = ['2', '3', '4'];
    const arr3 = ['5', '6'];
    const expected = ['1', '2', '5', '3', '6', '4'];
    expect(generateOrderedPostIds([arr1, arr2, arr3])).toEqual(expected);
  });

  test('generateOrderedPostIds returns expected result if an array is empty', () => {
    const arr1 = ['1', '2'];
    const arr2 = [];
    const arr3 = ['3', '4', '5'];
    const expected = ['1', '3', '2', '4', '5'];
    expect(generateOrderedPostIds([arr1, arr2, arr3])).toEqual(expected);
  });
});