import { Typography } from "@material-ui/core";

import MyFragment from "../fragments/home/my-fragment";
import styles from "../styles/pages/home.module.scss";

export default function Home() {
  return (
    <div>
      <Typography variant="h4">Hello, world : D!</Typography>;
      <span className={styles.myStyle}>Hey, estoy estilizado</span>
      <MyFragment />
    </div>
  );
}
