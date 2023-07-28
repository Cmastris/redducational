import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.appName}><span className={styles.orange}>redd</span>ucational</h1>
      <SearchBar />
    </header>
  );
}