import utilStyles from "../../App/utils.module.css";
import styles from "./TextLabelPair.module.css";

export default function TextLabelPair({ textOne, textTwo }) {
  return (
    <div className={`${styles.flexRow} ${utilStyles.orange}`}>
      <div>{textOne}</div>
      <div className={utilStyles.pipe}>|</div>
      <div>{textTwo}</div>
    </div>
  );
}
