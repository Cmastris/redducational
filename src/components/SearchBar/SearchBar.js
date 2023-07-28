import { MdSearch } from "react-icons/md";

import styles from "./SearchBar.module.css";

export default function SearchBar() {
  // TODO: implement search functionality
  return (
    <form className={styles.searchForm}>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search posts..."
        aria-label="Enter search query"
      />
      <button className={styles.searchButton} type="submit" aria-label="Search">
        <MdSearch color={'rgb(190, 195, 200)'} size={40} />
      </button>
    </form>
  );
}