import MyFragment from "fragments/another/MyFragment";
import styles from "styles/pages/another.module.scss";

export default function Another() {
  return (
    <div>
      <div className={styles.myStyle}>Hola</div>
      <MyFragment />
    </div>
  );
}
