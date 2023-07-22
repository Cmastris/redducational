export async function fetchSubTopPosts(sub, duration) {
  const url = `https://www.reddit.com/r/${sub}/top/.json?t=${duration}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request to ${url} was not successful.`);
  }
  const json = await response.json();
  return json;
}