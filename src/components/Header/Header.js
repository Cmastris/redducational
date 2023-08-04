import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.css";

export default function Header({ gridArea }) {
  return (
    <header className={styles.header} style={{gridArea}}>
      <h1 className={styles.appName}><span className={styles.orange}>redd</span>ucational</h1>
      <SearchBar />
    </header>
  );
}