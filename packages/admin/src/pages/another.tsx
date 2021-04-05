import MyFragment from "fragments/another/MyFragment";
import styles from "styles/pages/another.module.scss";
import Otra from "shared/components/Another";

export default function Another() {
  return (
    <div>
      <div className={styles.myStyle}>Hola</div>
      <MyFragment />
      <Otra onClick={() => console.log(":O")} />
    </div>
  );
}

