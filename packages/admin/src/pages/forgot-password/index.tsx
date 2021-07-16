import { NextPage } from "next";
import { Typography, Link, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Button startIcon={<ArrowBackIcon />} onClick={() => router.push("/login")}>
        Volver a inicio de sesión
      </Button>
      <br />
      <br />
      <Typography variant="h4">Recuperar contraseña</Typography>
      <br />
      Por favor contacta con tu adminsitrador vía correo electrónico para atender tu problema:{" "}
      <Link target="blank">bioteam.fluss@gmail.com</Link>
    </div>
  );
};

export default ForgotPassword;

