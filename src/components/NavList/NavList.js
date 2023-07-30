import { useSelector } from "react-redux";

import { selectAllListings, selectListingsLoadedStatus } from "../../features/postListings/postListingsSlice";

export default function NavList() {

  const listingsLoaded = useSelector(selectListingsLoadedStatus);
  const listings = useSelector(selectAllListings);

  function generateLinks() {
    const linkData = [];
    for (const key in listings) {
      const category = listings[key];
      const path = (category.name === "All") ? "/" : `/categories/${category.path}`;
      linkData.push({ name: category.name, path });
    }
    
    // Order links alphabetically by name
    linkData.sort((a, b) => {
      return (a.name > b.name) ? 1 : -1;
    });

    // TODO: change to `NavButton`
    const links = linkData.map(link => <li key={link.path}>{link.name}</li>);
    return <ul>{links}</ul>;
  }

  return (
    <section>
      <h2>Categories</h2>
      {listingsLoaded ? generateLinks() : <p>Loading categories...</p>}
    </section>
  );
}