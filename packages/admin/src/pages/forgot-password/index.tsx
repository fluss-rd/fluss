import { NextPage } from "next";
import { Typography, Link, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import Back from "shared/components/Back";

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Back onClick={() => router.push("/login")}>Volver a inicio de sesión</Back>
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


