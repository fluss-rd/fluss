import PrintNumbers from "components/PrintNumbers";
import MyFragment from "fragments/Another/MyFragment";
import styles from "styles/pages/another.module.scss";
import css from "styles/pages/another2.module.css";

export default function Another() {
  return (
    <div className={css["hey-another"]}>
      <div className={styles.myStyle}>Hola</div>
      <MyFragment />
      <PrintNumbers numbers={[2, 4, 6]} />
    </div>
  );
}
