import { makeStyles } from "@material-ui/core/styles";
import { NextPage } from "next";
import clsx from "clsx";
import { Element } from "react-scroll";

const HomePageTest: NextPage = () => {
  const { section, red, blue, green, yellow } = useStyles();

  return (
    <div>
      <Element name="red" className={clsx(section, red)}>
        Section 1
      </Element>
      <Element name="blue" className={clsx(section, blue)}>
        Section 2
      </Element>
      <Element name="green" className={clsx(section, green)}>
        Section 3
      </Element>
      <Element name="yellow" className={clsx(section, yellow)}>
        Section 4
      </Element>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  section: {
    height: 500,
    width: "100%",
  },
  red: { background: "red" },
  blue: { background: "blue" },
  green: { background: "green" },
  yellow: { background: "yellow" },
}));

export default HomePageTest;

