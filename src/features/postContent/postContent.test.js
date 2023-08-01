// External libraries
import { screen } from "@testing-library/react";

// PostDetail
import PostDetail from "./PostDetail";

// postContentSlice
import reducer from "./postContentSlice";
import { initialState } from "./postContentSlice";
import { addPost } from "./postContentSlice";

// Test setup
import { renderWithProviders } from "../../testSetup/setupTests";
import { createRouterProvider } from "../../testSetup/testRouters";
import { testState1 } from "../../testSetup/testState";


describe('PostDetail.js', () => {

  test('Self text content is rendered if the post is a self post', () => {
    const routing = createRouterProvider(<PostDetail />, "/:id/", ["/1/"]);
    renderWithProviders(routing, { preloadedState: testState1 });
    expect(screen.getByText("Post 1 Self Text")).toBeInTheDocument();
  });

  test('An external link is rendered if the post is not a self post', () => {
    const routing = createRouterProvider(<PostDetail />, "/:id/", ["/2/"]);
    renderWithProviders(routing, { preloadedState: testState1 });
    expect(screen.getByText("Visit external link")).toBeInTheDocument();
  });
});


describe('postListingsSlice.js', () => {

  test('addPost adds a subreddit to the initial state', () => {
    const payload = { id: "id1", title: 'post title' };
    expect(reducer(initialState, addPost(payload))).toEqual({
      ...initialState,
      posts: { id1: payload }
    });
  });
});