import { Button, Typography } from "@material-ui/core";

import styles from "../styles/pages/index.module.scss";

export default function Home() {
  return (
    <div className={styles.structure}>
      <div className={styles["header-item"]}>
        <Typography variant="caption" className={styles.content}>
          Fluss
        </Typography>
        <Typography variant="h5" className={styles.bolds}>
          Bienvenido a la pagina de datos de Rios en la Republica Dominicana
        </Typography>
        <br></br>
        <Typography variant="body2">
          En la plataforma podrás encontrar datos de parámetros{" "}
        </Typography>
        <Typography variant="body2">
          fisicoquímicos del agua de los ríos de la República Dominicana
        </Typography>
        <br></br>
        <Button color="primary" variant="outlined" className={styles.button}>
          Datos y reportes
        </Button>
      </div>

      <div className={styles["header-item"]}>
        <img
          src="https://i.ibb.co/yRtkvd4/Screen-Shot-2021-04-01-at-12-12-39-PM.png"
          alt="River"
          width="400"
          height="300"
        ></img>
      </div>
    </div>
  );
}
