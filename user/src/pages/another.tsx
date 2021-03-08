import MyFragment from "../fragments/another/my-gragment";
import styles from "../styles/pages/another.module.scss";

export default function Another() {
  return (
    <>
      <div className={styles.myStyle}>Hola</div>
      <MyFragment />
    </>
  );
}
