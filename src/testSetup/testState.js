export const testState1 = {
  postListings: {
    staticDataLoaded: true,
    subreddits: {},
    listingsLoaded: true,
    listings: {
      "All": {
        name: "All",
        includedSubs: ["Sub1", "Sub2", "Sub3"],
        postIds: ["1", "2", "3", "4", "5", "6", "20"]
      },
      "Cat 1": {
        name: "Cat 1",
        includedSubs: ["Sub1", "Sub3"],
        postIds: []
      },
      "Cat 2": {
        name: "Cat 2",
        includedSubs: ["Sub2"],
        postIds: []
      },
      "Empty Listing": {
        name: "Empty Listing",
        includedSubs: [],
        postIds: []
      }
    }
  },
  postContent: { 
    posts: {
      "1": {
        id: "1",
        subreddit: "Sub1",
        title: "Post 1"
      },
      "2": {
        id: "2",
        subreddit: "Sub2",
        title: "Post 2"
      },
      "3": {
        id: "3",
        subreddit: "Sub3",
        title: "Post 3"
      },
      "4": {
        id: "4",
        subreddit: "Sub1",
        title: "Post 4"
      },
      "5": {
        id: "5",
        subreddit: "Sub2",
        title: "Post 5"
      },
      "6": {
        id: "6",
        subreddit: "Sub3",
        title: "Post 6"
      },
      "20": {
        id: "20",
        subreddit: "Sub2",
        title: "Post 20"
      },
    }
  }
};