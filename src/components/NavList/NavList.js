import { useSelector } from "react-redux";

import { selectAllListings, selectListingsLoadedStatus } from "../../features/postListings/postListingsSlice";
import NavButton from "../NavButton/NavButton";
import styles from "./NavList.module.css";

export default function NavList({gridArea}) {

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

    const links = linkData.map(link => {
      return <li key={link.path}><NavButton anchor={link.name} path={link.path} /></li>;
    });
    return <nav><ul className={styles.list}>{links}</ul></nav>;
  }

  return (
    <section style={{gridArea}}>
      <div className={styles.navList}>
        <h2 className={styles.h2}>Categories</h2>
        {listingsLoaded ? generateLinks() : <p>Loading categories...</p>}
      </div>
    </section>
  );
}