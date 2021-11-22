import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import AboutUs from "fragments/home/AboutUs";
import Contact from "fragments/home/Contact";
import Welcome from "fragments/home/Welcome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { Element } from "react-scroll";
import { scroll } from "shared/helpers";
import appBarHeight from "shared/helpers/appBarHeight";

const Home: NextPage = () => {
  const { section, welcome, aboutUs, contact } = useStyles();
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const theme = useTheme();

  // Scroll to an specific section if you come from another page.
  useEffect(scroll(sectionId, { offset: -appBarHeight(theme) }), [sectionId, theme]);

  return (
    <div>
      <Element name="welcome" className={clsx(section, welcome)}>
        <Welcome />
      </Element>
      <Element name="about-us" className={clsx(section, aboutUs)}>
        <AboutUs />
      </Element>
      <Element name="contact" className={clsx(section, contact)}>
        <Contact />
      </Element>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  section: {
    [theme.breakpoints.up("md")]: {
      minHeight: "calc(100vh / 1.5)",
    },
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

export default Home;

