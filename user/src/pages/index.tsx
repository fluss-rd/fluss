import { Button, Typography } from "@material-ui/core";
import styles from "styles/pages/home.module.scss";

const images = [
  { url: "https://i.ibb.co/s5D25Kf/Screen-Shot-2021-04-10-at-12-37-05-PM.png" },
  { url: "https://i.ibb.co/12PNYmS/Screen-Shot-2021-04-10-at-5-25-30-PM.png" },
];

export default function Home() {
  return (
    <div>
    <div className={styles.structure}>
      <div className={styles["header-item"]}>
        <Typography variant="caption" className={styles.content}>
          Fluss
        </Typography>
        <Typography variant="h5">
          Bienvenido a la pagina de monitoreo de ríos en la Republica Dominicana
        </Typography>
        <br></br>
        <Typography variant="body2">
          En la plataforma podrás encontrar datos de parámetros{" "}
        </Typography>
        <Typography variant="body2">
          fisicoquímicos del agua de los ríos de la República Dominicana
        </Typography>
        <br></br>
        <Button color="primary" variant="contained" className={styles.button}>
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
    <div className={styles.structure}   style={{backgroundImage: 'linear-gradient(rgba(233, 250, 254, 1), rgba(255, 255, 255, 0))'}}>
      <div className={styles["header-item"]}>
      
        <Typography variant="h5">
        ¿Quiénes somos?
        </Typography>
        <br></br>
        <Typography variant="body2">
        Somos una organización sin fines de lucro que busca proveer información de elementos fisocoquímicos de la República Dominicana y hacer accesible estos datos a todo interesado en conocer de ellos.{" "}
        </Typography>
        <br></br>
       
        <Typography variant="body2">
        Nuestro equipo necesita apoyo,
        </Typography>
        <br></br>
        <Button color="primary" variant="contained" className={styles.button}>
          Hablanos!
        </Button>

      {/* <svg style={{position: 'absolute', zIndex: -1, left: -300, top: -50}} width="738" height="478" viewBox="0 0 938 678" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1500" height="742.51" fill="url(#paint0_linear)"/>
        <defs>
          <linearGradient id="paint0_linear" x1="317.5" y1="0" x2="317.5" y2="742.51" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E9FAFE"/>
              <stop offset="0.304762" stop-color="#E9FAFE" stop-opacity="0.400786"/>
              <stop offset="1" stop-color="#E9FAFE" stop-opacity="0"/>
          </linearGradient>
        </defs>
      </svg> */}
      </div>

      
    </div>
    <div>

    </div>
    </div>
  );
}
