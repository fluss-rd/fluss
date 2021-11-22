import { useTheme } from "@material-ui/core/styles";
import AboutUs from "fragments/home/AboutUs";
import Contact from "fragments/home/Contact";
import Welcome from "fragments/home/Welcome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { scroll } from "shared/helpers";
import appBarHeight from "shared/helpers/appBarHeight";

const Home: NextPage = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const theme = useTheme();

  // Scroll to an specific section if it cames from another page
  useEffect(scroll(sectionId, { offset: -appBarHeight(theme) }), [sectionId, theme]);

  return (
    <div>
      <Welcome />
      <AboutUs />
      <Contact />
    </div>
  );
};

export default Home;

