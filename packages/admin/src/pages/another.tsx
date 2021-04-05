import MyFragment from "fragments/another/MyFragment";
import Otra from "shared/components/Another";
import styles from "styles/pages/another.module.scss";

export default function Another() {
  return (
    <div>
      <div className={styles.myStyle}>Hola</div>
      <MyFragment />
      <Otra onClick={() => console.log(":O")} />
      :O
    </div>
  );
}
