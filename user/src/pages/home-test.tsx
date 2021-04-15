import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AboutUs from "fragments/home/AboutUs";
import Contact from "fragments/home/Contact";
import Welcome from "fragments/home/Welcome";
import { NextPage } from "next";
import { Element } from "react-scroll";

const HomePageTest: NextPage = () => {
  const { section, welcome, aboutUs, contact } = useStyles();

  return (
    <div>
      <Element name="red" className={clsx(section, welcome)}>
        <Welcome />
      </Element>
      <Element name="red" className={clsx(section, aboutUs)}>
        <AboutUs />
      </Element>
      <Element name="red" className={clsx(section, contact)}>
        <Contact />
      </Element>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  section: {
    minHeight: "calc(100vh / 1.5)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {},
  aboutUs: {
    backgroundImage: "linear-gradient(rgba(233, 250, 254, 1), rgba(255, 255, 255, 0))",
  },
  contact: {
    minHeight: "calc(100vh / 1.2)",
  },
}));

export default HomePageTest;
