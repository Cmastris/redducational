import SearchBar from "../SearchBar/SearchBar";
import utilStyles from "../../App/utils.module.css";
import styles from "./Header.module.css";

export default function Header({ gridArea }) {
  return (
    <header className={styles.header} style={{gridArea}}>
      <h1 className={styles.appName}><span className={utilStyles.orange}>redd</span>ucational</h1>
      <SearchBar />
    </header>
  );
}