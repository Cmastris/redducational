# Redducational <!-- omit in toc -->
A web app that displays the latest highly-rated posts from educational subreddits (topic-based forums on Reddit), built using React, Redux, and React Router.

Take a look: https://redducational.netlify.app/.


## Contents <!-- omit in toc -->
- [Key features](#key-features)
  - [Post listing pages](#post-listing-pages)
  - [Post detail pages](#post-detail-pages)
  - [Performant and robust data loading](#performant-and-robust-data-loading)
  - [Dynamic routing](#dynamic-routing)
  - [Tests](#tests)
- [Technologies](#technologies)
- [Setup](#setup)
- [FAQs](#faqs)
  - [Can I see an example?](#can-i-see-an-example)
  - [Why did you build this?](#why-did-you-build-this)
  - [Is this project in active development?](#is-this-project-in-active-development)


## Key features

### Post listing pages
Reddit JSON API data is fetched from specified subreddits upon app load/refresh; filtered, merged, and sorted to create a custom feed; dispatched to the Redux store for later use; and ultimately rendered within components. Post listings can be filtered by category or search term.

![Post listing page example](/readme-images/post-listing-page.png)

*Relevant code: [Reddit API request functions](src/redditAPI.js); [post listings data functions](src/features/postListings/postListingsSlice.js); [PostListing component](src/features/postListings/PostListing.js); [PostListingItem component](src/features/postContent/PostListingItem.js).*


### Post detail pages
When a post detail page is visited, post data is retrieved the Redux store (originally fetched from the Reddit JSON API upon app load/refresh) and used to populate the primary content. Secondly, component rendering triggers the retrieval of comments JSON data (if not already fetched) and rendering of the best top-level comments (excluding any with a negative score).

Self posts (text) and external link posts are both supported. `react-markdown` and a custom link rendering function (to open links in a new tab) are used to render markdown formatting within API data (self text and comments).

![Post detail page example](/readme-images/post-detail-page.png)

*Relevant code: [Reddit API request functions](src/redditAPI.js); [post detail data functions](src/features/postContent/postContentSlice.js); [PostDetail component](src/features/postContent/PostDetail.js); [Comment component](src/features/postContent/Comment.js).*


### Performant and robust data loading
The `Promise.allSettled()` method is used to load subreddit post summary data. This ensures that:

* Requests are made asynchronously/concurrently, to improve loading performance
* The custom post listings feed is only constructed after all requests have resolved
* A single failed request doesn't prevent loading of other subreddit post data

If an API request *does* fail, then fresh request data is substituted with local, static JSON data (in an identical format) containing summaries of the top posts of all time for the subreddit.

*Relevant code: [post listings data functions](src/features/postListings/postListingsSlice.js); [Reddit API request functions](src/redditAPI.js).*


### Dynamic routing
Front-end URL routing is implemented using React Router v6, utilising static and dynamic paths (*params*, e.g. post IDs) to render the correct components while incorporating the original post slug within post detail URLs.

*Relevant code: [routing configuration](src/routing.js).*


### Tests
Over 30 tests are implemented using Jest and React Testing Library, incorporating the Redux store, routing, and mocked Reddit JSON API requests (using Mock Service Worker).

*Relevant code: [test setup files](src/testSetup/); various `.test.js` files.*


## Technologies

* [React v18](https://react.dev/)
* [Redux](https://redux.js.org/)
* [React Redux](https://react-redux.js.org/)
* [React Router v6](https://reactrouter.com/en/main)
* [react-markdown](https://www.npmjs.com/package/react-markdown)
* [Jest](https://jestjs.io/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* [Mock Service Worker](https://mswjs.io/)


## Setup
1. Clone/download a local copy of this repository. 
2. Using the command line, navigate to the project root directory (which contains the `package-lock.json` file) and run `npm install` to install package dependencies.
3. Optional: using the command line, run `npm test` in the project root directory to run all test suites and then use Control + C to exit the test runner once complete (this may take up to ~20-30 seconds).
4. Using the command line, run `npm start` in the project root directory to start the React app.
5. The application should launch in your browser, but otherwise can be accessed at http://localhost:3000/.


## FAQs

### Can I see an example?
Yes! A production version of the website can be found here: https://redducational.netlify.app/.


### Why did you build this?
This is one of the practice projects that I completed as part of the Codecademy Full-Stack Engineer career path.

I planned and built it almost entirely independently; only the key requirements (core functionality and technologies) and a few links to documentation were provided. Some aspects were quite challenging, requiring a lot of reading through documentation and Stack Overflow!

In particular, I now have significantly more experience with:

* React, using functional components and props
* Redux, including React Redux and "thunks"
* React Testing Library, including the integration of Redux, React Router, and request mocking (via Mock Service Worker) within test environments (like in the real app!)


### Is this project in active development?
I'm not currently working on further improvements/features.
